<template>
  <div class="cart-list">
    <cart-list-item
    v-for="(item,index) in cartList"
    :key="index"
    :itemInfo="item"  
    />
  
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style>

</style>