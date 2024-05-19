const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456789',
    server: 'DESKTOP-CCE5FV6',
    database: 'db_tarefas',
    options: {
        encrypt: false, 
        trustServerCertificate: true 
    }
};

async function connectDB() {
    try {
        await sql.connect(config);
        console.log('Conectado ao banco de dados SQL Server!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

module.exports = {
    sql,
    connectDB
};
