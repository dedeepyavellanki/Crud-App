const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemsRouter);

// serve static UI
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
