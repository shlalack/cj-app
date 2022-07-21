const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
