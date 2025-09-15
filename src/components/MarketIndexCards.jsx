import React, { useEffect, useState, memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Y_SYMBOLS = [
  { ySymbol: '^GSPC', label: 'S&P 500' },
  { ySymbol: '^VIX', label: 'VIX' },
  { ySymbol: '^NDX', label: 'NASDAQ 100' },
  { ySymbol: '^DJI', label: 'Dow Jones' }
];

const API_BASE = process.env.REACT_APP_API_BASE_URL || (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app') ? '' : 'https://panoramafinancehub.vercel.app');

const formatNumber = (value) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
};

const PercentBadge = ({ value }) => {
  const positive = typeof value === 'number' && value >= 0;
  const bg = positive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
  const bd = positive ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)';
  const color = positive ? '#10b981' : '#ef4444';
  return (
    <span
      className="px-2 py-1 fw-semibold"
      style={{
        background: bg,
        color,
        border: `1px solid ${bd}`,
        borderRadius: '8px',
        fontSize: '0.75rem'
      }}
    >
      {typeof value === 'number' ? `${value >= 0 ? '+' : ''}${formatNumber(value)}%` : '-'}
    </span>
  );
};

const MarketIndexCards = () => {
  const { colors, isDarkMode } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const symbols = Y_SYMBOLS.map(s => s.ySymbol).join(',');

    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/quote?symbols=${encodeURIComponent(symbols)}`, {
          signal: controller.signal
        });
        const json = await res.json();
        setData(json.results || []);
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.warn('Erro ao buscar cotações do Yahoo', e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();

    const interval = setInterval(fetchQuotes, 30000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const mapBySymbol = new Map(data.map(r => [r.symbol, r]));

  return (
    <div
      className="mb-4"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '1rem'
      }}
    >
      {Y_SYMBOLS.map((s) => {
        const q = mapBySymbol.get(s.ySymbol);
        const percent = q?.changePercent;
        const change = q?.change;
        return (
          <div
            key={s.ySymbol}
            className="p-3"
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              boxShadow: isDarkMode
                ? '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.1)'
                : '0 8px 25px -8px rgba(0,0,0,0.1), 0 0 0 1px rgba(249,115,22,0.08)'
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0 fw-bold" style={{ color: colors.text, fontSize: '0.95rem' }}>{s.label}</h6>
              <PercentBadge value={typeof percent === 'number' ? Number(percent.toFixed(2)) : undefined} />
            </div>
            <div className="d-flex align-items-end justify-content-between">
              <div>
                <div className="fw-bold" style={{ color: colors.text, fontSize: '1.25rem' }}>
                  {loading && !q ? '—' : formatNumber(q?.price)}
                </div>
                <div className="small" style={{ color: colors.textMuted }}>
                  {loading && !q ? 'Atualizando…' : `${change >= 0 ? '+' : ''}${formatNumber(change)} (${typeof percent === 'number' ? percent.toFixed(2) : '-'}%)`}
                </div>
              </div>
              <div className="badge" style={{ background: 'transparent', color: colors.textMuted }}>
                {q?.currency || ''}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(MarketIndexCards); 