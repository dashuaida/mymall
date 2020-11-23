import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    // 监听item图片加载完成
    const refresh =  debounce(this.$refs.fakerScroll.refresh,100)
    this.itemImageListener = () => {
      this.$refs.fakerScroll && refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageListener)
    
  }
}
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.fakerScroll.scrollTo(0,0,300)
    },
    listenBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    },
  }
}

