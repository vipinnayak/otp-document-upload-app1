const express = require('express');
const router = express.Router();
const multer = require('multer');

// 📁 Storage config for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // uploads folder me file save hogi
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage }); // ✅ yahi chahiye tha

let storedOTP = null;

// OTP routes
router.post('/generateOTP', (req, res) => {
  const { mobile_number } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  storedOTP = otp;
  console.log(`OTP sent to ${mobile_number}: ${otp}`);
  res.json({ success: true, message: 'OTP sent successfully' });
});

router.post('/validateOTP', (req, res) => {
  const { mobile_number, otp } = req.body;
  console.log(`Received OTP: ${otp}, Stored OTP: ${storedOTP}`);
  if (otp === storedOTP) {
    const token = 'mocked-jwt-token-123';
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid OTP' });
  }
});

// ✅ File Upload Route (with form-data)
router.post('/saveDocumentEntry', upload.single('file'), (req, res) => {
  const file = req.file;
  const data = JSON.parse(req.body.data);

  console.log('Received file:', file.originalname);
  console.log('Received metadata:', data);

  res.json({ success: true, message: 'File uploaded successfully' });
});

module.exports = router;
