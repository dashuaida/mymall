import {ADD_COUNT, ADD_TO_CART} from './mutation-types'

export default {
  [ADD_COUNT](state,payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state,payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  }
}