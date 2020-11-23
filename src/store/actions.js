import {ADD_COUNT, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
    
    // 2.判断oldProduct
    if(oldProduct) {
      context.commit(ADD_COUNT,oldProduct)
      resolve('商品+1')
    } else {
      payLoad.count = 1
     
      context.commit(ADD_TO_CART,payLoad)
      resolve('新商品添加成功')
    }
    })
    
  }
}