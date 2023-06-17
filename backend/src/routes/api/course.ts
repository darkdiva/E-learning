import express = require('express');
import { Request, Response } from 'express';
import CourseModel from "../../models/course"
const router = express.Router();

// Get all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific course by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new course
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, tasks, documents, images, videos } = req.body;
    const course = new CourseModel({
      title,
      tasks,
      documents,
      images,
      videos,
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
