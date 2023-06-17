import express from 'express';
import {
  createPath,
  updatePath,
  getPathById,
  getAllPaths,
  deletePath,
} from '../controllers/PathController';

const router = express.Router();

router.post('/', createPath);
router.put('/:id', updatePath);
router.get('/:id', getPathById);
router.get('/', getAllPaths);
router.delete('/:id', deletePath);

export default router;
