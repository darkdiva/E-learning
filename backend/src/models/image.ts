import mongoose, { Schema, Document } from 'mongoose';
import { CourseCopy } from './courseCopy';

interface Image extends Document {
  filename: string;
  mimetype: string;
  path: string;
}

const imageSchema = new Schema<Image>({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  path: { type: String, required: true },
});

const ImageModel = mongoose.model<Image>('Image', imageSchema);

export { Image, ImageModel };
