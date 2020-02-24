<template>
  <div>
    <h1>{{ id === undefined ? "创建" : "修改" }}分类</h1>
    <el-form label-width="50px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select v-model="articles.categories" multiple>
          <el-option
            v-for="item in parentOpations"
            :key="item._id"
            :label="item.type"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="articles.type"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor
          v-model="articles.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-button type="primary" native-type="submit">{{
        id === undefined ? "创建" : "修改"
      }}</el-button>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      articles: {},
      parentOpations: []
    };
  },
  created() {
    this.foech();
    this.categoriesFoech();
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const  result = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", result.data.url);
      resetUploader();
    },
    foech() {
      if (this.id) {
        this.$http.get(`rest/article/${this.id}`).then(res => {
          this.articles = res.data;
        });
      }
    },
    async categoriesFoech() {
      const result = await this.$http.get("rest/category");
      this.parentOpations = result.data;
    },
    async save() {
      if (this.id) {
        const result = this.$http.post(
          `rest/article/${this.id}`,
          this.articles
        );
        if (result) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.$router.push("/arcitles/list");
        }
      } else {
        const result = await this.$http.post("rest/article", this.articles);
        if (result.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/arcitles/list");
        }
      }
    }
  }
};
</script>

<style></style>
