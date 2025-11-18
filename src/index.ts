import express from 'express';
import http from 'http';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Define a route to handle GET requests to the root
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server and listen on the defined port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
