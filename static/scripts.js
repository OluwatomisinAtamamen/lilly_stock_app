function drawLine (ctx, start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (ctx, apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}
// object to store all global variables
const globalObj = {};

// function to view stocks
async function viewStocks(stocks) {
  globalObj.structure = {};

  for (let stockSymbol of stocks) {
    // store stock data in globalObj.structure
    globalObj.structure[stockSymbol] = await getStockData(stockSymbol);

    // creates a list element for each stock
    const symbol = document.createElement('li');
    symbol.textContent = stockSymbol;
    globalObj.stocksClass.append(symbol);

    // creates a canvas for each stock
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 600;
    globalObj.stocksClass.append(canvas)

    const ctx = canvas.getContext('2d')

    drawLine(ctx, [50, 50], [50, 550])
    drawTriangle(ctx, [35, 50], [65, 50], [50, 35])

    drawLine(ctx, [50, 550], [950, 550])
    drawTriangle(ctx, [950, 535], [950, 565], [965, 550])

  }
  console.log(globalObj.structure);

  // hides the spinner
  globalObj.spinner.classList.add('hide');
}

// function to get stock list
async function getStockList(){
  const response = await fetch('stocks');
  let stocks;
  if (response.ok) {
    stocks = await response.json();
  } else {
    stocks = [{ error: 'failed to load stocks :-(' }];
  }
  viewStocks(stocks.stockSymbols);
}

// function to get each stock data
async function getStockData(symbol){
  const response = await fetch('stocks/' + symbol);
  let data;
  if (response.ok) {
    data = await response.json();
  } else {
    data = [{ error: 'failed to load stock data :-(' }];
  }
  return data;
}

globalObj.spinner = document.querySelector('.spinner');
globalObj.stocksClass = document.querySelector('.stocks');

window.addEventListener('load', getStockList);
