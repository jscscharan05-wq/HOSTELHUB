const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const vendingRoutes = require('./routes/vendingRoutes');
const gymRoutes = require('./routes/gymRoutes');

app.use('/api', vendingRoutes);
app.use('/api', gymRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));