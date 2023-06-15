import mongoose, { Schema, Document } from 'mongoose';


export interface Assignment extends Document {
  assignmentId: number;
  title: string;
  contentDocumentUrl: string;
}

const assignmentSchema = new Schema<Assignment>({
  assignmentId: { type: Number, required: true },
  title: { type: String, required: true },
  contentDocumentUrl: { type: String, required: true },
});

const AssignmentModel = mongoose.model<Assignment>('Assignment', assignmentSchema);
export default AssignmentModel;
