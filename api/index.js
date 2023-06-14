import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongodb from "mongodb";

let api = express.Router();
let DATABASE_NAME = "cs193x-final-project";

const initApi = async (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);
  let MongoClient = mongodb.MongoClient;
  let conn = await MongoClient.connect("mongodb://127.0.0.1");
  let db = conn.db(DATABASE_NAME);
  app.db = db;
  app.incomplete = db.collection("incomplete");
  app.complete = db.collection("complete");
  console.log("Initialized database connection");
};

api.use(bodyParser.json());
api.use(cors());

// get all complete lessons
api.get("/complete", async (req, res) => {
  let complete = await req.app.complete.find({}).toArray();
  // retunrn lesson values as array
  complete = complete.map((lesson) => lesson.lesson);
  res.json(complete);
});

// add complete lesson
api.post("/complete", async (req, res) => {
  // if lesson already exists, do nothing
  if (await req.app.complete.findOne({ lesson: req.body.lesson })) {
    res.json({ message: "lesson already exists" });
  } else {
    await req.app.complete.insertOne(req.body);
    res.json({ message: "complete lesson added successfully" });
  }
});

// add incomplete lesson
api.post("/incomplete", async (req, res) => {
  if (await req.app.incomplete.findOne({ lesson: req.body.lesson })) {
    res.json({ message: "lesson already exists" });
  } else {
    await req.app.incomplete.insertOne(req.body);
    res.json({ message: "incomplete lesson added successfully" });
  }
});

// delete incomplete lesson
api.delete("/incomplete", async (req, res) => {
  await req.app.incomplete.deleteOne(req.body);
  res.json({ message: "incomplete lesson deleted successfully" });
});

// delete complete lesson
api.delete("/complete", async (req, res) => {
  await req.app.complete.deleteOne(req.body);
  res.json({ message: "complete lesson deleted successfully" });
});

/* Catch-all route to return a JSON error if endpoint not defined.
   Be sure to put all of your endpoints above this one, or they will not be called. */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
});

export default initApi;
