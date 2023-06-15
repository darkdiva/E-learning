import React from 'react';
import VideoForm ,{VideoFormData} from './videoForm';

const CreateVideo: React.FC = () => {
  const handleSubmit = (videoData: VideoFormData) => {
    fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Video created:', data);
        // Handle successful video creation, e.g., show a success message or redirect
      })
      .catch((error) => {
        console.error('Error creating video:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div>
      <h2>Create Video</h2>
      <VideoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateVideo;
