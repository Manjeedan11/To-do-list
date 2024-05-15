require('dotenv').config();
const express = require('express');
const app = express();
const connectToDatabase = require('./db');
const taskRoutes = require('./routes/taskRouting');

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('');
});

connectToDatabase();
