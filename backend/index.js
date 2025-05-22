import express from 'express';
const app = express();
import { generateFile } from './generateFile.js';
import { executeCpp } from './executeCpp.js';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/run', async (req, res) => {
    const {language='cpp', code} = req.body;
    
    if (code === undefined || !code) {
        return res.status(400).json({
            message: 'Code is required',
            status: 'error',
        });
    }

    try{
        const filePath = generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({
        filePath,
        output,
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