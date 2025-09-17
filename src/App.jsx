import { useState } from "react";
import "./App.css";

import pretty from "pretty";

function App() {
  const [url, setUrl] = useState("https://www.nasa.gov");
  const [query, setQuery] = useState("Space Station");
  const [topChunks, setTopChunks] = useState([]);
  const [showHtmlStates, setShowHtmlStates] = useState({}); // track toggle per card
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setTopChunks([])
    try {
      const res = await fetch("http://127.0.0.1:8000/api/search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, query }),
      });
      const data = await res.json();
      setLoading(false)
      setTopChunks(data.top_chunks || []);
      setShowHtmlStates({}); // reset toggles
    } catch (err) {
      console.error(err);
      setLoading(false)
    }
  };

  const toggleHtml = (idx) => {
    setShowHtmlStates((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="App">
      <div className="heroSectionContainer">
        <h1 className="heroTitle">Website Search</h1>
        <form onSubmit={handleSubmit} className="formContainer">
          <input
            id="urlInpt"
            required
            className="urlInput"
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            id="contentInpt"
            required
            className="contentInput"
            type="text"
            placeholder="Enter search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="searchBtn"
            type="submit">Search</button>
        </form>
      </div>

      {/* <div className="results">
        {loading ? (
        <img
          className="loading_image"
          src="/public/imgs/loading-circles-blue-gradient.png"
          alt="Loading..."
        />
      ) : null}
       
        {topChunks.map((item, idx) => (
          <div key={idx} className="card show">
            <div className="card-header">
              <span className="badge">{item.match_percentage}% match</span>
              <button className="showHtmlBtn" onClick={() => toggleHtml(idx)}>
                {showHtmlStates[idx] ? "Hide HTML" : "Show HTML"}
              </button>
            </div>
            <p className="cardTitle">{item.title}</p>
            <p className="cardTitle">{item.chunk_text}</p>
            {showHtmlStates[idx] && (
              <HtmlPreview rawHtml={item.chunk_html} />
            )}
          </div>
        ))}

      </div> */}

      <div className="results">
        {loading ? (
          <img
            className="loading_image"
            src="/public/imgs/loading-circles-blue-gradient.png"
            alt="Loading..."
          />
        ) : null}

        {/* show no-results only when not loading and no chunks */}
        {!loading && topChunks.length === 0 ? (
          <div className="no-results">No results found</div>
        ) : (
          topChunks.map((item, idx) => (
            <div key={idx} className="card show">
              <div className="card-header">
                <span className="badge">{item.match_percentage}% match</span>
                <button className="showHtmlBtn" onClick={() => toggleHtml(idx)}>
                  {showHtmlStates[idx] ? "Hide HTML" : "Show HTML"}
                </button>
              </div>
              <p className="cardTitle">{item.title}</p>
              <p className="cardTitle">{item.chunk_text}</p>
              {showHtmlStates[idx] && <HtmlPreview rawHtml={item.chunk_html} />}
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;


function HtmlPreview({ rawHtml }) {
  const formattedHtml = pretty(rawHtml);

  return (
    <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "1rem", borderRadius: "8px", overflowX: "auto" }}>
      <code>{formattedHtml}</code>
    </pre>
  );
}