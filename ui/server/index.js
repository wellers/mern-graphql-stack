const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");

const app = express();

app.use(history());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.listen(80, () => console.log(`🚀 Server ready`));