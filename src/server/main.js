import 'dotenv/config'
import pool from '../../db.js'
import express from "express";
import ViteExpress from "vite-express";
import routes from './routes.js'
// import github from "./githubapi.js"
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express();
const PORT = !process.env.PORT ? 3023 : process.env.PORT

app.use(express.static('public'))
app.use(express.static('/src/client/notes/public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


routes(app,pool)

// app.get("/hello", (req, res) => {
//   res.send("Hello Vite!");
// });
ViteExpress.listen(app, PORT||3000, () =>
  console.log(`Server is listening on port ${PORT}`),
);
