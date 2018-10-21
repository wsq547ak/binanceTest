export function getTime() {
  return fetch('https://api.binance.com/api/v1/time',
  {
    method: 'GET',
    headers : {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(res => {
      return res;
    })
}

export function getProducts() {
  return fetch('https://www.binance.co/exchange/public/product',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}