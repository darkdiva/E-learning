import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from '../../../backend/src/models/image';

interface ImageResponse {
  images: Image[];
}

const InstructorImage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get<ImageResponse>('/content/images');
      setImages(response.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post<{ image: Image }>('/content/image/upload', formData);
        const { image } = response.data;
        setImages((prevImages) => [...prevImages, image]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImageDelete = async () => {
    if (selectedImage) {
      try {
        await axios.delete(`/content/image/${selectedImage}`);
        setImages((prevImages) => prevImages.filter((image) => image.path !== selectedImage));
        setSelectedImage(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImageSelect = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  return (
    <div>
      <h2>Instructor Images</h2>

      <h3>Upload an Image</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <h3>Uploaded Images</h3>
      {images.map((image) => (
        <div key={image._id}>
          <img src={image.path} alt="Uploaded" style={{ maxWidth: '200px' }} />
          {selectedImage === image.path ? (
            <>
              <button onClick={handleImageDelete}>Delete</button>
              <p>Selected</p>
            </>
          ) : (
            <button onClick={() => handleImageSelect(image.path)}>Select</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InstructorImage;
