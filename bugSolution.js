const express = require('express');
const app = express();
app.use(express.json());
app.post('/data', (req, res) => {
  if (req.is('application/json')) {
    console.log(req.body);
  } else {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(400).send('Invalid JSON');
        return;
      }
    });
  }
  res.send('Data received');
});
app.listen(3000, () => console.log('Server listening on port 3000'));