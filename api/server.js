import express from "express";
import cors from "cors";
import routerRegister from "./routes/register.js";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routerRegister);

app.listen(8800, () => {
  console.log("Conectado na porta 8800! ");
});
