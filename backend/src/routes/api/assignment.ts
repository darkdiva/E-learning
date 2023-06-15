import express, { Request, Response } from 'express';
import { EnrollmentModel } from '../../models/enrollment';
import AssignmentModel from '../../models/assignment';
import { EnrolledAssignment, EnrolledAssignmentModel } from '../../models/enrolledAssignment';
import { EnrollmentItemModel } from '../../models/enrolledItem';
import { isInstructor } from '../../middleware/isInstructor';
import CourseCopyModel from '../../models/courseCopy';
import { AuthRequest } from '../../types/AuthRequest';

const router = express.Router();

// Create an assignment
router.post('/assignments/new', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { assignmentId, title, contentDocumentUrl } = req.body;

    // Retrieve the instructorId from the authenticated user or any appropriate source
    const instructorId = req.user?.id;

    // Find the course copy associated with the instructor
    const courseCopy = await CourseCopyModel.findOne({ instructor: instructorId }).exec();

    if (!courseCopy) {
      return res.status(404).json({ message: 'Course copy not found for the instructor' });
    }

    // Create the assignment
    const assignment = await AssignmentModel.create({
      assignmentId,
      title,
      contentDocumentUrl,
    });

    // Associate the assignment with the course taught by the instructor
    courseCopy.assignments.push(assignment._id);
    await courseCopy.save();

    res.status(201).json({ message: 'Assignment created successfully', assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Read assignments for the authenticated instructor
router.get('/assignments', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    // Retrieve the instructorId from the authenticated user or any appropriate source
    const instructorId = req.user?.id;

    // Find the course copy associated with the instructor
    const courseCopy = await CourseCopyModel.findOne({ instructor: instructorId }).exec();

    if (!courseCopy) {
      return res.status(404).json({ message: 'Course copy not found for the instructor' });
    }

    // Find all assignments associated with the course copy
    const assignments = await AssignmentModel.find({ _id: { $in: courseCopy.assignments } }).exec();

    res.status(200).json({ assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an assignment for the authenticated instructor
router.put('/assignments/:assignmentId', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { title, contentDocumentUrl } = req.body;

    // Retrieve the instructorId from the authenticated user or any appropriate source
    const instructorId = req.user?.id;

    // Find the course copy associated with the instructor
    const courseCopy = await CourseCopyModel.findOne({ instructor: instructorId }).exec();

    if (!courseCopy) {
      return res.status(404).json({ message: 'Course copy not found for the instructor' });
    }

    // Find the assignment associated with the course copy
    const assignment = await AssignmentModel.findOneAndUpdate(
      { _id: assignmentId},
      { title, contentDocumentUrl },
      { new: true }
    ).exec();

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found or not authorized' });
    }

    res.status(200).json({ message: 'Assignment updated successfully', assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an assignment for the authenticated instructor
router.delete('/assignments/:assignmentId', isInstructor, async (req: AuthRequest, res: Response) => {
  try {
    const { assignmentId } = req.params;

    // Retrieve the instructorId from the authenticated user or any appropriate source
    const instructorId = req.user?.id;

    // Find the course copy associated with the instructor
    const courseCopy = await CourseCopyModel.findOne({ instructor: instructorId }).exec();

    if (!courseCopy) {
      return res.status(404).json({ message: 'Course copy not found for the instructor' });
    }

    // Find and remove the assignment from the course copy
    const assignment = await AssignmentModel.findOneAndRemove({
      _id: assignmentId,
    }).exec();

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found or not authorized' });
    }

    // Remove the assignment ID from the course copy's assignments array
    const index = courseCopy.assignments.indexOf(assignment._id);
    if (index > -1) {
      courseCopy.assignments.splice(index, 1);
    }
    await courseCopy.save();

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get assignments for a student
/*router.get('/assignments/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // Find all enrollments for the student
    const enrollments = await EnrollmentModel.find({ student: studentId })
    .populate({
      path: 'enrollmentItems',
      populate: {
        path: 'assignment',
        model: 'Assignment',
      },
    });

    // Extract the assignments from the enrolled assignments
  const assignments = enrollments.flatMap(enrollment =>
    enrollment.enrollmentItems
      .filter(item => item instanceof EnrolledAssignmentModel.constructor)
      .map(item => (item as any).assignment)
  );
  
    res.status(200).json({ assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Submit answer for an assignment
router.post('/assignments/:assignmentId/submit/:studentId', async (req: Request, res: Response) => {
  try {
    const { assignmentId, studentId } = req.params;
    const { userAnswerDocUrl } = req.body;

    // Find the enrollment for the student and assignment
    const enrollment = await EnrollmentModel.findOne({ student: studentId }).populate('enrollmentItems');
    const enrolledAssignment = enrollment?.enrollmentItems.find(
      item => item instanceof EnrolledAssignmentModel && item.enrolledAssignmentId === assignmentId
    ) as EnrolledAssignment | undefined;

    if (!enrolledAssignment) {
      return res.status(404).json({ message: 'Enrolled assignment not found' });
    }

    // Update the enrolled assignment with the submitted answer
    enrolledAssignment.userAnswerDocUrl = userAnswerDocUrl;
    await EnrolledAssignmentModel.findByIdAndUpdate(enrolledAssignment._id, enrolledAssignment);

    res.status(200).json({ message: 'Answer submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

// Leave feedback for an enrolled assignment
router.post('/enrolled-assignments/:enrolledAssignmentId/feedback', async (req: Request, res: Response) => {
  try {
    const { enrolledAssignmentId } = req.params;
    const { instructorFeedbackDoc } = req.body;

    // Find the enrolled assignment
    const enrolledAssignment = await EnrolledAssignmentModel.findById(enrolledAssignmentId);

    if (!enrolledAssignment) {
      return res.status(404).json({ message: 'Enrolled assignment not found' });
    }

    // Update the enrolled assignment with the feedback and score
    enrolledAssignment.instructorFeedbackDoc = instructorFeedbackDoc;
    await enrolledAssignment.save();

    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
