# OTP Document Upload App

This project includes both frontend and backend code for OTP-based login and document upload functionality.

## 📱 Frontend (React Native - Expo)
- Path: `dmsapp/`
- Install: `cd dmsapp && npm install`
- Run: `npx expo start`
- Features: OTP login, document date selector, file picker (PDF/image), camera capture

## 🌐 Backend (Node.js + Express)
- Path: `mock-backend/`
- Install: `cd mock-backend && npm install`
- Create folder: `uploads`
- Run: `node server.js`
- Features: OTP generation and verification, file upload with metadata

## 🔐 Auth
- Dummy token returned on OTP verification
- Token used to authorize document upload

## ✅ Folder Structure

