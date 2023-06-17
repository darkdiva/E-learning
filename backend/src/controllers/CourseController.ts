import { Request, Response } from 'express';
import CourseModel, { ICourse } from '../models/course';

// Create a new course
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, duration, level, prerequisites, objectives, tasks, documents, images, videos } = req.body;

    const newCourse: ICourse = new CourseModel({
      title,
      description,
      duration,
      level,
      prerequisites,
      objectives,
      tasks,
      documents,
      images,
      videos,
    });

    const savedCourse: ICourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

// Get all courses
export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses: ICourse[] = await CourseModel.find().populate(['tasks', 'documents', 'images', 'videos']);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get courses' });
  }
};

// Update a course
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, duration, level, prerequisites, objectives, tasks, documents, images, videos } = req.body;

    const updatedCourse: ICourse | null = await CourseModel.findByIdAndUpdate(
      id,
      { title, description, duration, level, prerequisites, objectives, tasks, documents, images, videos },
      { new: true }
    ).populate(['tasks', 'documents', 'images', 'videos']);

    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedCourse: ICourse | null = await CourseModel.findByIdAndDelete(id);

    if (deletedCourse) {
      res.status(200).json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
