import express from "express";
import formRoutes from "./routes/formRoutes";

const app = express();
const port = 3000;

app.use(formRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
