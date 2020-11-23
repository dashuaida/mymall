<template>
  <div id="home">
    <nav-bar class="nav-home"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"          
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isFixed"
      />
    <scroll class="content" ref="fakerScroll" :probeType="3" @contentScroll="contentScroll"
    :pullUpLoad="true"
    @pullingUp="pullingUp"
    >
      
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"          
      @tabClick="tabClick"
      ref="tabControl2"
     
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import {itemListenerMixin} from 'common/mixin'
import {getHomeMultidata, getHomeGoods} from 'network/home'


export default {
  // name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0,
     
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('sssss');
  },
  activated() {
    this.$refs.fakerScroll.scrollTo(0,this.saveY,0);
    this.$refs.fakerScroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.fakerScroll.getScrollY();
    // 离开home页面取消监听图片加载
    this.$bus.$off('itemImageLoad',this.itemImageListener)

  },
  created() {
    // 1. 请求轮播图和推荐数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
    
  },
 
  mounted() {
    
  },
  methods: {
    // 防抖函数
    debounce(func,delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout (timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    },
    // 事件监听相关的方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.fakerScroll.scrollTo(0,0)
    },
    contentScroll(position) {
      // console.log(position);
      // backTop是否显示
      this.isShowBackTop = -position.y > 1000
      // tabControl吸顶效果
      this.isFixed = -position.y > this.tabOffsetTop
    },
    pullingUp() {
      this.getHomeGoods(this.currentType);
      
    },

    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网路请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
      // console.log(res);
      this.goods[type].list.push(...res.data.list) 
      this.goods[type].page += 1

      this.$refs.fakerScroll && this.$refs.fakerScroll.finishPullUp()
      
    })
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .nav-home {
    background-color: var(--color-tint);
    color: #fff;
    
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px; 
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .content {
    height: calc(100% - 93px) ;
    overflow: hidden;
    margin-top: 44px;
  } */
</style>