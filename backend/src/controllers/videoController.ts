import { Request, Response } from 'express';
import  video, {VideoModel} from '../models/video';

// Create a new video
export const createVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, filePath, duration, uploadDate } = req.body;

    const newVideo: VideoModel = new video({
      title,
      description,
      filePath,
      duration,
      uploadDate,
    });

    const savedVideo: VideoModel = await newVideo.save();

    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create video' });
  }
};

// Get all videos
export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const videos: VideoModel[] = await video.find();

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get videos' });
  }
};

// Update a video
export const updateVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, filePath, duration, uploadDate } = req.body;

    const updatedVideo: VideoModel | null = await video.findByIdAndUpdate(
      id,
      { title, description, filePath, duration, uploadDate },
      { new: true }
    );

    if (updatedVideo) {
      res.status(200).json(updatedVideo);
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
};

// Delete a video
export const deleteVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedVideo: VideoModel | null = await video.findByIdAndDelete(id);

    if (deletedVideo) {
      res.status(200).json({ message: 'Video deleted' });
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
};
