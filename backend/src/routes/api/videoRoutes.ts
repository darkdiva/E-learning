import express = require('express');
import { createVideo,getVideos,updateVideo,deleteVideo } from '../../controllers/videoController';

const router = express.Router();

// Create a new video
router.post('/', createVideo);

// Get all videos
router.get('/', getVideos);

// Update a video
router.put('/:id', updateVideo);

// Delete a video
router.delete('/:id', deleteVideo);

export default router;
