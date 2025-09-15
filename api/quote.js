export default async function handler(req, res) {
  try {
    const { symbols = '^GSPC,^VIX,^NDX,^DJI' } = req.query;

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;

    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PanoramaFinanceHub/1.0)'
      }
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Failed to fetch from Yahoo' });
    }

    const json = await upstream.json();
    const results = (json?.quoteResponse?.result || []).map((r) => ({
      symbol: r.symbol,
      shortName: r.shortName || r.longName || r.symbol,
      price: r.regularMarketPrice,
      change: r.regularMarketChange,
      changePercent: r.regularMarketChangePercent,
      currency: r.currency,
      marketState: r.marketState,
      time: r.regularMarketTime
    }));

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ symbols: symbols.split(','), results });
  } catch (e) {
    console.error('quote api error', e);
    return res.status(500).json({ error: 'Internal error' });
  }
} 