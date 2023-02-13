const express = require("express");
const passport = require("passport");

const db = require("./db/models");

const bookRoutes = require("./apis/routes/books.routes");
const authRoutes = require("./apis/routes/auth.routes");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/books", bookRoutes);
app.use("/", authRoutes);

const PORT = 8000;

app.use(errorHandler);

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(PORT, () => {
      console.log(`The application is running on localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
