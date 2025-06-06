# Database Test Instructions

## How to Test Supabase Connection

### 1. **Run the SQL Setup Script**
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Copy the entire contents of `sql/complete-setup.sql`
5. Paste it into the SQL Editor
6. Click **Run** to execute the script

### 2. **Test the Connection in the App**
1. Open the app and navigate to the Home screen
2. You should see a "Database Status" section at the top
3. Click **"Test Supabase Connection"** button
4. The test will check:
   - ✅ Supabase connection
   - ✅ Database schema exists
   - ✅ Sample data is available

### 3. **Expected Results**

#### ✅ **Success Case:**
```
🚀 Starting Supabase database tests...
📡 Testing Supabase connection...
✅ Supabase connection successful
🗄️ Verifying database schema...
✅ Database schema verified
✅ Sample data found
🎉 All tests passed! Supabase is ready to use.
```

#### ⚠️ **Warning Case (Schema Missing):**
```
🚀 Starting Supabase database tests...
📡 Testing Supabase connection...
✅ Supabase connection successful
🗄️ Verifying database schema...
⚠️ Database schema verification failed
Tables may not exist yet. Please run the SQL setup script.
📄 Copy sql/setup.sql contents to Supabase SQL Editor
```

#### ❌ **Error Case (Connection Failed):**
```
🚀 Starting Supabase database tests...
📡 Testing Supabase connection...
❌ Connection test failed
Please check your Supabase configuration in .env.local
```

### 4. **Troubleshooting**

#### **Connection Failed:**
- Check your `.env.local` file has the correct Supabase URL and key
- Verify the Supabase project is active and not paused
- Check your internet connection

#### **Schema Missing:**
- Run the SQL setup script in Supabase dashboard
- Make sure all tables were created successfully
- Check for any SQL errors in the Supabase logs

#### **Sample Data Missing:**
- The SQL script should create sample categories and questions
- If missing, re-run the SQL script
- Check the `categories` and `questions` tables in Supabase

### 5. **Manual Verification**

You can also manually verify the setup in Supabase:

1. Go to **Table Editor** in Supabase dashboard
2. Check these tables exist:
   - `categories` (should have 6 sample categories)
   - `questions` (should have 10+ sample questions)
   - `quiz_sessions` (empty initially)
   - `quiz_attempts` (empty initially)

3. Go to **Authentication** > **Users** to see registered users

### 6. **Next Steps After Successful Test**

Once the database test passes:
1. Hide the database test section (click "Hide")
2. Try creating a user account
3. Test the quiz functionality
4. Check that data is being saved to Supabase

The database test component will help you quickly identify and resolve any Supabase configuration issues.