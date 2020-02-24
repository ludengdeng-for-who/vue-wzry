<template>
  <div>
    <el-card header="请先登录" class="card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      model: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const result = await this.$http.post("login", this.model);
      if (result.status === 200) {
        localStorage.token = result.data;
        this.$message({
          type: "success",
          message: "登录成功"
        });
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.card {
  width: 30rem;
  height: 25rem;
  margin: 7rem auto;
}
</style>
