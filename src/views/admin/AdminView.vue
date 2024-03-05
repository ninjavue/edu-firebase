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
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getUser(id) {
      this.$store.dispatch("getByIdUser", id);
    },
  },

  // mounted() {
  //   if (this.$cookies.get("userId")) {
  //     this.getUser(this.$cookies.get("userId"));
  //   }
  //   if (this.user.role == 0) {
  //     console.log("user");
  //     this.$router.push("/home");
  //   }
  // },
  // beforeUnmount() {
  //   if (this.$cookies.get("userId")) {
  //     this.getUser(this.$cookies.get("userId"));
  //   }
  //   if (this.user.role == 0) {
  //     console.log("user");
  //     this.$router.push("/home");
  //   }
  // },
};
</script>
  
  <style lang="scss" scoped>
@import "../../styles/pages/admin/admin.scss";
</style>