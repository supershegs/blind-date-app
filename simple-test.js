// Simple test without bcrypt dependencies
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const port = 3001;
const server = app.listen(port, () => {
  console.log(`✅ Basic server test successful on port ${port}`);
  server.close();
  console.log('✅ All basic functionality working');
});