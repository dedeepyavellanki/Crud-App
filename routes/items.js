const express = require('express');
const db = require('../db');
const router = express.Router();

// list
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM items ORDER BY id DESC').all();
  res.json(rows);
});

// get one
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// create
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const info = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)').run(name, description || null);
  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(item);
});

// update
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const id = req.params.id;
  const existing = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?').run(name || existing.name, description || existing.description, id);
  const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  res.json(updated);
});

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const info = db.prepare('DELETE FROM items WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

module.exports = router;
