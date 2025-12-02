import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


let books = [
  { id: '1', title: 'El Quijote', author: 'Cervantes' },
  { id: '2', title: '1984', author: 'George Orwell' },
  { id: '3', title: 'Matar a un ruiseñor', author: 'Harper Lee' },
  { id: '4', title: 'Crimen y Castigo', author: 'Fiódor Dostoyevski' },
  { id: '5', title: 'La sombra del viento', author: 'Carlos Ruiz Zafón' }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Missing title or author' });
  }

  const newBook = {
    id: String(books.length + 1),
    title,
    author
  };

  books = books.concat(newBook);
  res.status(201).json(newBook);
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const exists = books.some(b => b.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books = books.filter(b => b.id !== id);
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
