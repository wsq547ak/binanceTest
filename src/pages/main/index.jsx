import React from 'react';
import { connect } from 'react-redux'
import { fetchPublicProducts } from './action'
import { sortOutPublicProduct } from '../../utils/help'

import ProductItem from '../../components/productItem'

import styles from './main.less'

const TABS = [
  'BNB',
  'BTC',
  'ETH',
  'USDT',
]
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelect: TABS[0],
      navTop: false,
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.fetchPublicProducts()
    if(this.tab){
      window.offsetTop = this.tab.getBoundingClientRect().top;
      window.addEventListener('scroll', () => this.onScroll());
    }
  }

  onScroll(){
    let sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if(sTop >= window.offsetTop){
       this.setState({
         navTop: true
       })
    }

    if(sTop < window.offsetTop){
       this.setState({
         navTop:false
       })
    }
  }

  onProductClick(product) {
    this.props.router.push(`/unitDetail?quote=${product.quoteAsset}&base=${product.baseAsset}`);
  }

  onSelectTab(select: string) {
    this.setState({
      currentSelect: select,
    })
  }

  renderTabs() {
    const { currentSelect } = this.state
    return TABS.map(tab => <div className={styles.tab + ' ' + (currentSelect === tab ? styles.select : '')} key={tab} onClick={() => this.onSelectTab(tab)}>{`${tab}市场`}</div>)
  }

  renderProducts() {
    const { currentSelect } = this.state
    const { products } = this.props
    return products[currentSelect] && products[currentSelect].map(product => <ProductItem product={product} handleClick={(p) => this.onProductClick(p)} />)
  }
  render() {
    const { navTop } = this.state
    return <div className={styles.container}>
      <div className={navTop ? styles.topTabs : styles.tabs} ref={r => this.tab = r}>
        {
          this.renderTabs()
        }
      </div>
      <div className={styles.productList}>
        {
          this.renderProducts()
        }
      </div>
    </div>
  }
}

function mapStoreToProps(state) {
  const sortedProducts = sortOutPublicProduct(state.mainReducer.products)
  console.log(sortedProducts)
  return {
    products: sortedProducts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPublicProducts() { return dispatch(fetchPublicProducts())},
  }
}

const mainScreen = connect(mapStoreToProps, mapDispatchToProps)(Main)

export default mainScreen;