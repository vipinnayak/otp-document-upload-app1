const express = require('express');
const app = express();
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/documentManagement', documentRoutes);
app.use('/api/documentManagement', require('./routes/documentRoutes'));
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://192.168.85.253:${PORT}`);
});
