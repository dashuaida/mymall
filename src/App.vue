<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    
    <main-tab-bar></main-tab-bar>
    
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'

export default {
  
  components: {
   MainTabBar,
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
