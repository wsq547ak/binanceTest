import React, { Component } from 'react'
import styles from './index.less'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props
    return (
      <div className={styles.item} key={product.symbol} onClick={() => this.handleClick(product)}>
        <div className={styles.name}>{product.baseAsset + '/' + product.quoteAsset}</div>
        <div className={styles.fullName}>{product.baseAssetName}</div>
        <div className={styles.price}>{`${product.close}/`}</div>
        <div className={styles.low}>{product.low}</div>
        <div className={styles.high}>{product.high}</div>
        <div className={styles.volumn}>{product.tradedMoney}</div>
      </div>
    )
  }

  handleClick(product) {
    if (this.props.handleClick && product) {
      this.props.handleClick(product)
    }
  }
}
