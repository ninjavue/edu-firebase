<template>
  <LoadingItem v-if="isLoading" />
  <el-container v-show="!isLoading">
    <el-header>
      <HeaderItem />
    </el-header>
    <el-container>
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
import HeaderItem from "./components/lib/HeaderItem.vue";
import LoadingItem from "./components/lib/LoadingItem.vue";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    HeaderItem,
    LoadingItem,
  },
  methods: {
    getUser(id) {
      this.$store.dispatch("getByIdUser", id);
    },
    openFullScreen() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
  mounted() {
    if (this.$cookies.get("userId")) {
      this.getUser(this.$cookies.get("userId"));
    }
    this.openFullScreen();
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
