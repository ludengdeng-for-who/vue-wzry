<template>
  <div>
    <h1>{{ id === undefined ? "创建" : "修改" }}物品</h1>
    <el-form label-width="50px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="item.type"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :header="getToken()"
        >
          <img v-if="item.icon" :src="item.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      item: {}
    };
  },
  created() {
    this.foech();
    // this.parentFoech();
  },
  methods: {
    handleAvatarSuccess(res){
      console.log(res);
      
      this.$set(this.item,'icon',res.url)
    },
    foech() {
      if (this.id) {
        this.$http.get(`rest/item/${this.id}`).then(res => {
          this.item = res.data;
        });
      }
    },
    async save() {
      if (this.id) {
        const result = this.$http.post(`rest/item/${this.id}`, this.item);
        if (result) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.$router.push("/items/list");
        }
      } else {
        const result = await this.$http.post("rest/item", this.item);
        if (result.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/items/list");
        }
      }
    }
  }
};
</script>

<style>

</style>
