<template>
  <div>
    <nav-bar >
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" >
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" :key="index" class="item-titles" @click="itemClick(index)" 
        :class="{current:currentIndex === index}">
          {{item}}
        </div>
      </div>
    
    
    </nav-bar> 
  </div>
</template>  

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0,
      
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .titles {
    display: flex;
  }
  .item-titles {
    flex:1;
    font-size: 14px;
  }
  .current {
    color: red;
  }

  .back {
    margin-top: 8px;
  }
</style>