import mongoose, { Document, Schema } from 'mongoose';

interface VideoModel extends Document {
  title: string;
  description: string;
  filePath: string;
  duration: number;
  uploadDate: Date;
}

const videoSchema = new Schema<VideoModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filePath: { type: String, required: true },
  duration: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
});

export default mongoose.model<VideoModel>('Video', videoSchema);
export {VideoModel} ;
