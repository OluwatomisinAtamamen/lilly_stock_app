const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks()
    res.send({ stockSymbols })
  } catch (error) {
    console.log('Unable to get stock symbols');
    res.status(500).send('Unable to get stock symbols');
  }
})

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  try {
    const data = await stocks.getStockPoints(symbol, new Date())
    res.send(data)
    console.log(`Got stock data for ${symbol}`);
  } catch (error) {
    console.log(`Unable to get stock data for ${symbol}`);
    res.status(500).send(`Unable to get stock data for ${symbol}`);
  }
})

app.listen(3000, () => console.log('Server is running!'))
