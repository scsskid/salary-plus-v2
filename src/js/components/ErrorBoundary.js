import * as React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.appData = props.appData;
    this.state = { error: null, errorInfo: null };
    this.triggerDownload = this.triggerDownload.bind(this);
  }

  triggerDownload() {
    console.log(this);
    const j = document.createElement('a');
    j.id = 'download';
    j.download = 'salary-plus-appData-' + Date.now() + '.json';
    j.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.state.appData, null, 2)])
    );
    j.click();
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      ...this.state,
      errorInfo
    });
  }

  render() {
    if (this.state.error) {
      return (
        <main className="main">
          <header className="app-header">
            <h2>Something went wrong.</h2>
          </header>

          <p style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </p>
          <div>
            <p>
              <input
                style={{ width: '100%', maxWidth: 'none' }}
                value={JSON.stringify(this.appData)}
              />
            </p>

            <button className="btn" onClick={this.triggerDownload}>
              Download appData Backup
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
