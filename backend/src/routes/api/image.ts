import express, { Response } from 'express';
import { AuthRequest } from '../../types/AuthRequest';
import multer, { Multer, FileFilterCallback } from 'multer';
import { isInstructor } from '../../middleware/isInstructor';
import { ImageModel } from '../../models/image';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, 'file-' + uniqueSuffix + '.' + extension);
  },
});


const fileFilter = (req: express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Check file types and reject unsupported files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter,
});

const router = express.Router();

router.post('/content/image/upload', isInstructor, upload.single('image'), (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        // No file was uploaded
        return res.status(400).json({ message: 'No image file uploaded.' });
      }

      // Access the uploaded file details
      const file: Express.Multer.File = req.file;
      const imagePath = file.path; // Deprecated: Use file.filename instead

      // Handle the file as needed (e.g., save the path in the database, process the image, etc.)

      res.status(200).json({ message: 'Image uploaded successfully.', imagePath });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

router.get('/content/images', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const images = await ImageModel.find();

    res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.delete('/content/image/:id', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const imageId = req.params.id;

    // Find the image by its ID in the database
    const image = await ImageModel.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the image file from the server
    const imagePath = image.path;
    fs.unlinkSync(path.join(__dirname, '..', '..', imagePath));

    // Delete the image from the database
    await ImageModel.findByIdAndDelete(imageId);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
