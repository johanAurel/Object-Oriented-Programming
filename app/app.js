import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath1 = path.join(__dirname, './public');
const publicDirectoryPath2 = path.join(__dirname, '../model/public');


app.use(express.static(publicDirectoryPath1));
app.use(express.static(publicDirectoryPath2));
app.get('/1', (req, res) => {
    res.sendFile('index.html', { root: publicDirectoryPath1 });
});
app.get('/2', (req, res) => {
    res.sendFile('index.html', { root: publicDirectoryPath2 });
});
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

