import React, { useState } from 'react';

interface VideoFormProps {
  onSubmit: (videoData: VideoFormData) => void;
  initialValues?: VideoFormData;
}

interface VideoFormData {
  title: string;
  description: string;
  filePath: string;
  duration: number;
  uploadDate: Date;
}

const VideoForm: React.FC<VideoFormProps> = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState<VideoFormData>(
    initialValues || {
      title: '',
      description: '',
      filePath: '',
      duration: 0,
      uploadDate: new Date(),
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      {/* Render other video input fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default VideoForm;
