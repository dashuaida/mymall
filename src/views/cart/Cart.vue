<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{faker}})</div>
    </nav-bar>
    <scroll class="contents" ref="scroll">
      <cart-list/>

    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['cartLength']),
    ...mapGetters({
      faker: 'cartLength'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
   
  }
  .nav-bar {
    color: #fff;
    font-size: 18px;
     background-color: var(--color-tint);
  }
  .contents {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>