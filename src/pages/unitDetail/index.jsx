import React from 'react';
import { connect } from 'react-redux'
import { fetchPublicProducts } from './action'
import { formatOrder, getMax } from '../../utils/help'
import styles from './index.less'

const STATE = {
  'CLOSED': 'close',
  'CONNECTED': 'connected',
  'CONNECTTING': 'connectting',
}
let isManualClose = false
class Unit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wsState: STATE.CLOSED,
      asks: [],
      bids: [],
      lastUpdate: 0,
    }
  }
  componentWillMount() {
    isManualClose = false
   this.handleConnect()
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    isManualClose = true
    this.handleClose()
  }

  handleConnect() {
    const { quote, base } = this.props.query
    const lowSymbol = (base + quote).toLowerCase()
    this.setState({ wsState: STATE.CONNECTTING})
    this.ws = new WebSocket(`wss://stream.binance.cloud:9443/ws/${lowSymbol}@depth20`)
    this.ws.onopen = () =>
    {
      // Web Socket 已连接上，使用 send() 方法发送数据
      this.onOpen()
    };
    this.ws.onmessage = evt => 
    {
      this.onMessage(evt)
    };  
    this.ws.onerror = evt => {
      this.onError(evt)
    }
    this.ws.onclose = () =>
    { 
      // 关闭 websocket
      this.onClose()
    };
  }

  handleClose() {
    if (this.ws) {
      this.ws.close()
    }
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  handleChangeState() {
    const { wsState } = this.state
    if (wsState === STATE.CONNECTED || wsState === STATE.CONNECTTING) {
      isManualClose = true
      this.handleClose()
    } else {
      isManualClose = false
      this.handleConnect()
    }
  }

  handleSendMessage() {
    if (this.ws) {
      this.ws.send("")
    }
  }

  onOpen() {
    this.setState({
      wsState: STATE.CONNECTED
    })
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  onMessage(evt) {
    const { asks, bids } = JSON.parse(evt.data)
    const formatAsks = asks.reverse().map(ask => formatOrder(ask))
    const formatBids = bids.map(bid => formatOrder(bid))
    const maxAsk = getMax(asks.map(ask => Number(ask[1])))
    const maxBid = getMax(bids.map(bid => Number(bid[1])))
    this.setState({
      asks: formatAsks,
      bids: formatBids,
      maxAsk,
      maxBid,
    })
  }

  onError(evt) {
    console.log("--error", evt)
  }

  onClose() {
    console.log("连接已关闭..."); 
    this.setState({
      wsState: STATE.CLOSED
    })
    if (!isManualClose) {
      // reconnect
      console.log("do reconnect")
      this.timer = setInterval(() => this.handleConnect(), 3000)
    }
  }

  render() {
    const { wsState, asks, bids } = this.state
    const { quote, base } = this.props.query
    return <div className={styles.container}>
      <div className={styles.tools}>
        <div className={styles.connectBtn} onClick={() => {
          this.handleChangeState()
        }}>
          {
            wsState === STATE.CLOSED ? '连接' : '断开'
          }
        </div>
        <div className={styles.connectBtn} onClick={() => this.handleSendMessage()}>异常断开</div>
      </div>
      <div className={styles.orderList}>
        <div className={styles.banner}>
          <div className={styles.numFirst}>价格({quote})</div>
          <div className={styles.numSecond}>金额({base})</div>
          <div className={styles.numThird}>成交金额({quote})</div>
        </div>
        <div className={styles.asks}>
          <div className={styles.list}>
          {
            asks.map((ask, index) => <div key={'ask' + index} className={`${styles.item} ${styles.ask}`}>
              <div className={styles.num + ' ' + styles.numFirst}>{ask[0]}</div>
              <div className={styles.num + ' ' + styles.numSecond}>{ask[1]}</div>
              <div className={styles.num + ' ' + styles.numThird}>{ask[2]}</div>
              <div className={styles.askBack} style={{width: `${(Number(ask[1]) / 400) * 100}%`}}></div>
            </div> )
          }
          </div>
        </div>
        <div className={styles.currentPrice}>
        </div>
        <div className={styles.bids}>
          <div className={styles.list}>
          {
            bids.map((bid, index) => <div key={'bid' + index} className={`${styles.item} ${styles.bid}`}>
              <div className={styles.num + ' ' + styles.numFirst}>{bid[0]}</div>
              <div className={styles.num + ' ' + styles.numSecond}>{bid[1]}</div>
              <div className={styles.num + ' ' + styles.numThird}>{bid[2]}</div>
              <div className={styles.bidBack} style={{width: `${(Number(bid[1]) / 400) * 100}%`}}></div>
            </div> )
          }
          </div>
        </div>
      </div>
    </div>
  }
}

function mapStoreToProps(state, props) {
  return {
    products: state.mainReducer.products,
    query: props.router.location.query,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPublicProducts() { return dispatch(fetchPublicProducts())},
  }
}

const unitDetail = connect(mapStoreToProps, mapDispatchToProps)(Unit)

export default unitDetail;