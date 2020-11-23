<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="fakerScroll" @contentScroll="contentScroll"
    :probeType="3">
      <detail-swiper :topImages="topImages" ></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :isShow="isShow"></toast>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'

import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'


import {mapActions} from 'vuex'
export default {
  name:'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
 
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    Toast
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeY: [],
      currentIndex: 0,
      message: '',
      isShow: true
    }
  },
  mixins: [backTopMixin],
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
     
      this.$refs.fakerScroll.refresh()
      this.themeY.push(0);
        this.themeY.push(this.$refs.param.$el.offsetTop)
        this.themeY.push(this.$refs.comment.$el.offsetTop)
        this.themeY.push(this.$refs.recommend.$el.offsetTop)
        this.themeY.push(Number.MAX_VALUE)
        console.log(this.themeY);   
    },
    titleClick(index) {
      // console.log(index);
        

      this.$refs.fakerScroll.scrollTo(0,-this.themeY[index],500)
        
    },
    contentScroll(position) {
      const positionY = -position.y

      // for(let i = 0; i < this.themeY.length; i++) {
      //  if (positionY > this.themeY[i] && positionY < this.themeY[i+1]) {
      //    console.log(i);
      //  }
      // }

      // for(let i = 0; i < this.themeY.length; i++) {
      //   if(this.currentIndex !== i && ((i < this.themeY.length-1 && positionY >= this.themeY[i] && positionY < this.themeY[i + 1]) || (i == this.themeY.length-1 && positionY >= this.themeY[i]))) {
      //     this.currentIndex = i
      //     console.log(i);
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      for(let i = 0; i < this.themeY.length-1; i++) {
        if(this.currentIndex !== i &&(positionY >= this.themeY[i] && positionY < this.themeY[i+1])) {
     
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.listenBackTop(position)
    },
    // 加入购物车
    addToCart() {
      // 1.获取商品需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里
      // this.$store.dispatch('addCart',product).then(res => console.log(res))

      // this.addCart(product).then((res) => {
      //   this.message = res
      //   this.isShow = true
      //   setTimeout(() => {
      //     this.isShow = false
      //     this.message = ''
      //   },1500)
      // })

      this.addCart(product).then((res) => {
        this.$toast.show(res,1500)
        
      })
    }
  },
  mounted() {
    
  },
  
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
  created() {
   // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求数据
    
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 2.获取商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(() => {
        
      })
      })

    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    
  }
  
  
  
  
  
  
  
  

}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-scroll {
    height: calc(100% - 44px - 58px);
  }
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>