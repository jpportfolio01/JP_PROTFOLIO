# JUET Virtual Lab - SQL Practice Backend (Node.js)

Backend API service for **Dr. Jitendra Parmar's SQL Virtual Lab** platform at Jaypee University of Engineering and Technology (JUET), Guna, MP.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run Server
```bash
npm start
```
The server will run on `http://localhost:5000`.

---

## 📌 API Endpoints

### 1. Authentication (`@juetguna.in` Enforced)
* **`POST /api/auth/login`**
  * **Payload**:
    ```json
    {
      "name": "Rahul Sharma",
      "email": "211b001@juetguna.in",
      "roll": "211B001"
    }
    ```
  * **Validation**: Only emails ending with `@juetguna.in` are permitted.
  * **Response**: Returns student profile, total points, streak, and solved challenge IDs.

* **`GET /api/auth/profile`**
  * Headers: `x-user-email: 211b001@juetguna.in`
  * Returns user current score and solved challenges.

---

### 2. SQL Evaluation Engine
* **`POST /api/sql/evaluate`**
  * **Payload**:
    ```json
    {
      "challengeId": "q1",
      "query": "SELECT * FROM patients LIMIT 1;",
      "userEmail": "211b001@juetguna.in"
    }
    ```
  * **What it does**:
    1. Executes the student's query against the hospital database.
    2. Executes the reference solution query.
    3. Performs deep result comparison (column headers, row values, and row counts).
    4. If matching:
       - Awards points according to the question (+10, +20, +25, +30 pts).
       - Updates the student's score and solved count in the database.
       - Returns `correct: true`, row results, execution time in milliseconds.
    5. If mismatch:
       - Returns `correct: false` with detailed comparison (returned row count vs expected row count).
    6. If SQL syntax error:
       - Returns error message.

* **`GET /api/sql/challenges`**
  * Returns the full list of categorized SQL challenges (Basics, Aggregations, Joins) with difficulty and points.

* **`POST /api/sql/playground`**
  * Executes any custom read-only SQL query against the hospital tables (`patients`, `doctors`, `admissions`, `province_names`).

* **`GET /api/sql/schema`**
  * Returns table schemas, column lists, and data types.

---

### 3. Student Points & Progress (SQLite Database)
* **`GET /api/student/points`** (Requires JUET Auth)
  * Returns authenticated student profile, total points accumulated, solved challenge list, and streak directly from `student_points` table in `backend/data/juet_virtual_lab.sqlite`.

---

## 🛡️ Security Features
* **SQL Injection & Destruction Guard**: Blocks `DROP`, `DELETE`, `UPDATE`, `ALTER`, `INSERT`, `TRUNCATE` queries to keep the database read-only.
* **Institutional Verification**: Enforces `@juetguna.in` verification via `juetAuth` middleware.
README.md
