# TechNews

A simple full-stack tech news app built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express, MongoDB

## How to Run

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=your_email
ADMIN_PASSWORD=your_password
PORT=5000
```

```bash
npm start
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`

## Pages

- `/` — Home
- `/admin/login` — Admin login
- `/admin/dashboard` — Admin dashboard

## Author

[Charan Sai Musunuru](https://github.com/MUsunuruCharanSai)
