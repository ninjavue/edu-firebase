<template>
  <span class="loading">
    <img src="../../assets/icons/spinner.svg" alt="" />
    <h1>{{ text }}...</h1>
  </span>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      text: null,
    };
  },
  methods: {
    openFullScreen() {
      this.text = "Ma'lumot qidirilmoqda";
      setTimeout(() => {
        this.text = "Qayta ishlanmoqda";
      }, 1000);
      setTimeout(() => {
        this.text = "Yuklanmoqda";
      }, 2000);
    },
  },
  mounted() {
    this.openFullScreen();
  },
};
</script>

  <style lang="scss">
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #020817;
  z-index: 999;
  & img {
    width: 100px;
    height: 100px;
  }
}
</style>