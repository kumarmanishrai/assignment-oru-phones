# ORU Phones E-Commerce & Analytics Platform

## Overview

This project is a full-stack e-commerce web application for buying and selling used phones, built as part of an assignment. It features:

- **User and Admin Authentication**
- **Product Listings with Filters**
- **User Activity Tracking & Analytics**
- **Admin Dashboard with Visual Reports**
- **Modern UI with Responsive Design**

The project is divided into two main parts:
- **Frontend:** Built with Next.js and React (in `/e-commerce-app`)
- **Backend:** Built with Node.js, Express, MongoDB, and Redis (in `/server`)

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Assignment Requirements Mapping](#assignment-requirements-mapping)
- [Technical Stack](#technical-stack)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Side

- **Sign Up / Login / Logout**
- **Browse Used Phones**
- **Filter by Brand, RAM, Storage, Price, Condition, Features**
- **View Product Details**
- **Track User Interactions (page visits, button clicks, scroll, time spent, etc.)**

### Admin Side

- **Admin Login**
- **View Analytics Dashboard**
- **See Top Visited Pages, Top Filters, Top Buttons, Top Links**
- **User-wise and Page-wise Analytics**
- **Date Range Filtering for Reports**
- **Visualizations (Bar, Doughnut charts, etc.)**

### Tracking & Analytics

- **Tracks:**
  - Page visits
  - Button/link clicks
  - Scroll percentage
  - Time spent per page
  - Filter usage
  - User login/logout events
- **Stores analytics in MongoDB and Redis for fast access**

---

## Project Structure

```
assignment-oru-phones/
│
├── e-commerce-app/      # Frontend (Next.js, React, TailwindCSS)
│   ├── src/
│   │   ├── components/  # Reusable UI components (Header, StatCard, etc.)
│   │   ├── pages/       # Next.js pages (login, signup, admin, index, etc.)
│   │   ├── context/     # React context for auth, user state
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
│
├── server/              # Backend (Node.js, Express, MongoDB, Redis)
│   ├── src/
│   │   ├── controller/  # Route controllers (user, admin, analytics)
│   │   ├── middleware/  # Auth, session, tracking middleware
│   │   ├── models/      # Mongoose models (User, Phone, Analytics, etc.)
│   │   ├── routes/      # Express routes (user, admin, analytics)
│   │   └── utils/       # Utility functions
│   └── index.ts         # Entry point
│
├── Assignment.pdf       # Assignment description
└── README.md            # Project documentation
```

---

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- Redis (local or cloud)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/kumarmanishrai/assignment-oru-phones.git
cd assignment-oru-phones
```

### 2. Backend Setup

```bash
cd server
npm install
# Create a .env file (see .env.example for reference)
npm run dev
```

- The backend will start on the port specified in `.env` (default: 5000).

### 3. Frontend Setup

```bash
cd ../e-commerce-app
npm install
# Create a .env.local file (see .env.example for reference)
npm run dev
```

- The frontend will start on [http://localhost:3000](http://localhost:3000).

---

## Usage

- **User:** Sign up or log in to browse and filter phones.
- **Admin:** Log in as admin to access the analytics dashboard.
- **Analytics:** All user interactions are tracked and visualized for the admin.

---

## Assignment Requirements Mapping

| Assignment Requirement                | Implementation Details                                                                 |
|----------------------------------------|---------------------------------------------------------------------------------------|
| User Authentication                   | `/e-commerce-app/src/pages/login.tsx`, `/server/src/controller/userController.ts`     |
| Admin Authentication                  | `/e-commerce-app/src/pages/login.tsx`, `/server/src/controller/adminController.ts`    |
| Product Listing & Filtering           | `/e-commerce-app/src/pages/index.tsx`, `/components/PhoneList.tsx`                    |
| User Activity Tracking                | `/server/src/middleware/trackingMiddleware.ts`, `/controller/analyticsController.ts`  |
| Analytics Dashboard                   | `/e-commerce-app/src/pages/admin.tsx` (charts, stats, filters, modals)                |
| Date Range Filtering                  | Admin dashboard date pickers, backend query params                                    |
| Visual Reports (Charts)               | Chart.js integration in `/e-commerce-app/src/pages/admin.tsx`                         |
| Session Management                    | Express-session, Redis, custom middleware                                             |
| Data Storage                          | MongoDB for persistent data, Redis for sessions and fast analytics                    |
| Responsive UI                         | TailwindCSS, responsive grid layouts                                                  |

---

## Technical Stack

- **Frontend:** Next.js, React, TailwindCSS, Chart.js
- **Backend:** Node.js, Express, MongoDB (Mongoose), Redis
- **Authentication:** Sessions (express-session, Redis store)
- **Tracking:** Custom middleware, MongoDB for analytics
- **Visualization:** Chart.js (Bar, Doughnut, etc.)

---

## Screenshots

> _Add screenshots of the login page, product listing, admin dashboard, and analytics charts here for better illustration._

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is for educational purposes as part of an assignment.

---

## Contact

For any queries, contact [kumarmanishrai](https://github.com/kumarmanishrai).
