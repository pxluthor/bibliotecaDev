
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 3001;
const bibliotecaBase = 'E:\\BIBLIOTECA';

app.use(cors());
app.use(express.json());
app.use('/arquivos', express.static(bibliotecaBase));

// Configurar conexão com MySQL
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {                                               // Conectar ao MySQL
    if (err) throw err;                                             // Se houver erro, lança uma exceção
    console.log('Conectado ao MySQL');                              // Caso contrário, exibe a mensagem de conexão bem-sucedida
});

// Rota para buscar os livros
app.get('/livros', (req, res) => {                                  // Rota para buscar os livros
    const sql = 'SELECT id, titulo, area, caminho FROM livros';     // Query para buscar todos os livros
    db.query(sql, (err, result) => {                                // Executa a query
        if (err) throw err;                                         // Se houver erro, lança uma exceção
        res.send(result);
    });
});


app.get('/livros2', (req, res) => {
    const sql = 'SELECT id, titulo, area, caminho FROM livros';
    db.query(sql, (err, result) => {
        if (err) throw err;

        // Ajustar o caminho removendo a parte fixa da base
        const livrosCorrigidos = result.map(livro => ({  // Mapeia os livros retornados
            ...livro, // Copia todos os atributos do livro
            caminho: livro.caminho.replace(bibliotecaBase + '\\', '').replace(/\\/g, '/') // Ajusta o caminho do livro
        }));

        res.send(livrosCorrigidos);
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
