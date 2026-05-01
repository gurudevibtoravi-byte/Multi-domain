# Multi-Domain Support Triage System

A complete hackathon solution for managing and prioritizing support tickets across multiple domains.

## ✅ Features

- **Multi-Domain Support** - Handle tickets from multiple domains
- **Smart Triage** - Automatic prioritization based on category and priority
- **Real-time Updates** - Live ticket list with auto-refresh
- **Status Management** - Update ticket status in real-time
- **Statistics Dashboard** - View quick stats
- **Beautiful UI** - Modern responsive design

## 🚀 Quick Start

### Install & Run
```bash
cd "c:\Users\User\OneDrive\Desktop\HTML"
npm install
npm start
```

### Open Browser
```
http://localhost:3000
```

## 📂 Project Files

- **Backend.js** - Express server with API
- **public/index.html** - Frontend dashboard
- **package.json** - Dependencies

## 🔌 API Endpoints

- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket
- `GET /api/stats` - Get statistics
- `GET /api/metadata` - Get form options

## 📋 How to Use

1. **Create Ticket**: Fill form and submit
2. **View Tickets**: See real-time list on right
3. **Update Status**: Click ticket → Select status → Update
4. **Delete**: Click ticket → Delete button
5. **Filter**: Use tabs to filter by status

## 🎯 Domains Included
- domain1.com
- domain2.com
- domain3.com
- support.com

## 📚 Documentation

- **QUICKSTART.md** - 30-second setup
- **API_DOCS.md** - Complete API reference
- **CONFIG_GUIDE.md** - How to customize
- **TEST_GUIDE.md** - Testing guide
# Multi-Domain Support Triage System

A complete hackathon solution for managing and prioritizing support tickets across multiple domains.

## Features

✅ **Multi-Domain Support** - Handle tickets from multiple domains (domain1.com, domain2.com, etc.)
✅ **Smart Triage** - Automatic prioritization based on category and priority level
✅ **Real-time Updates** - Live ticket list with auto-refresh every 5 seconds
✅ **Status Management** - Update ticket status (New, In Progress, Pending, Resolved, Closed)
✅ **Statistics Dashboard** - View quick stats on tickets and priority levels
✅ **Beautiful UI** - Modern, responsive design with gradient theme
✅ **No Errors** - Automatic frontend-backend connection with error handling

## Project Structure

```
HTML/
├── Backend.js              # Node.js Express server
├── package.json            # Dependencies configuration
├── index.html              # Root level (for reference)
└── public/
    └── index.html          # Frontend dashboard (served by server)
```

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd "c:\Users\User\OneDrive\Desktop\HTML"
npm install
```

This will install:
- `express` - Web framework
- `cors` - Enable cross-origin requests

### Step 2: Run the Server
```bash
npm start
```

Expected output:
```
✅ Multi-Domain Support Triage Server running on http://localhost:3000
📊 Dashboard: http://localhost:3000
```

### Step 3: Open in Browser
Open your browser and go to: **http://localhost:3000**

## How to Use

### Creating a Ticket
1. Fill in the form on the left side with:
   - Domain (select from dropdown)
   - Your Name
   - Email Address
   - Category (Bug, Feature Request, Account Issue, etc.)
   - Priority (Low, Medium, High, Critical)
   - Detailed Message
2. Click "Submit Ticket"
3. Success message will appear

### Managing Tickets
1. View all tickets in the right panel
2. Click on any ticket to see details
3. Update ticket status by selecting a status and clicking "Update Status"
4. Delete tickets if needed
5. Use tabs to filter by status

### Dashboard Statistics
- **Total Tickets** - Count of all tickets
- **New Tickets** - Unstarted tickets
- **Critical** - High-priority tickets
- **Resolved** - Completed tickets

## API Endpoints

### GET Endpoints
- `GET /api/domains` - Get all domains
- `GET /api/tickets` - Get all tickets (sorted by priority)
- `GET /api/tickets/domain/:domainId` - Get tickets by domain
- `GET /api/tickets/status/:status` - Get tickets by status
- `GET /api/stats` - Get statistics
- `GET /api/metadata` - Get form metadata (categories, priorities, etc.)

### POST Endpoints
- `POST /api/tickets` - Create new ticket

### PUT Endpoints
- `PUT /api/tickets/:id` - Update ticket (status, priority, category)

### DELETE Endpoints
- `DELETE /api/tickets/:id` - Delete ticket

## Example API Request

### Create a Ticket
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "domainId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "category": "Bug",
    "priority": "High",
    "message": "Login page not loading"
  }'
```

### Update Ticket Status
```bash
curl -X PUT http://localhost:3000/api/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }'
```

## Code Quality

✅ **Clear & Organized** - Well-commented sections
✅ **Error Handling** - Try-catch blocks for all API calls
✅ **Responsive Design** - Works on desktop and mobile
✅ **Real-time Sync** - Auto-refresh every 5 seconds
✅ **No Dependencies Issues** - All required packages specified

## Supported Domains
- domain1.com
- domain2.com
- domain3.com
- support.com

(Add more in Backend.js `domains` array)

## Supported Categories
- Bug
- Feature Request
- Account Issue
- Billing
- General Inquiry

## Priority Levels
- Low
- Medium
- High
- Critical

## Ticket Statuses
- New
- In Progress
- Pending
- Resolved
- Closed

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000 and restart
npm start
```

### CORS Errors
The backend already has CORS enabled. Make sure you're accessing from `http://localhost:3000`

### Tickets Not Loading
1. Check backend console for errors
2. Verify API endpoints in browser console (F12)
3. Restart the server

## Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- User authentication
- Email notifications
- Ticket comments/history
- Advanced filtering and search
- Export reports

## License
MIT

## Support
For questions or issues, refer to the commented code sections in Backend.js and public/index.html
