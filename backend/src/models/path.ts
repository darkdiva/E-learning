import mongoose, { Schema, Document } from 'mongoose';

interface IPath extends Document {
  label: string;
  description: string;
  creationDate: Date;
  courses: mongoose.Types.ObjectId[];
}

const PathSchema = new Schema<IPath>({
  label: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

const PathModel = mongoose.model<IPath>('Path', PathSchema);

export { PathModel, IPath };
