import yahooFinance from "yahoo-finance2";

//quote
export const GetStockPriceBySymbol = async (req, res) => {
  try {
    const { quote } = req.params;
    const result = await yahooFinance.quote(quote.toUpperCase());
    if (!result)
      return res
        .status(400)
        .send({ message: "Not found data from your symbol." });

    res.status(200).send({ data: ResponseData(result) });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//search
/*  get method
    query:
        q : quote require field when you need to search for anything
        exchange : the exchange symbol that company contain if don't have this, I will always get first symbol from search
*/

export const GetStockPriceBySearch = async (req, res) => {
  try {
    const { q, exchange } = req.query;
    if (!q)
      return res
        .status(400)
        .send({ message: `"q value in query are require"` });

    const search = await await yahooFinance.search(q);
    if (!search.quotes.length)
      return res.status(400).send({ message: `Not found company.` });

    let symbol = search.quotes[0].symbol;

    if (exchange) {
      //like SET
      search.quotes.forEach((v, i) => {
        if (v.exchange == exchange.toUpperCase()) {
          symbol = v.symbol;
        }
      });
    }

    const result = await yahooFinance.quote(symbol);
    if (!result)
      return res
        .status(400)
        .send({ message: "Not found data from your symbol." });

    res.status(200).send({ data: ResponseData(result) });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const ResponseData = (result) => {
  const {
    quoteType,
    exchange,
    shortName,
    longName,
    market,
    currency,
    regularMarketChangePercent,
    regularMarketPrice,
    regularMarketChange,
    regularMarketDayRange,
    regularMarketVolume,
    fullExchangeName,
    regularMarketOpen,
    averageDailyVolume3Month,
    fiftyTwoWeekRange,
    trailingPE,
    epsTrailingTwelveMonths,
    marketCap,
    symbol,
  } = result;

  return {
    quoteType,
    exchange,
    shortName,
    longName,
    market,
    currency,
    regularMarketChangePercent,
    regularMarketPrice,
    regularMarketChange,
    regularMarketDayRange,
    regularMarketVolume,
    fullExchangeName,
    regularMarketOpen,
    averageDailyVolume3Month,
    fiftyTwoWeekRange,
    trailingPE,
    epsTrailingTwelveMonths,
    marketCap,
    symbol,
  };
};
