const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { query, testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://localhost:5174'],
    credentials: true
}));
app.use(express.json());

// ==================== HELPER FUNCTIONS ====================

// Generic CRUD operations
const createCrudRoutes = (tableName, idField = 'id') => {
    // GET all
    app.get(`/api/${tableName}`, async (req, res) => {
        try {
            const data = await query(`SELECT * FROM ${tableName}`);
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // GET by ID
    app.get(`/api/${tableName}/:id`, async (req, res) => {
        try {
            const data = await query(`SELECT * FROM ${tableName} WHERE ${idField} = ?`, [req.params.id]);
            if (data.length === 0) {
                return res.status(404).json({ success: false, message: 'Not found' });
            }
            res.json({ success: true, data: data[0] });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // POST create
    app.post(`/api/${tableName}`, async (req, res) => {
        try {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            const placeholders = fields.map(() => '?').join(', ');
            const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
            const result = await query(sql, values);
            res.json({ success: true, data: { id: result.insertId }, message: 'Created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // PUT update
    app.put(`/api/${tableName}/:id`, async (req, res) => {
        try {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            const setClause = fields.map(f => `${f} = ?`).join(', ');
            const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${idField} = ?`;
            await query(sql, [...values, req.params.id]);
            res.json({ success: true, message: 'Updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });

    // DELETE
    app.delete(`/api/${tableName}/:id`, async (req, res) => {
        try {
            await query(`DELETE FROM ${tableName} WHERE ${idField} = ?`, [req.params.id]);
            res.json({ success: true, message: 'Deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// ==================== CREATE CRUD ROUTES FOR ALL TABLES ====================

createCrudRoutes('home');
createCrudRoutes('driver');
createCrudRoutes('calendar');
createCrudRoutes('news');
createCrudRoutes('result');
createCrudRoutes('standing');
createCrudRoutes('heritage');
createCrudRoutes('history');
createCrudRoutes('partners');
createCrudRoutes('store');
createCrudRoutes('careers');
createCrudRoutes('racing');

// Alias routes for plural names
app.get('/api/drivers', async (req, res) => {
    try {
        const data = await query('SELECT * FROM driver');
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/results', async (req, res) => {
    try {
        const data = await query('SELECT * FROM result ORDER BY round_number');
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/standings', async (req, res) => {
    try {
        const data = await query('SELECT * FROM standing ORDER BY position_race');
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        await query('SELECT 1');
        res.json({
            success: true,
            message: 'Server is running',
            database: 'Connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server is running but database is disconnected',
            database: 'Disconnected',
            error: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, async () => {
    console.log('==========================================');
    console.log(`🏎️  Scuderia Ferrari Fans API Server`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log('==========================================');

    await testConnection();

    console.log('\n📋 CRUD endpoints available for all tables');
    console.log('   Tables: home, driver, calendar, news, result,');
    console.log('           standing, heritage, history, partners,');
    console.log('           store, careers, racing');
    console.log('==========================================');
});
