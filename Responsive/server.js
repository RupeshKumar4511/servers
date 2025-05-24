const express = require('express');
const path = require('path');
const db = require('./scripts/db');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname,'scripts')));
app.use(express.static(path.join(__dirname,'images')));

app.get('/',(req,res) =>{
res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/About.html',(req,res) =>{
res.sendFile(path.join(__dirname,'About.html'));
})

app.get('/Service.html',(req,res)=>{
res.sendFile(path.join(__dirname,'Service.html'));
})

app.get('/index.html',(req,res)=>{
res.sendFile(path.join(__dirname,'index.html'));
})
app.post('/contact', async (req, res) => {
    const { name, email,phoneNo } = req.body;
    try {
      const [result] = await db.query('INSERT INTO users (name, email,phoneNo) VALUES (?, ?, ?)', [name, email,phoneNo]);
      res.json({ id: result.insertId, name, email,phoneNo });
    } catch (err) {
      res.status(500).json({ error: 'Insert failed' });
    }
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
