<template>
  <div id="app">
    <h2>Clickable Dropdown</h2>
    <p>Click on the button to open the dropdown menu.</p>

    <div class="dropdown">
      <button @click="toggleDropdown" class="dropbtn">Dropdown</button>
      <div v-show="isDropdownOpen" class="dropdown-content">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
    };
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
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style>
</style>


