import React, { useState, useEffect } from "react";
import "./Wikipedia.css"; // Import the CSS file

const Wikipedia = ({ latestQuery }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!latestQuery) return;

    const fetchWikipediaResults = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${latestQuery}`
        );
        const data = await response.json();

        if (data.query && data.query.search) {
          setResults(data.query.search);
        }
      } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
      }
    };

    fetchWikipediaResults();
  }, [latestQuery]);

  return (
    <div className="wikipedia-container">
      <div className="wikipedia-header">
        <img src="wikipedia.png" alt="Wikipedia Icon" style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
        <h2>Wikipedia Search</h2>
      </div>
      
      <p>Showing results for: <strong>{latestQuery}</strong></p>

      <div className="wiki-results">
        {results.length > 0 ? (
          results.map((article) => (
            <div key={article.pageid} className="wiki-item">
              <h3>{article.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: article.snippet }}></p>
              <a
                href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p>No Wikipedia articles found. Try asking something else.</p>
        )}
      </div>
    </div>
  );
};

export default Wikipedia;
