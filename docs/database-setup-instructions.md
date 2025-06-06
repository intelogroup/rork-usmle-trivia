# 🚀 Database Setup Instructions

## Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project

## Step 2: Run the SQL Setup Script

1. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query" to create a new SQL script

2. **Copy the Setup Script**
   - Open the file `sql/complete-setup.sql` in your project
   - Copy ALL the contents (it's a long script)

3. **Paste and Execute**
   - Paste the entire script into the SQL Editor
   - Click the "Run" button (or press Ctrl/Cmd + Enter)
   - Wait for the script to complete (should take a few seconds)

## Step 3: Verify the Setup

After running the script, you should see:
- ✅ "Setup completed successfully!"
- ✅ "Categories created: 6"
- ✅ "Questions created: 10"

## Step 4: Test in Your App

1. Go back to your app
2. Click "Test Supabase Connection" again
3. You should now see all green checkmarks:
   - ✅ Supabase connection successful
   - ✅ Database schema verified
   - ✅ Sample data found
   - 🎉 All tests passed!

## What the Script Creates

### Tables:
- **categories** - Quiz categories (General Knowledge, Science, etc.)
- **questions** - Quiz questions with multiple choice options
- **quiz_sessions** - User quiz attempts and scores
- **quiz_attempts** - Individual question attempts for analytics

### Sample Data:
- 6 categories with descriptions
- 10 sample questions across different categories
- Proper relationships and indexes
- Row Level Security policies

### Security:
- RLS policies ensure users can only access their own data
- Public read access for categories and questions
- Secure user data isolation

## Troubleshooting

### If you get errors:
1. **Permission errors**: Make sure you're the owner of the Supabase project
2. **Syntax errors**: Make sure you copied the ENTIRE script
3. **Table exists errors**: The script uses `IF NOT EXISTS` so it's safe to re-run

### If tables aren't created:
1. Check the Supabase logs for any error messages
2. Try running the script in smaller chunks
3. Verify your project isn't paused or has billing issues

## Next Steps

Once the database test passes:
1. Hide the database test section (click "Hide")
2. Try selecting a category and starting a quiz
3. Test the full quiz flow
4. Check that your results are saved in Supabase

Your quiz app is now fully connected to Supabase! 🎉