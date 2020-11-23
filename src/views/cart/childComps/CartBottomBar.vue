<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button class="button" 
      :isChecked="isSelectAll"
      @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price"> 
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      结算 ({{cartLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'
export default {
  components: {
    
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '¥ ' + this.$store.state.cartList.filter( item => item.checked).reduce((prev, item) => {
        return prev + item.price * item.count 
      },0).toFixed(2)
    },
    cartLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length > 0)
      // 1.使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // 2.使用find
      return !(this.$store.state.cartList.find(item => !item.checked))
      // 3.使用遍历
      // for(let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    },
    
  },
  methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        let flag = this.cartList.filter(item => item.checked).length === 0
        
        if(flag) {
          this.$toast.show('请选择购买的商品',1500)
        }
      }
    }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }
  .check-area {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 90px;
    
  }
  .button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 6px;
  }
  .price {
    /* margin-left: 30px; */
    flex: 1;
  }
  .calculate {
    width: 80px;
    text-align: center;
    background-color: var(--color-tint);
    color: white;
  }
</style>