<template>
  <div class="container">
    <div class="header">
      <button @click="toggle = true" class="header-btn">
        <i class="fa-solid fa-bars"></i>
      </button>
      <router-link to="/" class="header-logo">
        <img src="../../assets/sc.png" alt="" />
      </router-link>
      <div class="header-auth">
        <button v-if="!user.id" @click="this.$router.push('/login')">
          Kirish
        </button>
        <!-- start -->
        <div v-if="user.id">
          <div :class="`header-avatar ${isDropdownOpen ? 'active' : ''}`">
            <img
              class="dropbtn"
              @click="toggleDropdown"
              :src="user.photo"
              alt="user-photo"
            />
          </div>
          <div class="dropdownn" v-show="isDropdownOpen">
            <div class="dropdownn-top">
              <img :src="user.photo" alt="user-photo" />
              <div>
                <div>{{ user.full_name }}</div>
                <div>{{ user.email }}</div>
              </div>
            </div>
            <button @click="logOut">Tizimdan chiqish</button>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>

  <el-drawer :with-header="false" size="300px" v-model="toggle" direction="ltr">
    <div class="head mobile">
      <router-link to="/" class="header-logo mobile">
        <img src="../../assets/sc.png" alt="" />
      </router-link>
      <button @click="toggle = false">
        <i class="fa-solid fa-close"></i>
      </button>
    </div>
    <ul class="aside-menu mobile">
      <li v-for="(item, i) of list" :key="i">
        <router-link :to="item.link" @click="toggle = false">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </router-link>
      </li>
      <li>
        <button
          @click="
            {
              this.$router.push('/login'), (toggle = false);
            }
          "
          style="margin-bottom: 60px"
        >
          <span>Dasturga kirish</span>
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </li>
    </ul>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
      isDropdown: false,
      isDropdownOpen: false,
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
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown(event) {
      if (!event.target.matches(".dropbtn")) {
        this.isDropdownOpen = false;
      }
    },

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
    window.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style lang="scss">
@import "../../styles/components/lib/header.scss";
@import "../../styles/components/lib/aside.scss";
</style>