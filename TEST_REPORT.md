# Test Report – ConfectHub

## Test Environment
- **Backend:** Django 5.0, djangorestframework, corsheaders, de-couple  
- **Frontend:** React 18, React Testing Library 14  
- **Database:** SQLite (dev) 
- **Languages:** Python 3.11, Node.js 25.10  
- **OS:** Windows 11 (dev environment)

---

## Test Methodology
Followed the **Test-Driven Development (TDD)** cycle:
1. **Red** – Write failing tests first.  
2. **Green** – Implement code to make tests pass.  
3. **Refactor** – Clean up and optimize implementation while keeping tests green.  

This ensured that every feature is backed by automated tests.

---

## Test Execution
### Backend (Django)
```bash
python manage.py test
```

### Frontend (React)
```bash
npm i
npm run dev
```

---

## Test Results

### Test Output

### Backend Tests
```
PASS server/api/views.py/register.api.test.py
 ✓ Register is able to take in parameters for user
 ✓ Able to store details of the user in the database
 ✓ Created JWT tokens like access and refresh tokens
 ✓ Input is validated

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
```

```
PASS server/api/views.py/login.api.test.py
 ✓ Function successfully takes in data from end-point
 ✓ Gives success message

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/permissions.api.test.py
 ✓ Parameters are being considered based on the individual's role in the system
 ✓ The API endpoint previously are role-protected

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/sweets_list.api.test.py
 ✓ Sweets are created using the required parameters
 ✓ Input validation has been implemented

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/create_sweets.api.test.py
 ✓ Sweets are created using the required parameters
 ✓ Input validation has been implemented

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/sweets_list.api.test.py
 ✓ Function successfully shows all the sweets in the system

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
```

```
PASS server/api/views.py/sweets_search.api.test.py
 ✓ Search and filtering successfully implemented

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
```

```
PASS server/api/views.py/purchase_sweet.api.test.py
 ✓ Quantity decreases as the sweet is purchased
 ✓ Added input validation to make sure the respective sweet's quantity is decreased

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/update_sweet.api.test.py
 ✓ Details of the sweet are updated using the sweet's id
 ✓ Added input validation to make sure the respective sweet exist

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/delete_sweet.api.test.py
 ✓ Sweet is completely removed by the end-point
 ✓ Added input validation to make sure the respective sweet exist

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS server/api/views.py/restock_sweet.api.test.py
 ✓ Quantity is restocked for the sweet
 ✓ Made sure this can only be used by the admin

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

### Frontend Tests

```
PASS src/components/__tests__/Register.test.js
 ✓ The details on the frontend are successfully forwarded to the backend
 ✓ Input validation added in frontend

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

```
PASS src/components/__tests__/Login.test.js
 ✓ Logs in the user using username and password
 ✓ Input validation added in frontend
 ✓ Access and Refresh tokens created

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
```

```
PASS src/components/__tests__/UserDashboard.test.js
 ✓ Users should be able to view all sweets in the inventory
 ✓ Users should be able to search and filter sweets
 ✓ Users should be able to press the 'Purchase' button and buy sweets

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
```

```
PASS src/components/__tests__/AdminDashboard.test.js
 ✓ Admin should be able to view all sweets in the inventory
 ✓ Admin can create and update sweets using UI forms
 ✓ Admin can restock sweets from the frontend

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
```

```
PASS src/components/__tests__/PublicDashboard.test.js
 ✓ Guests can see the dashboard along with the sweets

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
```

---

## Coverage Report
```
Total Test Suites: 16 passed, 16 total
Total Tests:       33 passed, 33 total
Snapshots:         0 total
```

---

## Mapping of Commits to TDD Phases

| Commit    | Date       | Description | Phase |
|   Hash    |           |              |       |
|-----------|-----------|-------------|-------|
| `0bd768d` | 2025-09-18 | Added failing test for Registration | 🔴 Red |
| `f011cab` | 2025-09-18 | Implemented Registration to pass test | 🟢 Green |
| `dca4150` | 2025-09-19 | Refactor Regsiter api, added JWT Tokenisation... | ♻️ Refactor |
| `ce51656` | 2025-09-19 | Refactored Login API with input validases | ♻️ Refactor |
| `6aa91de` | 2025-09-19 | Added failing test case to POST Sweets API | 🔴 Red |
| `110c32b` | 2025-09-19 | Implemented Adding Sweet API for passing test case | 🟢 Green |
| `9c3bdb6` | 2025-09-19 | Created Protected Route for Add Sweet API with permissions | 🟢 Green |
| `3891804` | 2025-09-19 | Created failing test for Register frontend | 🔴 Red |
| `8a4fca2` | 2025-09-20 | Implemented Register frontend for passing test | 🟢 Green |
| `7595476` | 2025-09-20 | Refactored Register frontend API, added input validation and css | ♻️ Refactor |
| `e84cbe5` | 2025-09-20 | Added failing test cases for Dashboard API | 🔴 Red |
| `efc76c2` | 2025-09-20 | Added new test case to Dashboard with update to others | 🟢 Green |
| `21a8f78` | 2025-09-20 | Added failed test cases for Sweet List API | 🔴 Red |
| `17b199c` | 2025-09-20 | Added passing test case for Sweet List API | 🟢 Green |
| `98b01c5` | 2025-09-20 | Refactored Sweet List API with smooth flow for searching and filtering | ♻️ Refactor |
| `01c5e52` | 2025-09-20 | Integrated both post sweets and get sweets list in one view | ♻️ Refactor |
| `0dc8ba7` | 2025-09-20 | Added failed test cases for Sweet Search API | 🔴 Red |
| `0d7456c` | 2025-09-20 | Added Sweet Search API for passing test case | 🟢 Green |
| `447393f` | 2025-09-20 | Refactored Sweet Search API without user credentials ... | ♻️ Refactor |
| `7e432fa` | 2025-09-20 | Added failing testcase for Sweet Purchase API | 🔴 Red |
| `512b9b2` | 2025-09-20 | Implemented passing testcase for Sweet Purchase API | 🟢 Green |
| `b77e726` | 2025-09-20 | Refactored Sweet Purchase API with input validation and user... | ♻️ Refactor |
| `e0a66c8` | 2025-09-20 | Added failing test case to Login frontend | 🔴 Red |
| `78fb841` | 2025-09-20 | Implemented passing test case for Login frontend | 🟢 Green |
| `e99c74f` | 2025-09-20 | Refactored Login frontend with input validation | ♻️ Refactor |
| `e320077` | 2025-09-20 | Refactored Login with better UI/Ux experience | ♻️ Refactor |
| `8397b91` | 2025-09-20 | Implemented passing test case for User Dashboard APIs | 🟢 Green |
| `eb77ac5` | 2025-09-20 | Refactored Dashboard for better UI/UX experience | ♻️ Refactor |
| `f7da214` | 2025-09-20 | Added failing test case for Update Sweet Details | 🔴 Red |
| `9f5827d` | 2025-09-20 | Implemented passing test case for Update Sweet Details API | 🟢 Green |
| `c186286` | 2025-09-20 | Refactored Update Sweet Details by adding validation to sweet_id | ♻️ Refactor |
| `b6245be` | 2025-09-20 | Added fail test cases for Delete Sweet API | 🔴 Red |
| `91a3641` | 2025-09-20 | Implemented Passing test case for Delete Sweet API | 🟢 Green |
| `5e86d87` | 2025-09-20 | Integrated Delete Sweet API with Update Sweet Details API... | ♻️ Refactor |
| `19bdf5c` | 2025-09-20 | Added failing test cases for Sweet Restock | 🔴 Red |
| `0f28c93` | 2025-09-20 | Implemented passing test case for Sweet Restock API | 🟢 Green |
| `a216be8` | 2025-09-20 | Refactored Restock Sweet API with input validation and message content | ♻️ Refactor |
| `1447079` | 2025-09-20 | Added failed test cases for AdminDashBoard | 🔴 Red |
| `65cbc0f` | 2025-09-20 | Added passing test case for Admin DashBoard with JSON decoding... | 🟢 Green |
| `4ad5903` | 2025-09-20 | Refactored Admin Dashboard into different components to... | ♻️ Refactor |
| `2e09d12` | 2025-09-20 | Refactored Readme | ♻️ Refactor |
| `28e57a3` | 2025-09-20 | Updated Readme | ♻️ Refactor |
| `99c900c` | 2025-09-21 | Made some changes, with better exploring for the user and admin. | ♻️ Refactor |
| `fbd6f02` | 2025-09-22 | Updated test report and added failing test cases for...| 🔴 Red |
| `40f3762` | 2025-09-22 | Added passing test case for PubDashboard | 🟢 Green |
| `2d8771a` | 2025-09-22 | Refactored PubDashboard with better UI and footer | ♻️ Refactor |
| `6383deb` | 2025-09-22 | Refactored UserDashboard and AdminDashboard with better UI | ♻️ Refactor |
| `212a8c8` | 2025-09-22 | Refactored AdminDashboard with CreateSweet and UpdateSweet... | ♻️ Refactor |