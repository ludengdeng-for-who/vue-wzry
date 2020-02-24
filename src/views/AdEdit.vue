<template>
  <div>
    <h1>{{ id === undefined ? "创建" : "修改" }}广告位</h1>
    <el-form label-width="50px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.type"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button   @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item, i) in model.items" :key="i">
              <el-form-item label="URL">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:.5rem">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'image',res.url)"
                  :headers="getToken()"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-button type="danger" @click="clickDelete(i)">删除</el-button>
            </el-col>
          </el-row>
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
        items:[]
      },
      parentOpations: []
    };
  },
  created() {
    this.foech();
    this.parentFoech();
  },
  methods: {
    clickDelete(index){
      this.model.items.splice(index,1);
    },
    foech() {
      if (this.id) {
        this.$http.get(`rest/ad/${this.id}`).then(res => {
          this.model = res.data;
        });
      }
    },
    async parentFoech() {
      const result = await this.$http.get("rest/ad");
      this.parentOpations = result.data;
    },
    async save() {
      if (this.id) {
        const result = this.$http.post(`rest/ad/${this.id}`, this.model);
        if (result) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.$router.push("/ads/list");
        }
      } else {
        const result = await this.$http.post("rest/ad", this.model);
        if (result.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/ads/list");
        }
      }
    }
  }
};
</script>

<style></style>
