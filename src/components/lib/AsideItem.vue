<template>
  <div class="aside">
    <ul class="aside-menu">
      <li v-for="(item, i) of list" :key="i">
        <router-link :to="item.link">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </router-link>
      </li>
      <li>
        <button v-if="!user.id" @click="this.$router.push('/login')">
          <span>Dasturga kirish</span>
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </li>
      <li v-if="user.id">
        <button style="background-color: rgb(123, 8, 8)" @click="logOut">
          <span>Chiqish</span>
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          link: "/home",
          title: "Bosh Sahifa",
          icon: "fa-solid fa-home",
        },
        {
          link: "/courses",
          title: "Barcha kurslar",
          icon: "fa-solid fa-camera-retro",
        },
        {
          link: "/projects",
          title: "Loyihalar",
          icon: "fa-solid fa-folder",
        },
        {
          link: "/source-code",
          title: "Kod manbalari",
          icon: "fa-solid fa-code",
        },
      ],
      toggle: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    logOut() {
      let id = this.$cookies.get("userId");
      this.$store.dispatch("deleteUser", id);
      this.isDropdown = false;

      setTimeout(() => {
        this.$cookies.remove("userId");
        location.reload();
        window.location.href = "/";
      }, 1000);
    },
  },
  mounted() {
    if (this.$cookies.get("userId")) {
      this.$store.dispatch("getByIdUser", this.$cookies.get("userId"));
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/components/lib/aside.scss";
</style>