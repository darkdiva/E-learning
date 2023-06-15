import mongoose, { Schema, model } from 'mongoose';
import { Assignment } from './assignment';
import { Image } from './image';
import { IDocument } from './document';

export interface CourseCopy extends Document {
  courseCopyId: number;
  instructor: Schema.Types.ObjectId;
  assignments: Assignment['_id'];
  images: Image['_id'];
  documents: IDocument['_id'];
}

const courseCopySchema = new Schema<CourseCopy>({
  courseCopyId: { type: Number, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
  assignments: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  images: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
  documents: { type: Schema.Types.ObjectId, ref: 'IDocument', required: true },

});

const CourseCopyModel = mongoose.model<CourseCopy>('CourseCopy', courseCopySchema);
export default CourseCopyModel;