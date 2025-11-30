const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load JSON DB
function loadDB() {
    const data = fs.readFileSync("./backend/database.db", "utf8");
    return JSON.parse(data);
}

// Analytics route
app.get("/api/analytics", (req, res) => {
    const db = loadDB();

    const result = db.sessions.map((s, index) => ({
        id: index + 1,
        taskName: s.taskName,
        duration: s.duration,
        breaks: s.breaks,
        endTime: s.endTime
    }));

    res.json(result);
});

app.listen(3000, () => console.log("JSON Backend running on 3000"));
