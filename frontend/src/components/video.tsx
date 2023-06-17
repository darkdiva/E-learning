import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Video {
  _id: string;
  title: string;
  description: string;
  filePath: string;
}

const VideoComponent: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideo, setNewVideo] = useState<Video>({
    _id: '',
    title: '',
    description: '',
    filePath: '',
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get<Video[]>('/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  const createVideo = async () => {
    try {
      const response = await axios.post<Video>('/api/videos', newVideo);
      setVideos([...videos, response.data]);
      setNewVideo({ _id: '', title: '', description: '', filePath: '' });
    } catch (error) {
      console.error('Failed to create video:', error);
    }
  };

  const deleteVideo = async (videoId: string) => {
    try {
      await axios.delete(`/api/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  const updateVideo = async (videoId: string, updatedVideo: Video) => {
    try {
      const response = await axios.put<Video>(`/api/videos/${videoId}`, updatedVideo);
      setVideos(
        videos.map((video) => (video._id === videoId ? response.data : video))
      );
    } catch (error) {
      console.error('Failed to update video:', error);
    }
  };

  const getVideo = async (videoId: string) => {
    try {
      const response = await axios.get<Video>(`/api/videos/${videoId}`);
      // Handle the response data as needed
      console.log(response.data);
    } catch (error) {
      console.error('Failed to get video:', error);
    }
  };

  return (
    <div>
      <h1>Videos</h1>
      <div>
        <h2>Create Video</h2>
        <input
          type="text"
          value={newVideo.title}
          onChange={(e) =>
            setNewVideo({ ...newVideo, title: e.target.value })
          }
          placeholder="Title"
        />
        <input
          type="text"
          value={newVideo.description}
          onChange={(e) =>
            setNewVideo({ ...newVideo, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          type="text"
          value={newVideo.filePath}
          onChange={(e) =>
            setNewVideo({ ...newVideo, filePath: e.target.value })
          }
          placeholder="File Path"
        />
        <button onClick={createVideo}>Create</button>
      </div>
      {videos.map((video) => (
        <div key={video._id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <video src={video.filePath} controls />
          <div>
            <button onClick={() => deleteVideo(video._id)}>Delete</button>
            <button
              onClick={() =>
                updateVideo(video._id, {
                  ...video,
                  title: video.title + ' (Updated)',
                })
              }
            >
              Update
            </button>
            <button onClick={() => getVideo(video._id)}>Get Video</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoComponent;
