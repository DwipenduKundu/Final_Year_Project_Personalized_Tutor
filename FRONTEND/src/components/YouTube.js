import React, { useEffect, useState } from "react";
import "./YouTube.css"; 

const API_KEY = "AIzaSyB1HER_RkL-8-zBKyt93BaR5IlcQtSDGvk"; 
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const YouTube = ({ latestQuery }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!latestQuery) return;

    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?part=snippet&q=${latestQuery}&type=video&maxResults=6&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };

    fetchVideos();
  }, [latestQuery]);

  return (
    <div className="youtube-container">
      <div className="youtube-header">
        <img src="youtube.jpg" alt="Youtube Icon" style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
        <h2>YouTube Learning</h2>
      </div>




      <p>Showing videos for: <strong>{latestQuery}</strong></p>

      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id.videoId} className="video-item">
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p>{video.snippet.title}</p>
            </div>
          ))
        ) : (
          <p>No videos found. Try asking something different.</p>
        )}
      </div>
    </div>
  );
};

export default YouTube;
