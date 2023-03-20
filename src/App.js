import { useEffect, useState } from "react";
import "./App.css";
import InputRow from "./components/inputRow";
import backendServices from "./services/backendServices";
import Output from "./components/output";

function App() {
  const [url, setURL] = useState("");
  const [threshold, setThreshold] = useState(90);
  const [hands, setHands] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(true);
  const [res, setRes] = useState("");

  useEffect(() => {
    const check = url.startsWith("https://www.youtube.com/watch?v=");
    setValidUrl(check);
  }, [url]);

  async function handleClick(e) {
    setLoading(true);
    e.preventDefault();
    if (!validUrl) {
      return;
    }
    backendServices.postToMain(url, hands, threshold).then((res) => {
      setRes(JSON.parse(res).filename);
      setLoading(false);
      setURL("");
      setThreshold(90);
      setHands(false);
    });
  }

  function handleSearchChange(e) {
    setURL(e.target.value);
  }

  function handleThresholdChange(val) {
    setThreshold(val);
  }

  function handleCheckBox(val) {
    setHands(val);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">ytSheetMusic</h1>
        <p className="header-description" style={{ marginLeft: "1em" }}>
          {"Get PDFs of sheet music from YouTube videos"}
        </p>
      </header>
      <main className="main-content">
        <InputRow
          url={url}
          valid={validUrl}
          threshold={threshold}
          hands={hands}
          handleSearchChange={handleSearchChange}
          onSubmit={handleClick}
          handleThresholdChange={handleThresholdChange}
          handleCheckBox={handleCheckBox}
        />
        {loading ? (
          <>
            <div className="loader" />
            <p className="wait">
              Please wait, this takes at least 30 seconds depending on the size
              of the video...
            </p>
          </>
        ) : null}

        {res ? <Output res={res} /> : null}
      </main>
      <footer className="App-footer">
        <a
          href="https://evanpai.com"
          style={{ color: "white", textDecoration: "none" }}
        >
          <p>Let me know what you think!</p>
          evanpai.com
        </a>
      </footer>
    </div>
  );
}

export default App;
