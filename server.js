import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

if(process.env.NODE_ENV === 'production'){
    // only executes in heroku
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

const PORT = process.env.PORT || 8000 ;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = process.env.MY_MONGO_URI ||  `mongodb+srv://${username}:${password}@blog-app.y7pzgvx.mongodb.net/?retryWrites=true&w=majority`;


Connection(URL);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));