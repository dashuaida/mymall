<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>