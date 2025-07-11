const fs = require('fs');
let OTP = '123456'; // Static OTP for demo

exports.generateOTP = (req, res) => {
  const { mobile_number } = req.body;
  console.log(`OTP sent to ${mobile_number}`);
  res.json({ success: true, message: 'OTP sent successfully' });
};

exports.validateOTP = (req, res) => {
  const { mobile_number, otp } = req.body;
  if (otp === OTP) {
    res.json({ success: true, token: 'mock-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid OTP' });
  }
};

exports.saveDocument = (req, res) => {
  // Not handling file upload here (can add multer for real use)
  res.json({ success: true, message: 'Document saved successfully' });
};

exports.searchDocuments = (req, res) => {
  res.json({
    success: true,
    documents: [
      {
        id: 1,
        name: 'document1.pdf',
        type: 'pdf',
        url: 'https://example.com/document1.pdf',
      },
      {
        id: 2,
        name: 'image1.jpg',
        type: 'image',
        url: 'https://example.com/image1.jpg',
      },
    ],
  });
};

exports.getTags = (req, res) => {
  const tags = require('../data/tags.json');
  res.json({ success: true, tags });
};
