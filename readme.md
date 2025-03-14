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
```
### API Routes
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

### Environment Variables
```
DB_URI=localhost://27017
CORS_ORIGINS=["http://localhost:3000"]
DEVELOPMENT=True

AUTH_ACCESS_SECRET=iwuvrehtnmuiodrsmhtv
AUTH_REFRESH_SECRET=oiwurhntvuiodrsmhtv
AUTH_COOKIE_ACCESS_AGE=300
AUTH_COOKIE_REFRESH_AGE=1468800
AUTH_COOKIE_NAME=auth_cookie
AUTH_COOKIE_DOMAIN=localhost
AUTH_COOKIE_SECURE=False
AUTH_COOKIE_HTTPONLY=True
AUTH_COOKIE_SAMESITE=Lax

ADMIN_USERNAME=nikolay
```
### Reminders
* If you're going to change any frontend code, make sure to delete the static_files volume,
so a new one with updated frontend code can be generated.