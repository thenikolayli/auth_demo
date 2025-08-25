# Auth Demo Side Project

Simple demo website where I experimented using FastAPI, MongoDB, and GSAP.

### How to Use: Dev
1. Clone this repository
2. Build the docker compose system, only the main profile
3. Run only the main profile

### How to Use: Prod
1. Copy docker-compose.yml and .env to the private server to the same directory
2. Copy nginx.cert.conf to nginx.conf and run docker compose, only the cert profile
3. After the certificate has been assigned, copy nginx.prod.conf to nginx.conf and run docker compose,
only the main profile
* Note: make sure to alter environment variables (dev = False) and nginx confs for your project
* If you're going to change any frontend code, make sure to delete the static_files volume,
so a new one with updated frontend code can be generated.

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
POST /api/models/user -- input: username, email, password as json, output: new user id
PATCH /api/models/user -- input: username, field, value, output: sets field of user to value
DELETE /api/models/user -- input: username query param, output: user deleted message

POST /api/account/login -- input: username, password as json, output: JWT auth cookie
DELETE /api/account/logout -- input: nothing, output: removes JWT auth cookie
GET /api/account/refreshtoken -- input: request with JWT auth cookie, output: sets a new auth cookie
POST /api/account/ -- input: username, email, and password as json, output: account created message
DELETE /api/account/ -- input: request with auth cookie, output: account deleted message
```

### Environment Variables
```
ADMIN_USERNAME=admin
DEVELOPMENT=False
CORS_ORIGINS=["http://localhost:3000"]
MONGO_URI_DEV=mongodb://localhost:27017
MONGO_URI_PROD=mongodb://db:27017

AUTH_ACCESS_SECRET=iwuvrehtnmuiodrsmhtv
AUTH_REFRESH_SECRET=oiwurhntvuiodrsmhtv
AUTH_COOKIE_ACCESS_AGE=300
AUTH_COOKIE_REFRESH_AGE=1468800
AUTH_COOKIE_NAME=auth_cookie
AUTH_COOKIE_DOMAIN=localhost
AUTH_COOKIE_SECURE=False
AUTH_COOKIE_HTTPONLY=True
AUTH_COOKIE_SAMESITE=Lax
```
