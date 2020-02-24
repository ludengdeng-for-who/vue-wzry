<template>
  <div>
    <h1>{{ id === undefined ? "创建" : "修改" }}管理员</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit">{{
        id === undefined ? "创建" : "修改"
      }}</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        userName:'',
        password:''
      }
    };
  },
  created() {
    this.foech();
  },
  methods: {
    foech() {
      if (this.id) {
        this.$http.get(`rest/admin/${this.id}`).then(res => {
          this.model = Object.assign({},this.model,res.data);
        });
      }
    },
    async save() {
      if (this.id) {
        const result = this.$http.post(`rest/admin/${this.id}`, this.model);
        if (result) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.$router.push("/admin_users/list");
        }
      } else {
        const result = await this.$http.post("rest/admin", this.model);
        if (result.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/admin_users/list");
        }
      }
    }
  }
};
</script>

<style></style>
