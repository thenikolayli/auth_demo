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
GET /api/models/user/{username} -- input: username query param, output: user data of user with that id
GET /api/models/user -- input: skip and count query param, output: list of count users after skipping skip
POST /api/models/user -- input: username, email, and password as json, output: new user id
DELETE /api/models/user -- input: username query param, output: user deleted message

POST /api/account/login -- input: username, password as json, output: JWT auth cookie
DELETE /api/account/logout -- input: nothing, output: removes JWT auth cookie
GET /api/account/refreshtoken -- input: request with JWT auth cookie, output: sets a new auth cookie
POST /api/account/ -- input: username, email, and password as json, output: account created message
DELETE /api/account/ -- input: request with auth cookie, output: account deleted message
```