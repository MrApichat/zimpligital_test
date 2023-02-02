# Stock or Crypto Price API

### Prerequisites

What things I use to test and you need to run this service

* Node.js (14.18.1)
* Redis (3.2.100)

### Installing

``` bash

# installing node module
$ npm install

# run project
$ npm start
# or
$ npm test

```

### How to use

There are 2 APIs in this service

1. Get stock price by search query

  > **{url}/stock_price?search=TSLA**

* Query Params
  * search : field that you need to search for anything
  * exchange : the exchange symbol that company registered
 
Query | Require field | Type | Example
----- | ----- | ----- | ----- |
search | Yes | string | kasikorn, tesla |
exchange | No | string | SET, FRA |

* example
  * Search Tesla
 ``` json
 {
    "data": {
        "quoteType": "EQUITY",
        "exchange": "NMS",
        "shortName": "Tesla, Inc.",
        "longName": "Tesla, Inc.",
        "market": "us_market",
        "currency": "USD",
        "regularMarketChangePercent": 3.1910055,
        "regularMarketPrice": 187.1988,
        "regularMarketChange": 5.788803,
        "regularMarketDayRange": {
            "low": 182.61,
            "high": 196.75
        },
        "regularMarketVolume": 205962605,
        "fullExchangeName": "NasdaqGS",
        "regularMarketOpen": 187.325,
        "averageDailyVolume3Month": 144453940,
        "fiftyTwoWeekRange": {
            "low": 101.81,
            "high": 384.29
        },
        "trailingPE": 49.392826,
        "epsTrailingTwelveMonths": 3.79,
        "marketCap": 592315744256,
        "symbol": "TSLA"
    }
}
```
2. Get stock price by symbol
    this API will data when you already know company symbol.
    
    > **{url}/stock_price/{symbol}**
    
* Example
  * Get Tesla stock by send "TSLA"
  
``` json
 {
    "data": {
        "quoteType": "EQUITY",
        "exchange": "NMS",
        "shortName": "Tesla, Inc.",
        "longName": "Tesla, Inc.",
        "market": "us_market",
        "currency": "USD",
        "regularMarketChangePercent": 3.4783075,
        "regularMarketPrice": 187.72,
        "regularMarketChange": 6.3099976,
        "regularMarketDayRange": {
            "low": 182.61,
            "high": 196.75
        },
        "regularMarketVolume": 208408094,
        "fullExchangeName": "NasdaqGS",
        "regularMarketOpen": 187.325,
        "averageDailyVolume3Month": 144453940,
        "fiftyTwoWeekRange": {
            "low": 101.81,
            "high": 384.29
        },
        "trailingPE": 49.530342,
        "epsTrailingTwelveMonths": 3.79,
        "marketCap": 593964892160,
        "symbol": "TSLA"
    }
}
```
