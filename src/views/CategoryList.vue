<template>
  <div>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250"> </el-table-column>
      <el-table-column prop="parent.type" label="上级"> </el-table-column>
      <el-table-column prop="type" label="分类"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="success"
            round
            size="small"
            @click="edit(scope.row._id)"
            >编辑</el-button
          >
          <el-button type="danger" round size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      count:0
    };
  },
  created() {
    this.foech();
  },
  methods: {
    async foech() {
      const result = await this.$http.get("rest/category");
      this.items = result.data;
    },
    edit(_id) {
      this.$router.push(`/categories/edit/${_id}`);
    },
    async remove(row) {
      this.$confirm(`此操作将删除分类"${row.type}", 是否继续?`, "提示").then(
        () => {
          const result = this.$http.delete(`rest/category/${row._id}`);
          if (result) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.foech();
          }
        }
      );
    }
  },
  watch: {
    // items: {
    //   handler() {
    //     this.foech();
    //     return
    //   },
    //   deep: true,
    //   immediate: true
    // }
  }
};
</script>

<style></style>
