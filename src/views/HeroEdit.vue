<template>
  <div>
    <h1>{{ id === undefined ? "创建" : "修改" }}英雄</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-tabs value="first" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="名称">
            <el-input v-model="item.type"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="item.categories" multiple>
              <el-option
                v-for="item in category"
                :key="item._id"
                :label="item.type"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="9"
              show-score
              style="margin-top:.6rem;"
              v-model="item.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              :max="9"
              show-score
              style="margin-top:.6rem;"
              v-model="item.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="9"
              show-score
              style="margin-top:.6rem;"
              v-model="item.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="9"
              show-score
              style="margin-top:.6rem;"
              v-model="item.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="item.items1" multiple style="margin-top:1rem;">
              <el-option
                v-for="item in pops"
                :key="item._id"
                :label="item.type"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="item.items2" multiple style="margin-top:1rem;">
              <el-option
                v-for="item in pops"
                :key="item._id"
                :label="item.type"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="item.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="item.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="item.teamTips"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)"
              :headers="getToken()"
            >
              <img v-if="item.avatar" :src="item.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :show-file-list="false"
              :on-success="res => $set(item, 'banner', res.url)"
              :headers="getToken()"
            >
              <img v-if="item.avatar" :src="item.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="second" label="技能">
          <el-button type="text" @click="item.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(skill, i) in item.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :show-file-list="false"
                  :on-success="res => $set(skill, 'icon', res.url)"
                  :header="getToken()"
                >
                  <img v-if="skill.icon" :src="skill.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input type="input" v-model="skill.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="input" v-model="skill.cost"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="skill.tips"></el-input>
              </el-form-item>
              <el-button type="danger" @click="clickDelete(i)">删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="third" label="搭档">
          <el-button type="text" @click="item.parents.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(parent, i) in item.parents" :key="i">
              <el-form-item label="搭档">
                <el-select filterable v-model="parent.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.type"
                    :value="hero._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="parent.description"></el-input>
              </el-form-item>
              <el-button type="danger" @click="clickDelete(i)">删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
      item: {
        scores: {
          difficult: 0
        },
        skills: [
          // description,
          // cost,
          // delay
        ],
        parents:[]
      },
      category: [],
      pops: [],
      heroes:[]
    };
  },
  created() {
    this.foech();
    this.foechCatecory();
    this.foechPops();
    this.foechHeroes();
  },
  methods: {
    clickDelete(index) {
      this.item.skills.splice(index, 1);
    },
    foechPops() {
      this.$http.get(`rest/item`).then(res => {
        this.pops = res.data;
      });
    },
    foechHeroes(){
      this.$http.get(`rest/hero`).then(res => {
        this.heroes = res.data;
      });
    },
    foechCatecory() {
      this.$http.get(`rest/category`).then(res => {
        this.category = res.data;
      });
    },
    foech() {
      if (this.id) {
        this.$http.get(`rest/hero/${this.id}`).then(res => {
          this.item = Object.assign({}, this.item, res.data);
        });
      }
    },
    async save() {
      if (this.id) {
        const result = this.$http.post(`rest/hero/${this.id}`, this.item);
        if (result) {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.$router.push("/heros/list");
        }
      } else {
        const result = await this.$http.post("rest/hero", this.item);
        if (result.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/heros/list");
        }
      }
    }
  }
};
</script>

<style>
.avatar {
  min-width: 80px;
}
</style>
