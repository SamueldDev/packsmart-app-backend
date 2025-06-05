## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile (protected)
- PUT /api/auth/profile - Update user profile (protected)


### Trips
- POST /api/trips - Create new trip
- GET /api/trips - Get all user trips
- GET /api/trips/upcoming - Get upcoming trips
- GET /api/trips/stats - Get trip statistics
- GET /api/trips/:id - Get specific trip
- PUT /api/trips/:id - Update trip
- DELETE /api/trips/:id - Delete trip