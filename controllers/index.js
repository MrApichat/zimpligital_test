import { ResponseData } from "../utilities/format.js";
import {
  GetCaching,
  SetCaching,
  quoteFinance,
  selectQuote,
  searchFinance,
  ConnectCaching,
  DisconnectCaching,
} from "../repositories/index.js";

//quote
export const GetStockPriceBySymbol = async (req, res) => {
  try {
    await ConnectCaching();
    const { quote } = req.params;
    let data = await GetCaching(quote);
    if (!data) {
      const result = await quoteFinance(quote);
      if (!result)
        return res
          .status(400)
          .send({ message: "Not found data from your symbol." });

      data = ResponseData(result);
      await SetCaching(quote, data);
    }

    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    DisconnectCaching();
  }
};

//search
/*  get method
    query:
        search : quote require field when you need to search for anything
        exchange : the exchange symbol that company registered if don't have this, I will always get first symbol from search
*/
export const GetStockPriceBySearch = async (req, res) => {
  try {
    await ConnectCaching();
    const { search, exchange } = req.query;
    if (!search)
      return res
        .status(400)
        .send({ message: `"search" value in query are require` });

    let qList = await GetCaching(search);
    if (!qList) {
      qList = await searchFinance(search);
      await SetCaching(search, qList);
    }
    const symbol = selectQuote(exchange, qList);
    let data = await GetCaching(symbol);
    if (!data) {
      const result = await quoteFinance(symbol);
      if (!result)
        return res
          .status(400)
          .send({ message: "Not found data from your symbol." });

      data = ResponseData(result);
      await SetCaching(symbol, data);
    }
    res.status(200).send({ data });
  } catch (err) {
    if (err == `Not found company.`) {
      return res.status(400).send({ message: err });
    }
    res.status(500).send({ message: err.message });
  } finally {
    DisconnectCaching();
  }
};
