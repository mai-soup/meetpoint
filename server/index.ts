import express, { Express, Request, Response } from "express";
const port = process.env.PORT || 8888;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HEYO FROM EXPRESS");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
