## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile (protected)
- PUT /api/auth/profile - Update user profile (protected)
- PATCH /api/auth/change-password - Change password of user (protected)
- POST /api/auth/forgot-password - Send a token to reset password (protected)
- PATCH /api/auth/reset-password/:token - Reset password of user (protected)
- PATCH /api/auth/profile-picture - Upload a profile picture (protected)


### Trips
- POST /api/trips - Create new trip
- GET /api/trips - Get all user trips
- GET /api/trips/upcoming - Get upcoming trips
- GET /api/trips/stats - Get trip statistics
- GET /api/trips/:id - Get specific trip
- PUT /api/trips/:id - Update trip
- DELETE /api/trips/:id - Delete trip