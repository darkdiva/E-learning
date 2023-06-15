import mongoose, { Schema, Document } from 'mongoose';

interface IDocument extends Document {
  id: string;
  description: string;
  title: string;
  contentDocumentURL: string;
}

const documentSchema = new Schema<IDocument>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  contentDocumentURL: { type: String, required: true },
});

const DocumentModel = mongoose.model<IDocument>('IDocument', documentSchema);

export { IDocument, DocumentModel };