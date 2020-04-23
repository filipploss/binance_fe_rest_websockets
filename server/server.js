const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());
app.get("/", async function (req, res) {
  fetch(
    "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products"
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
