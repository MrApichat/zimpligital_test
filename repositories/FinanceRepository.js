import yahooFinance from "yahoo-finance2";

export const quoteFinance = async (quote) => {
  try {
    const data = await yahooFinance.quote(quote.toUpperCase());
    return data;
  } catch (err) {
    throw err;
  }
};

export const searchFinance = async (key) => {
  try {
    const search = await yahooFinance.search(key);

    if (!search.quotes.length) throw `Not found company.`;

    return search.quotes;
  } catch (err) {
    throw err;
  }
};

export const selectQuote = (exchange, quotes) => {
  let symbol
  if (exchange) {
    //like SET
    quotes.forEach((v, i) => {
      if (v.exchange == exchange.toUpperCase()) {
        symbol = v.symbol;
      }
    });
  } else {
    symbol = quotes[0].symbol;
  }
  if (!symbol) throw `Not found company.`;
  return symbol;
};
