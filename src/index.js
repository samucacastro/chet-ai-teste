import express from 'express';
import cors from 'cors';
import { router } from './routers.js';
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(router);
 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Conexão ativa na porta: "+port));