import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Assignment} from '../../../backend/src/models/assignment';

const InstructorAssignment: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
      assignmentId: 0,
      title: '',
      contentDocumentUrl: '',
    });
  
    useEffect(() => {
      fetchAssignments();
    }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get<{ assignments: Assignment[] }>('/assignments/instructor');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAssignment((prevAssignment) => ({ ...prevAssignment, [name]: value }));
  };
  

  const handleAddAssignment = async () => {
    try {
      const { assignmentId, title, contentDocumentUrl } = newAssignment;
  
      const createdAssignment = {
        assignmentId: assignmentId ,
        title,
        contentDocumentUrl,
      };
  
      await axios.post('/assignments/new', createdAssignment);
  
      setNewAssignment({
        _id: '',
        assignmentId: 0, // Set assignmentId as 0 (or any valid number) for initial state
        title: '',
        contentDocumentUrl: '',
      });
  
      fetchAssignments();
    } catch (error) {
      console.error(error);
    }
  };
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [action, setAction] = useState<'update' | 'delete' | null>(null);
  const handleDeleteAssignment = async () => {
    if (selectedAssignment) {
      try {
        await axios.delete(`/assignments/${selectedAssignment._id}`);
        fetchAssignments();
        setSelectedAssignment(null); // Clear the selected assignment after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContentDocumentUrl, setUpdatedContentDocumentUrl] = useState('');
  const handleUpdateAssignment = async () => {
    if (selectedAssignment && updatedTitle && updatedContentDocumentUrl) {
      try {
        const updatedAssignment = {
          ...selectedAssignment,
          title: updatedTitle,
          contentDocumentUrl: updatedContentDocumentUrl,
        };
  
        await axios.put(`/assignments/${selectedAssignment._id}`, updatedAssignment);
        fetchAssignments();
        setSelectedAssignment(null);
        setUpdatedTitle(''); // Clear the updated title after updating
        setUpdatedContentDocumentUrl(''); // Clear the updated content document URL after updating
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  
  
  const handleSelectAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setAction('update'); // Set the action to 'update' when an assignment is selected
  };
  

  return (
    <div>
      <h2>Instructor Assignments</h2>

      <h3>Add an Assignment</h3>
      <div>
        <label>Assignment ID:</label>
        <input type="number" name="assignmentId" value={newAssignment.assignmentId} onChange={handleInputChange} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={newAssignment.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Content Document URL:</label>
        <input type="text" name="contentDocumentUrl" value={newAssignment.contentDocumentUrl} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddAssignment}>Add Assignment</button>

      <h3>Assigned Assignments</h3>
      {assignments.map((assignment) => (
  <div key={assignment._id}>
    <p>Assignment ID: {assignment.assignmentId}</p>
    <p>Title: {assignment.title}</p>
    <p>Content Document URL: {assignment.contentDocumentUrl}</p>
    {selectedAssignment?._id === assignment._id && (
      <>
        <button onClick={() => handleUpdateAssignment()}>Update</button>
        <button onClick={() => handleDeleteAssignment()}>Delete</button>
      </>
    )}
    {!selectedAssignment && (
      <button onClick={() => handleSelectAssignment(assignment)}>Select</button>
    )}
    <hr />
  </div>
))}
    </div>
  );
};

export default InstructorAssignment;
