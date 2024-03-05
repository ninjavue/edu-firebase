<template>
  <div class="home">
    <el-card class="mb-5">
      <div class="home-top">
        <h1>Kundalik</h1>
        <el-button type="primary" @click="isModal = true">Qo'shish</el-button>
      </div>
    </el-card>

    <el-card>
      <el-table :data="tasks" height="400" style="width: 100%">
        <el-table-column label="№" width="60">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="Rasm">
          <template #default="scope">
            <div class="preview" @click="viewImage(scope.row.image)">
              <span><i class="fa-solid fa-users-viewfinder"></i></span>
              <img :src="scope.row.image" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Date" width="180">
          <template #default="scope">
            {{ changeDate(scope.row.date) }}
          </template>
        </el-table-column>

        <el-table-column prop="title" label="Name" />
        <el-table-column prop="description" label="Description">
          <template #default="scope">
            {{ scope.row.description.substring(0, 25) }}
            <span style="cursor: pointer">...more</span>
          </template>
        </el-table-column>

        <el-table-column label="Ammallar" align="right">
          <template #default="scope">
            <el-button type="primary" @click="edit(scope.row.id)">
              <i class="fa-solid fa-pen-to-square"></i>
            </el-button>
            <el-button
              type="danger"
              @click="deleteData(scope.row.id, scope.row.image)"
            >
              <i class="fa-solid fa-trash"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <el-dialog v-model="isModal" width="540px">
    <el-form label-position="top" :model="task">
      <el-form-item label="Title *">
        <el-input v-model="task.title" />
      </el-form-item>
      <el-form-item label="Description *">
        <el-input v-model="task.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Rasm *">
        <input type="file" @change="uploadImage" />
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="add" v-if="!toggleBtn"
          >Qo'shish</el-button
        >
        <el-button type="primary" @click="save" v-if="toggleBtn"
          >Tahrirlash</el-button
        >
        <el-button @click="isModal = false">Bekor qilish</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog v-model="isImgModal" width="400px">
    <img :src="imageViewUrl" alt="preview" />
  </el-dialog>
</template>
  
  <script >
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export default {
  data() {
    return {
      task: {},
      isModal: false,
      toggleBtn: false,
      imageUrl: null,
      isImgModal: false,
      imageViewUrl: null,
    };
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
  },

  methods: {
    viewImage(img) {
      this.imageViewUrl = img;
      this.isImgModal = true;
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "images/" + uniquePrefix + "-" + file.name
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.task.image = downloadURL;
          });
        }
      );
    },
    add() {
      if (this.task.title && this.task.description && this.task.image) {
        this.task.date = new Date();
        this.$store.dispatch("postTask", this.task);
        this.isModal = false;
        this.$message({
          message: `${this.task.title} muaffaqiyatli qo'shildi`,
          type: "success",
        });
      }
    },
    edit(id) {
      this.$store.dispatch("getByIdTask", id).then((res) => {
        this.task = res;
        this.isModal = true;
        this.toggleBtn = true;
      });
    },
    save() {
      if (this.task.title && this.task.description) {
        this.$store.dispatch("editTask", this.task);
        this.isModal = false;
        this.$message({
          message: `${this.task.title} muaffaqiyatli yangilandi.`,
          type: "success",
        });
        this.toggleBtn = false;
        this.task = {};
      }
    },
    deleteData(id, img) {
      if (id) {
        this.$store.dispatch("deleteTask", id);
        this.$message({
          message: `Task muaffaqiyatli o'chirildi`,
          type: "success",
        });
        const storage = getStorage();

        const desertRef = ref(storage, img);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    },
    changeDate(date) {
      let timestamp = { ...date };
      const formattedDate = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
      ).toLocaleDateString();
      return formattedDate;
    },
  },
  mounted() {
    this.$store.dispatch("getTasks");
  },
};
</script>
  
  <style lang="scss">
.home {
  margin-top: 40px;
  padding-bottom: 200px;

  .el-card {
    min-width: 100%;
  }
  &-top {
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & form {
    max-width: 500px;
    min-width: 500px;
    & .field {
      width: 100%;
    }
  }
}

.preview {
  position: relative;
  min-width: 120px;
  min-height: 120px;
  width: 120px;
  height: 120px;
  & img {
    width: 120px;
    height: 120px;
  }
  & span {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    & i {
      color: aliceblue;
      font-size: 28px;
    }
  }
  &:hover {
    span {
      display: flex;
    }
  }
}
</style>