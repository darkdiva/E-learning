import express, { Request, Response } from 'express';
import video from '../../models/video';
const videoRoutes = express.Router();

// Get all videos
videoRoutes.get('/videos', async (req: Request, res: Response) => {
  try {
    const videos = await video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific video by ID
videoRoutes.get('/videos/:id', async (req: Request, res: Response) => {
  try {
    const Video = await video.findById(req.params.id);
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
    } else {
      res.json(video);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new video
videoRoutes.post('/videos', async (req: Request, res: Response) => {
  try {
    const { title, description, filePath, duration, uploadDate } = req.body;
    const newVideo = new video({
      title,
      description,
      filePath,
      duration,
      uploadDate,
    });
    const savedVideo = await newVideo.save();
    res.json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a video by ID
videoRoutes.put('/videos/:id', async (req: Request, res: Response) => {
  try {
    const Video = await video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
    } else {
      res.json(video);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a video by ID
videoRoutes.delete('/videos/:id', async (req: Request, res: Response) => {
  try {
    const Video = await video.findByIdAndDelete(req.params.id);
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
    } else {
      res.json(video);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default videoRoutes;
