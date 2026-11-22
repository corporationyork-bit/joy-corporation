import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Memuat variabel dari file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup untuk __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route utama mengarah ke index.html di folder public
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 JOY CORPORATION Server berjalan!`);
    console.log(`🌐 Buka di browser: http://localhost:${PORT}`);
    console.log(`=========================================`);
});
