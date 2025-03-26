const express = require("express")
const userRouter = require('./src/routes/crypto')
const PORT = process.env.PORT || 3000
const app = express()
//Luon luon de tren dau middleware
//Theem de doc json

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/crypto', userRouter)

app.listen(3000)
