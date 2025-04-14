const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// fake user
const user = {
  id: 1,
  email: 'test@example.com',
  password: bcrypt.hashSync('password123', 10), // hashé pour simuler le vrai stockage
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email !== user.email) {
    return res.status(401).json({ message: 'Utilisateur non trouvé' });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
