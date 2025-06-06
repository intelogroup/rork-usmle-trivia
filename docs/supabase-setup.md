# Supabase Setup Guide

## Prerequisites
1. Create a Supabase account at https://supabase.com
2. Create a new project

## Environment Variables
Add these to your `.env.local` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
```

## Database Setup

1. **Run the SQL Schema**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `sql/schema.sql`
   - Run the query to create all tables, indexes, and policies

2. **Enable Authentication**
   - Go to Authentication > Settings
   - Enable email authentication
   - Configure any additional auth providers if needed

3. **Configure Row Level Security**
   - The schema already includes RLS policies
   - Users can only access their own data
   - Admins have broader access to manage questions and view analytics

## Features Implemented

### Authentication
- ✅ User registration with email/password
- ✅ User login with JWT tokens
- ✅ Token refresh mechanism
- ✅ Protected routes with middleware
- ✅ Role-based access control (user/admin)

### Database Schema
- ✅ Users table with profiles
- ✅ Questions table with categories and difficulties
- ✅ Quiz sessions tracking
- ✅ Quiz attempts for detailed analytics
- ✅ Row Level Security policies
- ✅ Proper indexes for performance

### Security
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Row Level Security in Supabase
- ✅ Input validation with Zod
- ✅ CORS configuration

## Next Steps

1. **Update Environment Variables**
   - Add your Supabase URL and keys
   - Generate secure JWT secrets

2. **Test Authentication**
   - Try registering a new user
   - Test login/logout functionality
   - Verify token refresh works

3. **Migrate Existing Data**
   - Update quiz procedures to use Supabase
   - Update analytics to use real database
   - Update admin functions to use Supabase

4. **Production Considerations**
   - Set up proper environment variables
   - Configure Supabase for production
   - Set up monitoring and logging
   - Consider implementing rate limiting

## API Endpoints

All authentication endpoints are now connected to Supabase:

- `POST /api/trpc/auth.register` - Register new user
- `POST /api/trpc/auth.login` - Login user
- `POST /api/trpc/auth.refreshToken` - Refresh access token
- `GET /api/trpc/auth.me` - Get current user profile

The client-side auth store will automatically handle token management and API calls.