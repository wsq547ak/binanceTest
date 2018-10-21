export function mapper(f) {
  return function(af) {
    return Array.prototype.map.call(af, f)
  }
}

export function formatOrder(order) {
  if (order && order.length >= 2) {
    const price = Number(order[0]).toFixed(6)
    const count = Number(order[1]).toFixed(3)
    const total = (price * count).toFixed(8)
    return [price, count, total]
  }
  return order
}

export function getMax(arr) {
  var num = arr[0];
  for(var i=0;i<arr.length;i++){
      if(num < arr[i]){
          num = arr[i]
      }
  }
  return num;
}

export function sortOutPublicProduct(products) {
  let sortedProduct = {}
  if (products) {
    products.map(product => {
      const quoteAsset = product.quoteAsset
      if (sortedProduct[quoteAsset]) {
        sortedProduct[quoteAsset].push(product)
      } else {
        sortedProduct[quoteAsset] = [product]
      }
      return product
    })
  }
  return sortedProduct
}