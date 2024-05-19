const express = require('express');
const cors = require('cors');  
const { sql, connectDB } = require('./db');
const app = express();
const port = 3001;

app.use(cors());  
app.use(express.json());

connectDB();

// Criar uma nova tarefa
app.post('/tarefas', async (req, res) => {
    const { titulo, descricao } = req.body;
    try {
        const result = await sql.query`INSERT INTO Tarefas (titulo, descricao) VALUES (${titulo}, ${descricao})`;
        res.status(201).json({ id: result.recordset[0].id, titulo, descricao });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
});

// Listar todas as tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Tarefas`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
});

// Obter uma tarefa pelo ID
app.get('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql.query`SELECT * FROM Tarefas WHERE id = ${id}`;
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter tarefa' });
    }
});

// Atualizar uma tarefa pelo ID
app.put('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    try {
        const result = await sql.query`UPDATE Tarefas SET titulo = ${titulo}, descricao = ${descricao} WHERE id = ${id}`;
        res.json({ message: 'Tarefa atualizada' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});

// Deletar uma tarefa pelo ID
app.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM Tarefas WHERE id = ${id}`;
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
