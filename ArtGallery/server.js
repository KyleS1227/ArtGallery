const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(
  session({
    secret: "demo-secret",
    resave: false,
    saveUninitialized: false,
  })
);

const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Missing fields" });

  const users = readUsers();
  if (users.find(u => u.username === username))
    return res.status(400).json({ message: "User exists" });

  const user = { id: Date.now().toString(), username, password };
  users.push(user);
  writeUsers(users);

  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ success: true });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = readUsers().find(
    u => u.username === username && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ success: true });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

app.get("/api/session", (req, res) => {
  if (req.session.userId) {
    res.json({
      loggedIn: true,
      username: req.session.username,
      userId: req.session.userId
    });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

