<template>
  <h1 class="user-title">Barcha Foydalanuvchilar</h1>
  <table>
    <thead>
      <tr>
        <th v-for="(header, i) of headers" :key="i">
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, i) of users" :key="user.id">
        <td>{{ i + 1 }}.</td>
        <td>
          <img class="user-img" :src="user.photo" :alt="user.full_name" />
        </td>
        <td>{{ user.full_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role == 0 ? "User" : "Admin" }}</td>
        <td>
          <el-button type="danger"> Delete </el-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { name: "№" },
        { name: "Rasm" },
        { name: "F.I.O" },
        { name: "Email" },
        { name: "User/Admin" },
        { name: "Action" },
      ],
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
      // return this.$store.getters.users.slice(0, this.count);
    },
  },
  methods: {
    deleteUser(id) {
      if (id) {
        this.$store.dispatch("deleteUser", id);
        this.$message({
          message: `User muaffaqiyatli o'chirildi`,
          type: "success",
        });
      }
    },
    sortBy(field) {
      if (this.sortField === field) {
        this.reverse = !this.reverse;
      } else {
        this.sortField = field;
        this.reverse = false;
      }
      // Implement sorting logic
    },
    setCount(value) {
      this.count = value;
    },
  },

  mounted() {
    this.$store.dispatch("getUsers");
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/pages/admin/users.scss";
</style>