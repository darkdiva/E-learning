import mongoose, { Schema, model } from 'mongoose';
import { EnrolledAssignment } from './enrolledAssignment';

export interface EnrollmentItem extends Document {
    enrollmentItemId: number;
    isCompleted: boolean;
  }
  
  const enrollmentItemSchema = new Schema<EnrollmentItem>({
    enrollmentItemId: { type: Number, required: true },
    isCompleted: { type: Boolean, required: true },
  });

  export const EnrollmentItemModel = mongoose.model<EnrollmentItem>('EnrollmentItem', enrollmentItemSchema);
