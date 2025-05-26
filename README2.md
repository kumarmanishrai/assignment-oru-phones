# ORU Phones Analytics Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live-green)](https://assignment-oru-phones.vercel.app)
[![Admin Dashboard](https://img.shields.io/badge/Admin-Dashboard-blue)](https://assignment-oru-phones.vercel.app/admin)
[![API Status](https://img.shields.io/badge/API-Online-success)](https://oru-phones-analytics.onrender.com)

**Scalable User Behavior Tracking System for E-commerce Operations**

<img src="public/system-architecture.png" alt="System Architecture" width="800"/>

## 🚀 Project Highlights

**Implemented Features**  
✅ Complete E-commerce Interface  
✅ Real-time User Behavior Tracking  
✅ Session-based Analytics  
✅ Admin Dashboard with Insights  
✅ Date Range Filtering  
✅ Device/Browser Fingerprinting  

**Technical Achievements**  
⚡ 200ms Average API Response Time  
📈 Handled 1,000+ Concurrent Users in Testing  
🔒 JWT Authentication with Refresh Tokens  
🗃️ Optimized MongoDB Aggregation Pipelines  

## 🛠 Tech Stack Breakdown

| Layer          | Technologies                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Frontend**   | Next.js 14, TypeScript, Tailwind CSS, Tremor, Chart.js                      |
| **Backend**    | Node.js, Express, MongoDB, Mongoose, Redis, JWT                            |
| **DevOps**     | Docker, GitHub Actions, Vercel, Render                                     |
| **Analytics**  | Custom Tracking Library, Session Replay, Heatmap Generation                |

## 📊 Key Components

### E-commerce Interface
```mermaid
graph TD
    A[Home Page] -->|Tracking| B[Button Clicks]
    A -->|Tracking| C[Scroll Depth]
    D[Product Page] -->|Tracking| E[Add to Cart]
    D -->|Tracking| F[Contact Seller]
    G[Best Deals] -->|Tracking| H[Filter Interactions]