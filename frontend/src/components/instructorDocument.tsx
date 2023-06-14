import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IDocument } from '../../../backend/src/models/document';

const instructorDocument: React.FC = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null> (null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get<{ documents: IDocument[] }>('/documents');
      setDocuments(response.data.documents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('document', file);
        const response = await axios.post<{ document: IDocument }>('/documents', formData);
        const { document } = response.data;
        setDocuments((prevDocuments) => [...prevDocuments, document]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDocumentDelete = async (documentId: string) => {
    try {
      await axios.delete(`/documents/${documentId}`);
      setDocuments((prevDocuments) => prevDocuments.filter((document) => document.id !== documentId));
      setSelectedDocument(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocumentSelect = (document: IDocument) => {
    setSelectedDocument(document);
  };

  return (
    <div>
      <h2>Documents</h2>

      <h3>Upload a Document</h3>
      <input type="file" accept=".pdf" onChange={handleDocumentUpload} />

      <h3>Uploaded Documents</h3>
      {documents.map((document) => (
        <div key={document.id}>
          <p>{document.title}</p>
          {selectedDocument === document ? (
            <>
              <button onClick={() => handleDocumentDelete(document.id)}>Delete</button>
              <p>Selected</p>
            </>
          ) : (
            <button onClick={() => handleDocumentSelect(document)}>Select</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default instructorDocument;
