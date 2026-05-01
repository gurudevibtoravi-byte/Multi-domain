# Testing Guide

## Test via Browser Dashboard

1. Start server:
```bash
npm start
```

2. Open: http://localhost:3000

3. Create ticket:
   - Domain: domain1.com
   - Name: John Doe
   - Email: john@example.com
   - Category: Bug
   - Priority: High
   - Message: Test ticket

4. Click "Submit Ticket"

5. Expected: ✅ Ticket created successfully!

## Test via Browser Console (F12)

### Create Ticket
```javascript
fetch('http://localhost:3000/api/tickets', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    domainId: 1,
    name: 'Test',
    email: 'test@example.com',
    category: 'Bug',
    priority: 'High',
    message: 'Test message'
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

### Get All Tickets
```javascript
fetch('http://localhost:3000/api/tickets')
  .then(r => r.json())
  .then(data => console.log(data))
```

### Update Ticket
```javascript
fetch('http://localhost:3000/api/tickets/1', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({status: 'In Progress'})
})
.then(r => r.json())
.then(data => console.log(data))
```

### Delete Ticket
```javascript
fetch('http://localhost:3000/api/tickets/1', {
  method: 'DELETE'
})
.then(r => r.json())
.then(data => console.log(data))
```

### Get Stats
```javascript
fetch('http://localhost:3000/api/stats')
  .then(r => r.json())
  .then(data => console.log(data))
```

## Test via PowerShell

### Create Ticket
```powershell
$body = @{
    domainId = 1
    name = "John"
    email = "john@test.com"
    category = "Bug"
    priority = "High"
    message = "Test"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/tickets" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### Get Tickets
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/tickets" -Method GET
```

## Complete Test Workflow

1. ✅ Start server
2. ✅ Open dashboard
3. ✅ Create first ticket
4. ✅ Verify it appears in list
5. ✅ Create second ticket with different priority
6. ✅ Check statistics update
7. ✅ Click ticket to view details
8. ✅ Update status
9. ✅ Delete ticket
10. ✅ Verify count decreases

## Expected Results

All of these should work without errors:
- ✅ Server starts
- ✅ Dashboard loads
- ✅ Form submits
- ✅ Tickets appear instantly
- ✅ Statistics update
- ✅ Status updates work
- ✅ Delete works
- ✅ Auto-refresh works (every 5 seconds)

If all pass, system is working perfectly!

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Restart computer or change PORT |
| npm not found | Install Node.js |
| Tickets not showing | Wait 5 seconds for auto-refresh |
| API 400 error | Check all required fields filled |
| API 404 error | Ticket ID doesn't exist |
