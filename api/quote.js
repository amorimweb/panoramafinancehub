export default async function handler(req, res) {
  const { symbols = '^GSPC,^VIX,^NDX,^DJI' } = req.query;
  const urls = [
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`,
    `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`
  ];

  const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; PanoramaFinanceHub/1.0)' };

  async function fetchQuote() {
    let lastError = null;
    for (const url of urls) {
      try {
        const upstream = await fetch(url, { headers });
        if (!upstream.ok) {
          lastError = new Error(`Upstream HTTP ${upstream.status}`);
          continue;
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
        return { source: url, results };
      } catch (e) {
        lastError = e;
      }
    }
    throw lastError || new Error('Unknown upstream error');
  }

  async function fetchChartForSymbol(sym) {
    const chartUrls = [
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=1d&interval=1m`,
      `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=1d&interval=1m`
    ];
    let lastError = null;
    for (const url of chartUrls) {
      try {
        const r = await fetch(url, { headers });
        if (!r.ok) { lastError = new Error(`chart HTTP ${r.status}`); continue; }
        const j = await r.json();
        const meta = j?.chart?.result?.[0]?.meta;
        const timestamps = j?.chart?.result?.[0]?.timestamp || [];
        const indicators = j?.chart?.result?.[0]?.indicators?.quote?.[0] || {};
        const lastIdx = Math.max(0, (indicators?.close || []).length - 1);
        const lastClose = (indicators?.close || [])[lastIdx];
        const price = meta?.regularMarketPrice ?? lastClose ?? null;
        const prevClose = meta?.previousClose ?? meta?.chartPreviousClose ?? null;
        const change = (price != null && prevClose != null) ? (price - prevClose) : null;
        const changePercent = (change != null && prevClose) ? (change / prevClose) * 100 : null;
        return {
          symbol: sym,
          shortName: meta?.symbol || sym,
          price,
          change,
          changePercent,
          currency: meta?.currency || 'USD',
          marketState: meta?.marketState,
          time: (timestamps || []).pop() || null,
          _chartSource: url
        };
      } catch (e) { lastError = e; }
    }
    throw lastError || new Error(`chart fetch failed for ${sym}`);
  }

  try {
    const quoteData = await fetchQuote().catch((e) => ({ error: String(e) }));
    let results = Array.isArray(quoteData?.results) ? quoteData.results : [];

    const haveValidPrices = results.some(r => typeof r.price === 'number' && !Number.isNaN(r.price));
    if (!haveValidPrices) {
      const syms = symbols.split(',').map(s => s.trim()).filter(Boolean);
      const chartResults = await Promise.all(syms.map(fetchChartForSymbol));
      results = chartResults;
    }

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ symbols: symbols.split(','), source: quoteData?.source || 'chart', results });
  } catch (e) {
    console.error('quote api error', e);
    return res.status(500).json({ error: 'Internal error', detail: String(e) });
  }
} 