# Configuration & Customization Guide

## Add More Domains

Edit **Backend.js**, find `const domains`:

```javascript
const domains = [
    { id: 1, name: 'domain1.com', status: 'active' },
    { id: 2, name: 'domain2.com', status: 'active' },
    { id: 3, name: 'domain3.com', status: 'active' },
    { id: 4, name: 'support.com', status: 'active' }
];
```

Add new domains:
```javascript
const domains = [
    { id: 1, name: 'domain1.com', status: 'active' },
    { id: 2, name: 'domain2.com', status: 'active' },
    { id: 3, name: 'example.com', status: 'active' },
    { id: 4, name: 'premium.com', status: 'active' }
];
```

## Change Categories

Edit the `categories` array in **Backend.js**:

**Current:**
```javascript
const categories = ['Bug', 'Feature Request', 'Account Issue', 'Billing', 'General Inquiry'];
```

**E-commerce Example:**
```javascript
const categories = ['Payment Issue', 'Shipping', 'Returns', 'Product Quality', 'Account'];
```

## Change Priorities

Edit the `priorities` array:

**Current:**
```javascript
const priorities = ['Low', 'Medium', 'High', 'Critical'];
```

## Change Statuses

Edit the `statuses` array:

**Current:**
```javascript
const statuses = ['New', 'In Progress', 'Pending', 'Resolved', 'Closed'];
```

**Support Team Example:**
```javascript
const statuses = ['Backlog', 'Assigned', 'In Progress', 'Review', 'Done', 'Closed'];
```

## Change Triage Weights

Find `calculateTriageScore` function and modify:

```javascript
function calculateTriageScore(priority, category) {
    const priorityScore = priorities.indexOf(priority) + 1;
    const categoryWeight = { 
        'Bug': 2,                    // Change weights here
        'Billing': 1.5,
        'Account Issue': 1.5,
        'Feature Request': 0.5,
        'General Inquiry': 0.3
    };
    return priorityScore * (categoryWeight[category] || 1);
}
```

## Change Port

In **Backend.js**, change:
```javascript
const PORT = process.env.PORT || 3000;
```

To:
```javascript
const PORT = process.env.PORT || 8000;  // Now runs on port 8000
```

## Change Colors

Edit **public/index.html** CSS:

**Primary Color:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Priority Colors:**
```css
.ticket-priority.critical {
    background: #e74c3c;  /* Red */
}

.ticket-priority.high {
    background: #f39c12;  /* Orange */
}

.ticket-priority.medium {
    background: #f1c40f;  /* Yellow */
}

.ticket-priority.low {
    background: #95a5a6;  /* Gray */
}
```

## Add Custom Fields

In **Backend.js**, add field to new ticket:

```javascript
const newTicket = {
    id: ticketCounter++,
    domainId: parseInt(domainId),
    name,
    email,
    category,
    priority,
    message,
    status: 'New',
    assignedTo: req.body.assignedTo || null,  // NEW
    dueDate: req.body.dueDate || null,        // NEW
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};
```

## Database Integration

Replace in-memory storage with MongoDB:

```bash
npm install mongoose
```

Then update **Backend.js**:

```javascript
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    domainId: Number,
    name: String,
    email: String,
    category: String,
    priority: String,
    message: String,
    status: String,
    createdAt: Date,
    updatedAt: Date
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Connect
mongoose.connect('mongodb://localhost/triage');

// Replace: tickets.push(newTicket);
// With: await Ticket.create(newTicket);
```

## Quick Changes Checklist

- [ ] Add/remove domains
- [ ] Update categories
- [ ] Adjust priority weights
- [ ] Change colors and theme
- [ ] Update header/title text
- [ ] Change port if needed
- [ ] Add custom fields
- [ ] Integrate database

## After Changes

Always restart the server:
```bash
npm start
```

All changes take effect immediately!
