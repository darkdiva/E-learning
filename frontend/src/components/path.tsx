import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PathModel from  '../../models/path'
const PathPage = () => {
  const [path, setPath] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    creationDate: '',
    courses : '',
  });

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const response = await axios.get('/api/path/:id');
        setPath(response.data);
        setFormData({
          label: response.data.label,
          description: response.data.description,
          creationDate: response.data.creationDate,
          courses: response.data.courses
        });
      } catch (error) {
        console.log('Error fetching path:', error);
      }
    };

    fetchPath();
  }, []);

  const handlereatePath = async () => {
    try {
      await axios.post('/api/path', formData);
      // Handle success or show a notification
    } catch (error) {
      console.log('Error adding path:', error);
    }
  };

  const handleEditPath = async () => {
    try {
      await axios.put(`/api/path/${PathModel._id}`, formData);
      // Handle success or show a notification
      setEditMode(false);
    } catch (error) {
      console.log('Error editing path:', error);
    }
  };
  const handleDeletePath = async () => {
    try {
      await axios.delete(`/api/path/${PathModel._id}`);
      // Handle success or show a notification
    } catch (error) {
      console.log('Error deleting path:', error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (!path) {
    return <div>Loading path...</div>;
  }

  return (
    <div>
      <h1>{editMode ? 'Edit Path' : 'View Path'}</h1>
      {editMode ? (
        <>
          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleInputChange}
          />

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label>Creation Date:</label>
          <input
            type="text"
            name="creationDate"
            value={formData.creationDate}
            onChange={handleInputChange}
          />
          <label>courses:</label>
          <input
            type="text"
            name="courses"
            value={formData.courses}
            onChange={handleInputChange}
          />

          <button onClick={handleEditPath}>Save</button>
        </>
      ) : (
        <>
          <h2>{PathModel.label}</h2>
          <p>{PathModel.description}</p>
          <p>Creation Date: {PathModel.creationDate}</p>
          <p>Path Items</p>
          <ul>
            {PathModel.courses.map((courses: { _id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
              <li key={courses._id}>
                {/* Render course item details */}
                <p>{courses.title}</p>
                <p>{courses.description}</p>

                {/* Render other actions for each path item */}
                {/* For example: Edit and Delete buttons */}
                <button>Edit</button>
                <button>Delete</button>
              </li>
            ))}
          </ul>

         
          {/* Edit the path */}
          <button onClick={handleEditClick}>Edit Path</button>

          {/* Delete the path */}
          <button onClick={handleDeletePath}>Delete Path</button>
        </>
      )}
    </div>
  );
            }
 export default PathPage ;
