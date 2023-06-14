import mongoose, { Schema, Document } from 'mongoose';
import {Assignment} from './assignment';
import { EnrollmentItem, EnrollmentItemModel } from './enrolledItem';

export interface EnrolledAssignment extends EnrollmentItem {
  _id: Schema.Types.ObjectId;
    enrolledAssignmentId: string;
    userAnswerDocUrl: string;
    instructorFeedbackDoc: string;
    assignment: Assignment['_id'];
  }
  
  const enrolledAssignmentSchema = new Schema<EnrolledAssignment>({
    enrolledAssignmentId: { type: String, required: true },
    userAnswerDocUrl: { type: String, required: true },
    instructorFeedbackDoc: { type: String },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  });
  
  export const EnrolledAssignmentModel = EnrollmentItemModel.discriminator<EnrolledAssignment>(
    'EnrolledAssignment',
    enrolledAssignmentSchema);
