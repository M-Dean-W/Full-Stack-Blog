import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'blog_user',
    password: 'password123',
    database: 'fs_blog'
});

export default pool;