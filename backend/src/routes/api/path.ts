// routes/path.ts
import  { Request, Response } from 'express';
import { PathModel } from '../models/path';
import express = require('express');

const router = express.Router();

// Get all paths
router.get('/', async (req: Request, res: Response) => {
  try {
    const paths = await PathModel.find().populate('courses');
    res.json(paths);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific path by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const path = await PathModel.findById(req.params.id).populate('courses');
    if (!path) {
      return res.status(404).json({ message: 'Path not found' });
    }
    res.json(path);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new path
router.post('/', async (req: Request, res: Response) => {
  try {
    const { label,description,creationDate,courses} = req.body;
    const path = new PathModel({
        label,
        description,
        creationDate,
        courses,
    });
    const newPath = await path.save();
    res.status(201).json(newPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
