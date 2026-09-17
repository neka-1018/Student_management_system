# Student Management System – CRUD Web Application

## 1. Project Overview
The Student Management System is a full-stack web application that allows a college
administrator to manage student records. It supports creating, viewing, searching,
filtering, updating, and deleting student data through a REST API.

**Developed by:** [Your Name]
**Register Number:** [Register Number]
**College:** [College Name]

## 2. Problem Statement
Colleges often maintain student records manually or in scattered spreadsheets,
which makes searching, updating, and validating data difficult and error-prone.
This project solves that by providing a single web application backed by a
database, with proper validation and a simple, usable interface.

## 3. Objectives
- Build a REST API to manage student records (CRUD).
- Build a React frontend to interact with the API.
- Validate data both on the client and server.
- Provide search and filter functionality.
- Demonstrate a complete, working full-stack application suitable as a college
  mini project.

## 4. Features
- Add, view, update, and delete student records
- Search by Student ID, Name, or Email
- Filter by Department and Year
- Dashboard summary (total students, CSE/ECE/IT counts)
- Client-side and server-side validation with clear error messages
- Success and error notifications
- Loading and empty states
- Delete confirmation dialog

## 5. Technology Stack
| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Vite), JavaScript, HTML, CSS |
| Backend    | Python, Django, Django REST Framework |
| Database   | SQLite                              |
| API Testing| Postman                             |
| Versioning | Git, GitHub                         |

## 6. Architecture
```
[ React (Vite) Frontend :5173 ]  <--fetch()-->  [ Django REST API :8000 ]  <-->  [ SQLite DB ]
```
The React app calls the Django REST Framework API using the browser `fetch` API.
`django-cors-headers` allows the frontend (port 5173) to call the backend (port 8000).

## 7. Database Design

**Table: students_student**

| Field          | Type      | Constraints              |
|----------------|-----------|---------------------------|
| id             | Integer   | Primary key, auto         |
| student_id     | String    | Required, unique          |
| name           | String    | Required                  |
| email          | Email     | Required, unique          |
| phone          | String    | Required                  |
| department     | Choice    | CSE/ECE/EEE/IT/Mechanical/Civil |
| year           | Integer   | 1–4                        |
| date_of_birth  | Date      | Required                  |
| gender         | Choice    | Male/Female/Other         |
| address        | Text      | Required                  |
| created_at     | DateTime  | Auto                        |
| updated_at     | DateTime  | Auto                        |

## 8. API Endpoints

| Method | Endpoint               | Description        | Success Code |
|--------|-------------------------|---------------------|--------------|
| GET    | /api/students/          | List all students   | 200 |
| GET    | /api/students/{id}/     | Get one student     | 200 |
| POST   | /api/students/          | Create a student    | 201 |
| PUT    | /api/students/{id}/     | Full update         | 200 |
| PATCH  | /api/students/{id}/     | Partial update      | 200 |
| DELETE | /api/students/{id}/     | Delete a student    | 204 |

Query parameters: `?search=<text>`, `?department=<CSE|ECE|EEE|IT|Mechanical|Civil>`, `?year=<1-4>`

## 9. CRUD Explanation
- **Create:** `StudentForm` sends a POST request with the form data.
- **Read:** `App.jsx` fetches the list with GET on load, search, and filter changes.
- **Update:** `StudentForm` (pre-filled) sends a PUT request to `/api/students/{id}/`.
- **Delete:** A confirmation dialog is shown; on confirm, a DELETE request is sent.

## 10. Validation
**Server-side** (Django REST Framework serializer):
- student_id: required, unique
- name: required
- email: required, valid format, unique
- phone: required, valid format
- year: must be 1–4
- department/gender: must be one of the defined choices

**Client-side** (React form):
- Same rules checked before submission
- Errors shown beside each field
- Server validation errors (e.g. duplicate email) are also displayed beside fields

## 11. Installation

### Prerequisites
- Python 3.10+ installed
- Node.js 18+ and npm installed
- VS Code (recommended)
- Git installed

### Backend Setup (Windows PowerShell or CMD)
```
cd Student-Management-System\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Backend runs at: http://127.0.0.1:8000

### Frontend Setup (new terminal)
```
cd Student-Management-System\frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

## 12. How to Run
1. Start the Django backend (`python manage.py runserver`) — keep this terminal open.
2. In a second terminal, start the React frontend (`npm run dev`).
3. Open http://localhost:5173 in your browser.
4. Ensure the backend terminal is running whenever you use the app.

## 13. Postman Testing
See the "Postman Testing" section provided separately in the project instructions
for the full list of requests (Create, Read, Update, Delete, and validation
error cases).

## 14. Screenshots
Place screenshots in the `screenshots/` folder:
- Dashboard view
- Add Student form
- Edit Student form
- Search/filter in action
- Delete confirmation
- Postman requests

## 15. Future Enhancements
- Add authentication (admin login)
- Add pagination for large student lists
- Add CSV export/import
- Add sorting on table columns
- Add student photo upload
- Deploy backend and frontend to the cloud

## 16. GitHub
Repository: [GitHub Repository URL]

```
git clone [GitHub Repository URL]
```
