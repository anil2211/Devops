const app = require('./server');
const mongoose= require('mongoose');
mongoose.connect
    // ('mongodb//localhost:27017/todoapp')
    ("mongodb+srv://test:test@cluster0.m6uuvce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(resp => console.log('connected'))
    .catch(error => console.error('Error while connecting DB'))

app.listen(5000, () => console.log('server started successfully'))