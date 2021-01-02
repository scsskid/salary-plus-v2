import * as React from 'react';
import LogToScreen from './LogToScreen';
import Version from './Version';

export default function Debug({
  appRunning,
  settings,
  dispatch,
  appData,
  clock
}) {
  let importData;
  const [importError, setImportError] = React.useState();
  const { app } = appData || {};

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
    <div>
      <LogToScreen title="settings" object={settings} settings={settings} />
      <LogToScreen title="appData.app" object={app} settings={settings} />
      {appRunning && (
        <>
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
        </>
      )}
      {appRunning && <Version />}
    </div>
  );
}
