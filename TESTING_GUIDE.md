# Testing the Build Connection → Chat → Plan Date Flow

## Prerequisites
- Backend server running on http://127.0.0.1:3000
- Frontend server running on http://127.0.0.1:8080
- Demo data seeded (20 users created)

## Test Accounts

### Demo User Account
- **Email**: demo.user@example.com
- **Password**: demouser123
- **User ID**: 21

### Demo Admin Account
- **Email**: demo.admin@example.com
- **Password**: demoadmin123
- **User ID**: 22

### Other Demo Users (for testing connections)
All demo users have the same password: **password123**

Examples:
- lucas.rodriguez2@example.com (User ID: 3) - already connected to demo.user
- noah.martin0@example.com (User ID: 1)
- amelia.johnson1@example.com (User ID: 2)

## Step-by-Step Test Flow

### 1. Login and View Matches
1. Open browser: http://127.0.0.1:8080
2. Click "Sign In"
3. Login with: demo.user@example.com / demouser123
4. Click "Dashboard" → "Find Matches"
5. You should see 3 best matched users

### 2. Build Connection
1. On any match card, click **"Build Connection"** button
2. Alert: "Connection request sent successfully! 🎉"
3. Button changes to "Building..." then back
4. Status is now "pending"

### 3. Accept Connection (as the other user)
**Option A: Use incognito/another browser**
1. Open incognito window
2. Login with the matched user's email (e.g., noah.martin0@example.com / password123)
3. Go to Matches page
4. You'll see the pending connection with an **"Accept Connection"** button
5. Click "Accept Connection"
6. Status changes to "accepted"

**Option B: Already done for demo.user**
- User ID 3 (Lucas Rodriguez) has already accepted the connection
- Email: lucas.rodriguez2@example.com

### 4. View Chat and Plan Date Options
Back as demo.user:
1. Refresh the page or navigate
2. **Navigation bar** now shows:
   - Dashboard
   - Chat (new!)
   - Plan Date (new!)
3. On the Matches page, the connected user's card shows:
   - "Connection Built" button (disabled)
   - **"Open Chat"** button (active)

### 5. Send Messages
1. Click "Chat" in navigation OR "Open Chat" on match card
2. Type a message in the input box
3. Press Enter or click "Send"
4. Message appears in the chat (polls every 5 seconds for new messages)
5. Click "Plan Date" button in chat header

### 6. Plan a Date
1. Click "Plan Date" in navigation or from chat
2. Fill in the form:
   - **Date & Time**: Select a future date/time
   - **Location**: e.g., "The Garden Restaurant, Victoria Island, Lagos"
   - **Notes** (optional): "Looking forward to meeting you!"
3. Click "Propose Date"
4. Status shows "proposed"

### 7. Accept the Date (as the other user)
1. Login as the connected user (lucas.rodriguez2@example.com / password123)
2. Click "Plan Date" in navigation
3. You see the proposed date details
4. Click **"Accept"** button
5. Status changes to "accepted"

### 8. View Accepted Date
Back as demo.user:
1. Click "Plan Date"
2. See status: "accepted"
3. Date details are displayed
4. Option to "Cancel" if needed

## API Endpoints Verified Working ✅

- POST /api/user/21/connections → Send connection request
- GET /api/user/21/connections/status → Check connection status
- PUT /api/user/3/connections/accept → Accept connection
- POST /api/messages → Send message
- GET /api/user/3/messages → Get conversation
- POST /api/date-plan → Propose date
- GET /api/date-plan/current → View current date plan
- PUT /api/date-plan/1/accept → Accept date proposal

## Current Test Data

**Active Connection:**
- Demo User (ID: 21) ↔ Lucas Rodriguez (ID: 3)
- Status: accepted
- Created: 2025-11-17

**Messages Sent:**
- 1 message from Demo User to Lucas

**Date Plan:**
- Proposed by: Demo User
- Date: 2025-11-20 at 18:00
- Location: The Garden Restaurant, Victoria Island, Lagos
- Status: accepted

## Troubleshooting

### "Build Connection" button not working
- Check browser console for errors
- Verify you're logged in (check for auth_token in localStorage)
- Make sure backend server is running (http://127.0.0.1:3000/health should return {"status":"OK"})

### "Chat" or "Plan Date" links not appearing
- Connection must be **accepted** (not just pending)
- Refresh the page after connection is accepted
- Check Navigation component is fetching connection status

### Can't send messages
- Connection must be accepted
- Both users must have accepted connection
- Check browser console for auth errors

### Can't see date plan
- Connection must be accepted
- Only one active date plan allowed at a time
- Check if there's already a proposed/accepted plan

## Demo User Credentials Summary

| Email | Password | User ID | Name |
|-------|----------|---------|------|
| demo.user@example.com | demouser123 | 21 | Demo User |
| demo.admin@example.com | demoadmin123 | 22 | Demo Admin |
| lucas.rodriguez2@example.com | password123 | 3 | Lucas Rodriguez |
| noah.martin0@example.com | password123 | 1 | Noah Martin |
| amelia.johnson1@example.com | password123 | 2 | Amelia Johnson |

All other demo users follow the pattern:
- Email: `{firstname}.{lastname}{index}@example.com`
- Password: `password123`
- Index: 0-19
