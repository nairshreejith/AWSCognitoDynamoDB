const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const cors = require('cors');

const uuid = require('uuid');
// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.json());


AWS.config.update({
    region: 'us-east-2', // Specify your desired region
    accessKeyId: 'AKIAQF37IK47P2VVX46Q', // Specify your AWS access key
    secretAccessKey: 'X8SUBfNkA/8OZLNqdzsHpxQ7z0H9hzrLydaHb3Vc', // Specify your AWS secret access key
  });
  

// DynamoDB Config
const dynamoDB = new AWS.DynamoDB.DocumentClient();
  
  app.get('/notes', (req, res) => {
    const params = {
      TableName: 'notes' 
    };
  
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(data.Items);
      }
    });
  });
  
  app.post('/notes', (req, res) => {
    const { content } = req.body;
    const id = uuid.v4();
  
    const params = {
      TableName: 'notes', 
      Item: {
        id,
        content
      }
    };
  
    dynamoDB.put(params, err => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Note created successfully' });
      }
    });
  });
  

  app.delete('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
  
    const params = {
      TableName: 'notes', 
      Key: {
        id: noteId
      }
    };
  
    dynamoDB.delete(params, (err, data) => {
      if (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Note deleted successfully');
        res.json({ message: 'Note deleted successfully' });
      }
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
