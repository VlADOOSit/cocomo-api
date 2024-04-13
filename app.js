const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config.json');

const ErrorHandler = require('./Middlewares/errorHandler');

const AuthRouter = require('./Routes/auth-router');
const CalcModelRouter = require('./Routes/calc-model-router');

const PORT = process.env.PORT || config.server.port;
const HOST = config.server.host

const app = express();

app.use(cors({
    origin: ['http://192.168.20.251:3000', 'http://localhost:3000'],
    credentials:true,
    methods:["GET" , "POST" , "PUT", "PATCH", "DELETE"],
    optionSuccessStatus:200
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AuthRouter);
app.use('/api/calc', CalcModelRouter);

app.use(ErrorHandler);

app.listen(PORT, () => {console.log(`Server start on https://${HOST}:${PORT}`)});