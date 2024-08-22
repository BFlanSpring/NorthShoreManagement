// "use strict";

// const express = require("express");
// const cors = require("cors");
// const { NotFoundError } = require("./expressError");
// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
// const usersRoutes = require("./routes/users");
// const scrapeRoutes = require("./routes/scrape");
// const forexRoutes = require("./routes/forex");
// const morgan = require("morgan");


// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("tiny"));
// app.use(authenticateJWT);

// app.use("/auth", authRoutes);
// app.use("/users", usersRoutes);
// app.use("/scrape", scrapeRoutes);
// app.use("/forex", forexRoutes);


// /** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//   return next(new NotFoundError());
// });

// /** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {
//   if (process.env.NODE_ENV !== "test") console.error(err.stack);
//   const status = err.status || 500;
//   const message = err.message;

//   return res.status(status).json({
//     error: { message, status },
//   });
// });

// module.exports = app;



const express = require("express");
const cors = require("cors");
const path = require("path");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const scrapeRoutes = require("./routes/scrape");
const forexRoutes = require("./routes/forex"); // Add the new route
const morgan = require("morgan");

const fredRoutes = require('./routes/fredApi');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/scrape", scrapeRoutes);
app.use("/forex", forexRoutes);
app.use('/api', fredRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;

