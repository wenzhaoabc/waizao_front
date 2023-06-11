<template>
  <div class="card">
    <div v-for="s in sites" :key="s.siteId">
      <h3>{{ s.title }}</h3>
      <div v-for="(d, index) in designs?.filter(d => d.siteId == s.siteId)" :key="`${d.userId}-${d.siteId}`">
        <el-row>
          <el-col :span="1">
            <el-avatar :src="users?.find(u => u.userId == d.userId)?.avatar"></el-avatar>
          </el-col>
          <el-col :span="5">
            <span class="username">{{ users?.find(u => u.userId == d.userId)?.userName ?? '用户' }}</span><br />
            <span class="datetime">{{ d.createTime }}</span>
          </el-col>
          <el-col :span="18">
            <el-button v-if="!d.selected" style="float: right; margin-right: 10px;"
              @click="setDesignVote(d)">设为候选</el-button>
            <el-button v-else style="float: right; margin-right: 10px;" type="warning"
              @click="cancelDesignVote(d)">取消候选</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <p>{{ d.text }}</p>
          </el-col>
          <el-col :span="4">
            <el-image :src="d.imgPath" :preview-src-list="[d.imgPath]" class="design-img"
              :preview-teleported="true"></el-image>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script setup lang="ts" name="viewDesign">
import { onMounted, ref } from "vue";
import { cancelVoteDesignApi, getAllDesignV2, setDesignVoteApi } from "@/api/modules/design"
import { Design, Site, User } from "@/api/interface";
import { ElMessage } from "element-plus";


const designs = ref<Design.SiteDesign[]>()
const sites = ref<Site.SiteInfo[]>()
const users = ref<User.ResUserBase[]>()
onMounted(async () => {
  const { data } = (await getAllDesignV2());
  designs.value = data.designs;
  users.value = data.users;
  sites.value = data.sites;

});

const setDesignVote = async (design: Design.SiteDesign) => {
  // const design = d;
  const { data: vote } = await setDesignVoteApi(design!);
  if (vote != null) {
    const index = designs.value?.findIndex(d => d.siteId === design.siteId && d.userId === design.userId)
    designs.value!.at(index!)!.selected = true
    ElMessage.success("已设置为投票候选")
  } else {
    ElMessage.error("设置失败")
  }
}

const cancelDesignVote = async (design: Design.SiteDesign) => {
  // const design = designs.value?.at(index)!;
  const { data } = await cancelVoteDesignApi(design);
  if (data) {
    const index = designs.value?.findIndex(d => d.siteId === design.siteId && d.userId === design.userId)
    designs.value!.at(index!)!.selected = false
    ElMessage.success("已取消")
  } else {
    ElMessage.error("设置失败")
  }
}

</script>

<style scoped>
.username {
  color: black;
}

.datetime {
  font-size: small;
  color: grey;
}

.design-img {
  height: 150px;
  padding: 10px;
}
</style>
