import React, { useEffect, useState } from 'react';

interface Video {
  _id: string;
  title: string;
  description: string;
  filePath: string;
  duration: number;
  uploadDate: Date;
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (videoId: string) => {
    fetch(`/api/videos/${videoId}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        console.log('Video deleted:', data);
        // Handle successful video deletion, e.g., update the video list
      })
      .catch((error) => {
        console.error('Error deleting video:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div>
      <h2>Video List</h2>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          {/* Render other video details */}
          <button onClick={() => handleDelete(video._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
