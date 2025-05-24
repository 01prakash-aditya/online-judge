import express from 'express';
const app = express();
import cors from 'cors';
import { generateFile } from './generateFile.js';
import { executeCpp } from './executeCpp.js';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/run', async (req, res) => {
    const { language = 'cpp', code, input = '' } = req.body;
    
    if (code === undefined || !code) {
        return res.status(400).json({
            message: 'Code is required',
            status: 'error',
        });
    }

    try {
        const filePath = generateFile(language, code);
        const output = await executeCpp(filePath, input);
        res.json({
            filePath,
            output,
            input: input || 'No input provided',
            success: true
        });
    }
    catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!',
        status: 'success',
    });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});