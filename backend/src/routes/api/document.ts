import express, { Response } from 'express';
import { AuthRequest } from '../../types/AuthRequest';
import { DocumentModel } from '../../models/document';
import { isInstructor } from '../../middleware/isInstructor';

const router = express.Router();

// Create a new document
router.post('/documents', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { id, description, title, contentDocumentURL} = req.body;

    const newDocument = new DocumentModel({
      id,
      description,
      title,
      contentDocumentURL,
    });

    const savedDocument = await newDocument.save();

    res.status(201).json({ document: savedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all documents for the instructor
router.get('/documents', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;

    const documents = await DocumentModel.find({ instructorId }, 'title');

    res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get a document by ID for the instructor
router.get('/documents/:id', async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;
    const documentId = req.params.id;

    const document = await DocumentModel.findOne({ _id: documentId, instructorId });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update a document by ID for the instructor
router.put('/documents/:id', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;
    const documentId = req.params.id;
    const { id, description, title, contentDocumentURL } = req.body;

    const updatedDocument = await DocumentModel.findOneAndUpdate(
      { _id: documentId, instructorId },
      { id, description, title, contentDocumentURL },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ document: updatedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a document by ID for the instructor
router.delete('/documents/:id', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;
    const documentId = req.params.id;

    const deletedDocument = await DocumentModel.findOneAndDelete({ _id: documentId, instructorId });

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
