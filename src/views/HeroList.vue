<template>
  <div>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250"> </el-table-column>
      <el-table-column prop="type" label="英雄"> </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="height:3rem;width:3rem;" />
        </template>
      </el-table-column>
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
      items: []
    };
  },
  created() {
    this.foech();
  },
  methods: {
    async foech() {
      const result = await this.$http.get("rest/hero");
      this.items = result.data;
    },
    edit(_id) {
      this.$router.push(`/heros/edit/${_id}`);
    },
    async remove(row) {
      this.$confirm(`此操作将删除英雄"${row.type}", 是否继续?`, "提示").then(
        () => {
          const result = this.$http.delete(`rest/hero/${row._id}`);

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
  // watch: {
  //   items: {
  //     handler() {
  //       this.foech();
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // }
};
</script>

<style></style>
