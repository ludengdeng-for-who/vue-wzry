<template>
  <div>
    <h1>{{ id === undefined ? "创建" : "修改" }}分类</h1>
    <el-form label-width="50px" @submit.native.prevent="save">
      <el-form-item label="上级">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parentOpations"
            :key="item._id"
            :label="item.type"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.type"></el-input>
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
      model: {},
      parentOpations: []
    };
  },
  created() {
    this.foech();
    this.parentFoech();
  },
  methods: {
    foech() {
      if (this.id) {
        this.$http.get(`rest/category/${this.id}`).then(res => {
          this.model = res.data;
        });
      }
    },
    async parentFoech() {
      const result = await this.$http.get("rest/category");
      this.parentOpations = result.data;
    },
    async save() {
      if (this.id) {
        const result = this.$http.post(`rest/category/${this.id}`, this.model);
        if (result) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.$router.push("/categories/list");
        }
      } else {
        const result = await this.$http.post("rest/category", this.model);
        if (result.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/categories/list");
        }
      }
    }
  }
};
</script>

<style></style>
