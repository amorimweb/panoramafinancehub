import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket deve ser usado dentro de um WebSocketProvider');
  }
  return context;
};

const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [data, setData] = useState({});
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Simulação de dados de mercado (substituir por WebSocket real)
  const simulateMarketData = () => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'];
    const indices = ['SPY', 'QQQ', 'IWM', 'DIA'];
    
    return {
      quotes: symbols.reduce((acc, symbol) => {
        const basePrice = Math.random() * 200 + 50;
        const change = (Math.random() - 0.5) * 10;
        acc[symbol] = {
          symbol,
          price: basePrice + change,
          change: change,
          changePercent: (change / basePrice) * 100,
          volume: Math.floor(Math.random() * 1000000) + 100000,
          timestamp: Date.now()
        };
        return acc;
      }, {}),
      indices: indices.reduce((acc, symbol) => {
        const basePrice = Math.random() * 500 + 100;
        const change = (Math.random() - 0.5) * 20;
        acc[symbol] = {
          symbol,
          price: basePrice + change,
          change: change,
          changePercent: (change / basePrice) * 100,
          volume: Math.floor(Math.random() * 5000000) + 1000000,
          timestamp: Date.now()
        };
        return acc;
      }, {}),
      news: [
        {
          id: Date.now(),
          title: 'Mercados sobem com dados econômicos positivos',
          summary: 'Índices principais registram alta após divulgação de dados...',
          timestamp: Date.now(),
          tickers: ['SPY', 'QQQ']
        }
      ],
      marketStatus: {
        NYSE: Math.random() > 0.5 ? 'open' : 'closed',
        NASDAQ: Math.random() > 0.5 ? 'open' : 'closed',
        timestamp: Date.now()
      }
    };
  };

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus('connecting');
    
    // Simulação de conexão WebSocket
    // Em produção, substituir por: new WebSocket('wss://api.exemplo.com/ws')
    setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
      reconnectAttempts.current = 0;
      
      // Simular recebimento de dados a cada 5 segundos
      const interval = setInterval(() => {
        if (wsRef.current) {
          const newData = simulateMarketData();
          setData(prevData => ({
            ...prevData,
            ...newData,
            lastUpdate: Date.now()
          }));
        }
      }, 5000);
      
      wsRef.current = { 
        readyState: WebSocket.OPEN,
        interval,
        close: () => {
          clearInterval(interval);
          setIsConnected(false);
          setConnectionStatus('disconnected');
        }
      };
      
      // Enviar dados iniciais
      setData(simulateMarketData());
    }, 1000);
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
  };

  const reconnect = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      setConnectionStatus('failed');
      return;
    }

    reconnectAttempts.current++;
    setConnectionStatus('reconnecting');
    
    reconnectTimeoutRef.current = setTimeout(() => {
      connect();
    }, Math.pow(2, reconnectAttempts.current) * 1000); // Backoff exponencial
  };

  const subscribe = (channel, callback) => {
    // Simulação de inscrição em canal
    console.log(`Subscribed to channel: ${channel}`);
    
    // Em uma implementação real, enviaria mensagem via WebSocket
    // wsRef.current?.send(JSON.stringify({ action: 'subscribe', channel }));
    
    return () => {
      console.log(`Unsubscribed from channel: ${channel}`);
      // wsRef.current?.send(JSON.stringify({ action: 'unsubscribe', channel }));
    };
  };

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-reconectar se a conexão cair
  useEffect(() => {
    if (connectionStatus === 'disconnected' && reconnectAttempts.current < maxReconnectAttempts) {
      reconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  const value = {
    isConnected,
    connectionStatus,
    data,
    connect,
    disconnect,
    reconnect,
    subscribe,
    // Funções utilitárias para acessar dados específicos
    getQuote: (symbol) => data.quotes?.[symbol],
    getIndex: (symbol) => data.indices?.[symbol],
    getLatestNews: () => data.news?.slice(0, 10) || [],
    getMarketStatus: () => data.marketStatus || {}
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider; 