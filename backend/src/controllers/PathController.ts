import { Request, Response } from 'express';
import { PathModel, IPath } from '../models/path';

// Create a new path
export const createPath = async (req: Request, res: Response): Promise<void> => {
  try {
    const { label, description, creationDate, courses } = req.body;

    const newPath: IPath = new PathModel({
      label,
      description,
      creationDate,
      courses,
    });

    const savedPath: IPath = await newPath.save();

    res.status(201).json(savedPath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create path' });
  }
};

// Get all paths
export const getPaths = async (req: Request, res: Response): Promise<void> => {
  try {
    const paths: IPath[] = await PathModel.find().populate('courses');

    res.status(200).json(paths);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get paths' });
  }
};

// Update a path
export const updatePath = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { label, description, creationDate, courses } = req.body;

    const updatedPath: IPath | null = await PathModel.findByIdAndUpdate(
      id,
      { label, description, creationDate, courses },
      { new: true }
    ).populate('courses');

    if (updatedPath) {
      res.status(200).json(updatedPath);
    } else {
      res.status(404).json({ error: 'Path not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update path' });
  }
};

// Delete a path
export const deletePath = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedPath: IPath | null = await PathModel.findByIdAndDelete(id);

    if (deletedPath) {
      res.status(200).json({ message: 'Path deleted' });
    } else {
      res.status(404).json({ error: 'Path not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete path' });
  }
};
