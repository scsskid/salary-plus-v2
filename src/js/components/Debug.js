import * as React from 'react';

export default function Debug({
  appRunning,
  settings,
  dispatch,
  version,
  appData,
  clock
}) {
  let importData;
  const [importError, setImportError] = React.useState();

  function triggerDownload() {
    const j = document.createElement('a');
    j.id = 'download';
    j.download = 'salary-plus-appData-' + clock.now.getTime() + '.json';
    j.href = URL.createObjectURL(new Blob([JSON.stringify(appData, null, 2)]));
    j.click();
  }

  async function readText(event) {
    const file = event.target.files.item(0);
    importData = await file.text();

    // document.getElementById('output').innerText = text;
  }

  function tryImport() {
    if (isValidJsonString(importData)) {
      dispatch({
        type: 'importData',
        payload: JSON.parse(importData)
      });
    } else {
      console.log('Error');
      setImportError('File empty or could not read imported file');
    }
  }

  function isValidJsonString(jsonString) {
    if (!(jsonString && typeof jsonString === 'string')) {
      return false;
    }

    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <footer style={{ paddingTop: 40 }}>
      {appRunning && (
        <>
          <pre>{JSON.stringify(settings, null, 2)}</pre>
          <hr />
          <p>
            <button className="btn" onClick={triggerDownload}>
              Export Data
            </button>
          </p>

          <p>
            <input type="file" onChange={readText} />

            <button className="btn" onClick={tryImport}>
              Import File
            </button>
            <br />
            <span style={{ color: 'red' }}>{importError}</span>
          </p>
          <pre id="output"></pre>

          <hr />
          <p>
            <button className="btn" onClick={() => dispatch({ type: 'reset' })}>
              Reset App (Bootstrap)
            </button>
          </p>
          <p>
            <button
              className="btn"
              onClick={() => dispatch({ type: 'deleteAppData' })}
            >
              Delete App Data
            </button>
          </p>
          <p>
            <button
              className="btn"
              onClick={() => dispatch({ type: 'insertSampleData' })}
            >
              Insert Sample App Data
            </button>
          </p>
          <pre style={{ fontSize: '.6rem' }}>
            {JSON.stringify(appData.app, null, 2)}
          </pre>
        </>
      )}
      <div style={{ fontSize: '.8rem', opacity: 0.5 }}>Version: {version}</div>
    </footer>
  );
}
