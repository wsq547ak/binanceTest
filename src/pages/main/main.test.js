import React from 'react'
import ProductItem from '../../components/productItem'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

const setup = () => {
  Enzyme.configure({ adapter: new Adapter() });
  const props = {
    handleClick: jest.fn(),
    product: {"symbol":"ETHSGD","quoteAssetName":"SGD","tradedMoney":357.0,"baseAssetUnit":"","baseAssetName":"ETH","baseAsset":"ETH","tickSize":"0.0000001","prevClose":140.0,"activeBuy":0.0,"high":"140.0000000","lastAggTradeId":-1,"low":"140.0000000","matchingUnitType":"STANDARD","close":"140.0000000","quoteAsset":"SGD","productType":null,"active":true,"minTrade":0.01000000,"activeSell":2.55,"withdrawFee":"10","volume":"2.5500000","decimalPlaces":8,"quoteAssetUnit":"","open":"140.0000000","status":"TRADING","minQty":1E-8},
  }

  const wrapper = Enzyme.shallow(<ProductItem {...props} />)
  return {
    props,
    wrapper
  }
}

describe('ProductItem', () => {
  const { wrapper, props } = setup();

  // 通过查找存在 Input,测试组件正常渲染
  it('ProductItem Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    expect(wrapper.find('div').exists());
  })
})