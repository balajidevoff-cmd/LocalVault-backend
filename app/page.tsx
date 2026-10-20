'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [prettyPrint, setPrettyPrint] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBackendData() {
      setLoading(true);
      setError(null);

      // Read configured backend root URL, fallback to default local address if unset
      const rawUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
      const cleanUrl = rawUrl.trim().replace(/\/+$/, '');

      try {
        const response = await fetch(`${cleanUrl}/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch backend response');
      } finally {
        setLoading(false);
      }
    }

    fetchBackendData();
  }, []);

  let contentText = '';
  if (data !== null) {
    contentText = prettyPrint
      ? JSON.stringify(data, null, 2)
      : JSON.stringify(data);
  }

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#111111',
        color: '#ffffff',
        fontFamily: 'Consolas, Menlo, Monaco, "Courier New", monospace',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top toolbar */}
      <div
        style={{
          backgroundColor: '#3b3b3b',
          borderBottom: '1px solid #4a4a4a',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={prettyPrint}
            onChange={(e) => setPrettyPrint(e.target.checked)}
            style={{ cursor: 'pointer', margin: 0 }}
          />
          <span>Pretty print</span>
        </label>
      </div>

      {/* JSON Viewer output directly beneath toolbar */}
      <div style={{ padding: '6px 8px', flex: 1 }}>
        {error ? (
          <div style={{ color: '#ff6b6b', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
            Error: {error}
          </div>
        ) : loading && data === null ? null : (
          <pre
            style={{
              margin: 0,
              fontFamily: 'inherit',
              fontSize: '14px',
              color: '#ffffff',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              lineHeight: 1.45,
            }}
          >
            {contentText}
          </pre>
        )}
      </div>
    </div>
  );
}
