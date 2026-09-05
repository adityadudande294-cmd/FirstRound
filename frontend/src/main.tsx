import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #334155',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f87171', marginBottom: '1rem' }}>
              ⚠️ FirstRound Initialization Error
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              An unexpected error occurred during application startup:
            </p>
            <pre style={{
              backgroundColor: '#0f172a',
              padding: '1rem',
              borderRadius: '0.5rem',
              color: '#fbbf24',
              fontSize: '0.75rem',
              overflowX: 'auto',
              marginBottom: '1.5rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {this.state.error?.toString()}
            </pre>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Target container '#root' was not found in document.");
  }
  createRoot(rootElement).render(
    <StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </StrictMode>,
  );
} catch (bootError: any) {
  console.error('Fatal bootstrapping error:', bootError);
  const rootElement = document.getElementById('root') || document.body;
  rootElement.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;padding:2rem;font-family:sans-serif;">
      <div style="background:#1e293b;padding:2rem;border-radius:1rem;border:1px solid #334155;max-width:500px;">
        <h2 style="color:#f87171;margin-bottom:0.5rem;">Application Mount Error</h2>
        <p style="color:#cbd5e1;font-size:0.875rem;">${bootError?.message || bootError}</p>
        <button onclick="localStorage.clear();window.location.reload();" style="margin-top:1rem;padding:0.5rem 1rem;background:#3b82f6;color:#fff;border:none;border-radius:0.375rem;cursor:pointer;">Clear Storage & Retry</button>
      </div>
    </div>
  `;
}
