# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. GET /tickets
Get all tickets (sorted by priority)

**Response:**
```json
[
  {
    "id": 1,
    "domainId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "category": "Bug",
    "priority": "High",
    "message": "Login issue",
    "status": "New",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 2. POST /tickets
Create new ticket

**Request:**
```json
{
  "domainId": 1,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "category": "Bug",
  "priority": "High",
  "message": "Database error"
}
```

**Response (201 Created):**
Same as ticket object above

### 3. PUT /tickets/:id
Update ticket status/priority/category

**Request:**
```json
{
  "status": "In Progress",
  "priority": "Critical"
}
```

**Response:**
Updated ticket object

### 4. DELETE /tickets/:id
Delete a ticket

**Response:**
```json
{
  "message": "Ticket deleted",
  "ticket": {...}
}
```

### 5. GET /stats
Get statistics

**Response:**
```json
{
  "totalTickets": 5,
  "byStatus": [
    {"status": "New", "count": 2},
    {"status": "In Progress", "count": 1},
    ...
  ],
  "byPriority": [
    {"priority": "Critical", "count": 1},
    ...
  ],
  "byDomain": [
    {"domain": "domain1.com", "count": 2},
    ...
  ]
}
```

### 6. GET /metadata
Get form options (categories, priorities, statuses, domains)

**Response:**
```json
{
  "categories": ["Bug", "Feature Request", "Account Issue", "Billing", "General Inquiry"],
  "priorities": ["Low", "Medium", "High", "Critical"],
  "statuses": ["New", "In Progress", "Pending", "Resolved", "Closed"],
  "domains": [
    {"id": 1, "name": "domain1.com", "status": "active"},
    ...
  ]
}
```

## cURL Examples

### Create Ticket
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{"domainId":1,"name":"Test","email":"test@example.com","category":"Bug","priority":"High","message":"Test"}'
```

### Get All Tickets
```bash
curl http://localhost:3000/api/tickets
```

### Update Ticket
```bash
curl -X PUT http://localhost:3000/api/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"In Progress"}'
```

### Delete Ticket
```bash
curl -X DELETE http://localhost:3000/api/tickets/1
```

### Get Stats
```bash
curl http://localhost:3000/api/stats
```

## Error Responses

**400 Bad Request** - Missing required fields
```json
{"error": "Missing required fields"}
```

**404 Not Found** - Ticket doesn't exist
```json
{"error": "Ticket not found"}
```

## Triage Algorithm

Tickets are automatically sorted by triage score:

```
Score = Priority Level × Category Weight

Priorities: Low(1), Medium(2), High(3), Critical(4)
Categories: 
  - Bug: 2.0
  - Account Issue: 1.5
  - Billing: 1.5
  - Feature Request: 0.5
  - General Inquiry: 0.3

Example:
- Critical Bug = 4 × 2.0 = 8.0 (highest)
- Low Inquiry = 1 × 0.3 = 0.3 (lowest)
```
# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. GET /domains
Get all supported domains

**Response:**
```json
[
  { "id": 1, "name": "domain1.com", "status": "active" },
  { "id": 2, "name": "domain2.com", "status": "active" },
  { "id": 3, "name": "domain3.com", "status": "active" },
  { "id": 4, "name": "support.com", "status": "active" }
]
```

---

### 2. GET /metadata
Get all form metadata (categories, priorities, statuses, domains)

**Response:**
```json
{
  "categories": ["Bug", "Feature Request", "Account Issue", "Billing", "General Inquiry"],
  "priorities": ["Low", "Medium", "High", "Critical"],
  "statuses": ["New", "In Progress", "Pending", "Resolved", "Closed"],
  "domains": [
    { "id": 1, "name": "domain1.com", "status": "active" },
    ...
  ]
}
```

---

### 3. GET /tickets
Get all tickets (sorted by triage priority)

**Response:**
```json
[
  {
    "id": 1,
    "domainId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "category": "Bug",
    "priority": "High",
    "message": "Login page not loading",
    "status": "New",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 4. GET /tickets/domain/:domainId
Get tickets for a specific domain

**Parameters:**
- `domainId` (integer) - Domain ID

**Example:**
```
GET /tickets/domain/1
```

**Response:**
```json
[
  { "id": 1, "domainId": 1, ... },
  { "id": 3, "domainId": 1, ... }
]
```

---

### 5. GET /tickets/status/:status
Get tickets by status

**Parameters:**
- `status` (string) - One of: New, In Progress, Pending, Resolved, Closed

**Example:**
```
GET /tickets/status/New
```

---

### 6. POST /tickets
Create a new ticket

**Request Body:**
```json
{
  "domainId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Bug",
  "priority": "High",
  "message": "Login page not loading"
}
```

**Required Fields:** All fields above are required

**Response (201 Created):**
```json
{
  "id": 1,
  "domainId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Bug",
  "priority": "High",
  "message": "Login page not loading",
  "status": "New",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Missing required fields"
}
```

---

### 7. PUT /tickets/:id
Update ticket (status, priority, category)

**Parameters:**
- `id` (integer) - Ticket ID

**Request Body (all optional):**
```json
{
  "status": "In Progress",
  "priority": "Critical",
  "category": "Bug"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
```

**Response:**
```json
{
  "id": 1,
  "domainId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Bug",
  "priority": "High",
  "message": "Login page not loading",
  "status": "In Progress",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Ticket not found"
}
```

---

### 8. DELETE /tickets/:id
Delete a ticket

**Parameters:**
- `id` (integer) - Ticket ID

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/tickets/1
```

**Response:**
```json
{
  "message": "Ticket deleted",
  "ticket": {
    "id": 1,
    "domainId": 1,
    ...
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Ticket not found"
}
```

---

### 9. GET /stats
Get triage statistics

**Response:**
```json
{
  "totalTickets": 5,
  "byStatus": [
    { "status": "New", "count": 2 },
    { "status": "In Progress", "count": 1 },
    { "status": "Pending", "count": 1 },
    { "status": "Resolved", "count": 1 },
    { "status": "Closed", "count": 0 }
  ],
  "byPriority": [
    { "priority": "Low", "count": 1 },
    { "priority": "Medium", "count": 2 },
    { "priority": "High", "count": 1 },
    { "priority": "Critical", "count": 1 }
  ],
  "byCategory": [
    { "category": "Bug", "count": 2 },
    { "category": "Feature Request", "count": 1 },
    { "category": "Account Issue", "count": 1 },
    { "category": "Billing", "count": 1 },
    { "category": "General Inquiry", "count": 0 }
  ],
  "byDomain": [
    { "domain": "domain1.com", "count": 2 },
    { "domain": "domain2.com", "count": 1 },
    { "domain": "domain3.com", "count": 1 },
    { "domain": "support.com", "count": 1 }
  ]
}
```

---

## Error Handling

All endpoints follow these conventions:

**Success Responses:**
- `200 OK` - For successful GET, PUT operations
- `201 Created` - For successful POST operations
- `204 No Content` - For successful DELETE operations

**Error Responses:**
- `400 Bad Request` - Missing or invalid fields
- `404 Not Found` - Resource doesn't exist

---

## Triage Algorithm

The system uses a triage score to sort tickets:

```
Score = Priority Level × Category Weight

Priority Levels:
- Critical = 4
- High = 3
- Medium = 2
- Low = 1

Category Weights:
- Bug = 2.0 (highest urgency)
- Account Issue = 1.5
- Billing = 1.5
- Feature Request = 0.5
- General Inquiry = 0.3 (lowest urgency)

Example:
- Critical Bug = 4 × 2.0 = 8.0 (highest priority)
- Low General Inquiry = 1 × 0.3 = 0.3 (lowest priority)
```

---

## Testing with cURL

### Create a ticket:
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "domainId": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "category": "Bug",
    "priority": "Critical",
    "message": "Database connection failing"
  }'
```

### Get all tickets:
```bash
curl http://localhost:3000/api/tickets
```

### Update ticket status:
```bash
curl -X PUT http://localhost:3000/api/tickets/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
```

### Delete a ticket:
```bash
curl -X DELETE http://localhost:3000/api/tickets/1
```

### Get statistics:
```bash
curl http://localhost:3000/api/stats
```

---

## CORS Policy

CORS is enabled for all origins. You can make requests from any frontend application.

**Headers included in all responses:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Rate Limiting

Not implemented in this version. For production, consider adding rate limiting middleware.

---

## Data Storage

- All data is stored in **memory** (JavaScript arrays)
- Data resets when the server restarts
- For persistence, integrate with MongoDB, PostgreSQL, or similar

---

## HTTPS Support

The server currently runs on HTTP. To enable HTTPS in production:

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, app).listen(443);
```
