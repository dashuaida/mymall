<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // isShow: {
    //   type: Boolean,
    //   default() {
    //     return false
    //   }
    // }
  },
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    show(message, duration){
      this.message = message
      this.isShow = true
      
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%,-50%);

    z-index: 999;

    color: #fff;
    background-color:rgba(0,0,0,.7);
  }
</style>