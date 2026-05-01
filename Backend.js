const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ==================== IN-MEMORY DATABASE ====================
let tickets = [];
let ticketCounter = 1;

const domains = [
    { id: 1, name: 'domain1.com', status: 'active' },
    { id: 2, name: 'domain2.com', status: 'active' },
    { id: 3, name: 'domain3.com', status: 'active' },
    { id: 4, name: 'support.com', status: 'active' }
];

const categories = ['Bug', 'Feature Request', 'Account Issue', 'Billing', 'General Inquiry'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];
const statuses = ['New', 'In Progress', 'Pending', 'Resolved', 'Closed'];

// ==================== HELPER FUNCTIONS ====================
function calculateTriageScore(priority, category) {
    const priorityScore = priorities.indexOf(priority) + 1;
    const categoryWeight = { 'Bug': 2, 'Billing': 1.5, 'Account Issue': 1.5, 'Feature Request': 0.5, 'General Inquiry': 0.3 };
    return priorityScore * (categoryWeight[category] || 1);
}

// ==================== API ROUTES ====================

// Get all domains
app.get('/api/domains', (req, res) => {
    res.json(domains);
});

// Get all tickets
app.get('/api/tickets', (req, res) => {
    const sorted = [...tickets].sort((a, b) => calculateTriageScore(b.priority, b.category) - calculateTriageScore(a.priority, a.category));
    res.json(sorted);
});

// Get tickets by domain
app.get('/api/tickets/domain/:domainId', (req, res) => {
    const domainId = parseInt(req.params.domainId);
    const domainTickets = tickets.filter(t => t.domainId === domainId);
    res.json(domainTickets);
});

// Get tickets by status
app.get('/api/tickets/status/:status', (req, res) => {
    const status = req.params.status;
    const statusTickets = tickets.filter(t => t.status === status);
    res.json(statusTickets);
});

// Create new ticket
app.post('/api/tickets', (req, res) => {
    const { domainId, name, email, category, priority, message } = req.body;

    if (!domainId || !name || !email || !category || !priority || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTicket = {
        id: ticketCounter++,
        domainId: parseInt(domainId),
        name,
        email,
        category,
        priority,
        message,
        status: 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    res.status(201).json(newTicket);
});

// Update ticket status
app.put('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const { status, priority, category } = req.body;

    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    if (status && statuses.includes(status)) {
        tickets[ticketIndex].status = status;
    }
    if (priority && priorities.includes(priority)) {
        tickets[ticketIndex].priority = priority;
    }
    if (category && categories.includes(category)) {
        tickets[ticketIndex].category = category;
    }

    tickets[ticketIndex].updatedAt = new Date().toISOString();
    res.json(tickets[ticketIndex]);
});

// Delete ticket
app.delete('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) {
        return res.status(404).json({ error: 'Ticket not found' });
    }

    const deletedTicket = tickets.splice(ticketIndex, 1);
    res.json({ message: 'Ticket deleted', ticket: deletedTicket[0] });
});

// Get triage statistics
app.get('/api/stats', (req, res) => {
    const stats = {
        totalTickets: tickets.length,
        byStatus: statuses.map(s => ({ status: s, count: tickets.filter(t => t.status === s).length })),
        byPriority: priorities.map(p => ({ priority: p, count: tickets.filter(t => t.priority === p).length })),
        byCategory: categories.map(c => ({ category: c, count: tickets.filter(t => t.category === c).length })),
        byDomain: domains.map(d => ({ domain: d.name, count: tickets.filter(t => t.domainId === d.id).length }))
    };
    res.json(stats);
});

// Get metadata (for frontend initialization)
app.get('/api/metadata', (req, res) => {
    res.json({
        categories,
        priorities,
        statuses,
        domains
    });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log(`✅ Multi-Domain Support Triage Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}`);
});