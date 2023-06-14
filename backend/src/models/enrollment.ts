import mongoose, { Schema, model } from 'mongoose';

export interface Enrollment extends Document {
    enrollmentId: number;
    score: number;
    student: Schema.Types.ObjectId;
    courseCopy: Schema.Types.ObjectId;
    enrollmentItems: Schema.Types.ObjectId[];
  }
  
  const enrollmentSchema = new Schema<Enrollment>({
    enrollmentId: { type: Number, required: true },
    score: { type: Number, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    courseCopy: { type: Schema.Types.ObjectId, ref: 'CourseCopy', required: true },
    enrollmentItems: [{ type: Schema.Types.ObjectId, ref: 'EnrollmentItem' }]
  });
  
  export const EnrollmentModel = mongoose.model<Enrollment>('Enrollment', enrollmentSchema);
