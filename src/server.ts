import express from "express";
import router from "./router/router";

const app = express();

app.use(express.json());

app.use("/api/v1/users", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});
