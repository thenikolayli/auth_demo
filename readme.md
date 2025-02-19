# Auth Demo Side Project

Simple demo website where I explore FastAPI, MongoDB, and GSAP
with a simple website that has basic auth functionality.

### Project Structure
```
backend
├─ app
│  ├─ app.py
│  └─ models.py
├─ main.py
└─ utils.py

### API Routes:
```
GET /api/models/user/{user_id} -- gets basic user info
GET /api/models/user -- gets a list of users
POST /api/models/user -- creates a user
DELETE /api/models/user -- deletes a user

POST /api/account/login -- creates JWT auth cookie for the user
DELETE /api/account/logout -- removes JWT auth cookie for the user
GET /api/account/refreshtoken -- refreshes JWT auth cookie for the user
POST /api/account/ -- creates an account/user model
DELETE /api/account/ -- deletes an account/user model
```