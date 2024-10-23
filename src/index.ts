import express from "express";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.query);
  const message = `Server is ongoing on ${PORT} with ${process.env.PROJECT_KEY}`;
  res.status(200).send(message);
});

app.post("/", (req, res) => {
  console.log(req.body);
  const message = `Server is ongoing on ${PORT}`;
  res.status(200).send(message);
});

app.listen(PORT, () => {
  console.log("Example is listening on " + PORT);
});
