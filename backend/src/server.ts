import express from 'express';
import mongoose from 'mongoose';
import Authrouters from './routes/api/auth';

const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/elearning', ).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});

app.use(express.json());

app.use('/signup', Authrouters);
app.use('/signin', Authrouters);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
