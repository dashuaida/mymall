<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      scroll: null
    }
  },
  
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })

    // 监听滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('contentScroll',position)
    })
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
    
  },
  methods: {
    scrollTo(x,y, time=300) {
       this.scroll.scrollTo(x , y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
     
      this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh,500)
    }
  }
}
</script>

<style scoped>
  
</style>