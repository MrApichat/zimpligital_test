import express from "express";
import {
  GetStockPriceBySymbol,
  GetStockPriceBySearch,
} from "../controllers/index.js";

const router = express.Router();

router.get("/stock_price", GetStockPriceBySearch);
router.get("/stock_price/:quote", GetStockPriceBySymbol);

export default router;
