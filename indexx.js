const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4 } = require("uuid");

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors());

let product = [];

app.get("/product", (req, res) => {});
