<template>
  <el-aside>
    <AsideItem />
  </el-aside>

  <el-main>
    <router-view />
  </el-main>
</template>

<script>
import AsideItem from "../../components/lib/AsideItem.vue";
export default {
  components: {
    AsideItem,
  },
};
</script>

<style lang="scss">
@import "../../styles/pages/client/client.scss";
</style>