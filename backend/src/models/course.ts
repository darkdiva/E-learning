import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description: String,
  duration: Number,
  level: String,
  prerequisites: String,
  objectives: [String],
  tasks: mongoose.Types.ObjectId[];
  documents: mongoose.Types.ObjectId[];
  images: mongoose.Types.ObjectId[];
  videos: mongoose.Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  level :{type:String , required:true},
  prerequisites: { type: String, required: true },
  objectives: { type: [String], required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

export default mongoose.model<ICourse>('Course', CourseSchema);
export { ICourse }; 