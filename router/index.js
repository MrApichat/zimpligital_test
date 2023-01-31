import express from "express";
import yahooFinance from "yahoo-finance2";
import {
  GetStockPriceBySymbol,
  GetStockPriceBySearch,
} from "../controller/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  //   const results = await yahooFinance.quote("KBANK.BK");
  const results = await await yahooFinance.search("binance");
  //   const { regularMarketPrice , currency } = results;
  //   console.log(regularMarketPrice, currency)
  //   console.log(results.quotes[0].symbol)
  console.log(results);
  const { regularMarketPrice } = results;
  res.status(200).send({ results });
});
router.get("/stock_price", GetStockPriceBySearch);
router.get("/stock_price/:quote", GetStockPriceBySymbol);

export default router;
