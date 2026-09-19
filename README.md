 COMPLYX AI

### Autonomous Contract & Compliance Intelligence System

COMPLYX AI is an AI-powered platform that analyzes contracts and organizational policies to identify obligations, detect compliance risks, and provide evidence-based explanations.

## Features

*  Contract & policy PDF upload
*  AI-powered obligation extraction
*  Policy rule extraction
*  Compliance risk detection
*  Compliance dashboard
*  AI-generated explanations
*  Evidence-based risk analysis
*  Contract vs. policy comparison
*  3 switchable UI themes
*  Responsive design

##  Tech Stack

**Frontend**

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide Icons

**Backend**

* Python
* FastAPI
* PyMuPDF

**Database**

* PostgreSQL

**AI**

* Gemini API

##  Architecture


Contract / Policy PDF
        ↓
   PDF Extraction
        ↓
   AI Processing
        ↓
Obligation & Policy Extraction
        ↓
 Compliance Analysis
        ↓
    Risk Detection
        ↓
 Evidence & Explanation
        ↓
     Dashboard


##  Project Structure


complyx-ai/
├── frontend/
├── backend/
├── sample_data/
├── README.md
└── docker-compose.yml


##  Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd complyx-ai
```

### 2. Start Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

##  Environment Variables

Create a `.env` file in the backend:

```env
GEMINI_API_KEY=your_api_key
DATABASE_URL=your_database_url
```


##  Goal

> **Turn Contracts Into Compliance Intelligence.**

COMPLYX AI aims to make contract compliance analysis faster, explainable, and easier to understand by connecting contractual obligations with organizational policies and providing traceable evidence for every detected risk.

