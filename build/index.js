"use strict";

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _database = _interopRequireDefault(require("./configs/database"));

var _api = _interopRequireDefault(require("./routes/api"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport2 = _interopRequireDefault(require("./configs/passport"));

var _error = require("./helpers/error");

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); //Initializing


var app = (0, _express.default)(); //Connecting to DB

var db = (0, _database.default)(); //Middle-wares

app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use((0, _expressSession.default)({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

if (process.NODE_ENV == "production") {
  console.log("Production Mode");
  app.use((0, _compression.default)());
  app.use((0, _helmet.default)());
  app.use((0, _cors.default)());
} else {
  console.log("Development Mode");
} // Passport middleware


app.use(_passport.default.initialize());
app.use(_passport.default.session());
(0, _passport2.default)(_passport.default); //Routing

if (process.NODE_ENV == "production") {
  app.use(_express.default.static(_path.default.resolve(__dirname, "/../../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(_path.default.resolve(__dirname, "/../../client/build", "index.html"));
  });
} else {
  app.use(_express.default.static(_path.default.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(_path.default.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.use("/api", _api.default);
app.use(_error.errorHandler); //Activating

var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Express application is listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map