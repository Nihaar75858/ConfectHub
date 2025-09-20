# ConfectHub
A Sweet Shop Management System built with **React (frontend)**, **Django (backend)**, and **SQLite (database)**. 

## Summary
This website allows users to view and buy sweets of all types. They can search and filter the sweets that they like. On the other side, the Admin has full control over the sweets, from CRUD operations to tracking inventory. Both are provided dashboards for their usage.

---

## Features
- User registration and authentication (Django REST Framework + JWT)
- Admin dashboard for:
  - Viewing sweets
  - Managing sweets (create, update, delete, restock)
- Customer dashboard for:
  - Viewing available sweets
  - Searching & filtering by category, name, or price
  - Purchasing sweets (with stock updates)
- Responsive UI with React
- SQLite Db for flexible document storage

---

## Tech Stack
**Frontend:** React, TailwindCSS, Jest (for testing)  
**Backend:** Django REST Framework, Python, djongo (MongoDB adapter)  
**Database:** SQLite
**Authentication:** JWT Tokens  

---

## Installation

1. **Clone the repository**
    git clone https://github.com/your-username/confecthub.git
    cd confecthub

2. **Backend Setup (Django + SQLite)**
    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver  

3. **Frontend Setup (React + TailwindCSS)**
    cd frontend
    npm i
    npm run dev

---

## Running Tests
1. **Backend Tests (Django):**
    python manage.py runserver

2. **Frontend Tests (React):**
    npm run dev

---

## Project Structure

confecthub/
│
├── server/ 
│   ├── api/    
|   |   ├──pycache/
|   |   |   └──  ...
|   |   ├──migrations/
|   |   |   └──  ... 
|   |   ├── ...
│   ├── server/
|   |   ├── pycache
|   |   |   └── ...   
|   |   └── ...
│   ├── db.sqlite3
|   └── manage.py
│
├── client/       # React frontend
│   ├── public/
|   |   └── ...
│   ├── src/
|   |   ├── components/
|   |   |   └── ..
|   |   ├── pages/
|   |   |   ├── Admin/
|   |   |   |   └──  ...
|   |   |   ├── Auth/
|   |   |   |   └──  ...
|   |   |   ├── Dashboard /
|   |   |   |   └── ...
|   |   ├── App.css
|   |   ├── App.jsx
|   |   ├── index.css
|   |   └── main.jsx
│   └── ...
│
└── README.md

## My AI Usage

**Tools Used**
- ChatGPT (GPT-5)
- Claude

**How I Used Them**
- I used ChatGPT to:
    - Brainstorm project names and finally decide on ConfectHub.
    - Generate boilerplate React code with debugging.
    - Guide me through Test-Driven Development (Red-Green-Refactor method).
    - Help with React testing examples using @testing-library/react.
    - Explain new libraries (like pytest, de-couple).

- I used Claude to:
    - Generate boilerplate Django serializers and REST API views.
    - Guide me through Test-Driven Development in python (Eg: How to use it in views).
    - Debug issues with linkages and how CRUD operations are implemented.
    - Explain tricky errors (e.g., JSON serialization issues in Django).

**Reflection**
- Using AI significantly improved my workflow:
    - It helped me move faster by generating boilerplate code that I refined later.
    - It provided learning support: when I was stuck (e.g., serializer issues or auth checks), I got clear explanations.
    - It let me focus more on developing the logic and design instead of repetitive code.

- However, I also noticed:
    - Some AI-generated code required careful review. For example, incorrect fetch handling in React or missing edge-case validation in Django.
    - AI is a great assistant, but I needed to manually debug, refactor, and test everything to ensure production-level quality with proper format.
    - Overall, AI tools acted like a pair programmer that accelerated development but are to be surveyed constantly to understand how the code works in order to fix AI errors.

