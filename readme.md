# Auth Demo Side Project

Simple demo website where I explore FastAPI, MongoDB, and GSAP
with a simple website that has basic auth functionality.

### Project Structure
* main.py - main app connecting all the apps
* apps dir - contains apps within the api
* models.py - contains models for the whole app
* utils.py - utility functions

### API Routes:
```
GET /api/models/user/{user_id} -- gets basic user info
GET /api/models/user -- gets a list of users
POST /api/models/user -- creates a user
DELETE /api/models/user -- deletes a user

POST /api/account/create -- creates an account/user model
DELETE /api/account/delete -- deletes an account/user model
POST /api/account/login -- creates JWT auth cookie for the user
GET /api/account/logout -- removes JWT auth cookie for the user
GET /api/account/refreshtoken -- refreshes JWT auth cookie for the user
```