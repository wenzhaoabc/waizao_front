<template>
  <div class="card">
    <div v-for="(d, index) in designs" :key="`${d.userId}-${d.siteId}`">
      <el-row>
        <!-- <el-col :span="1">
          <span>{{ d.siteId }}</span>
        </el-col> -->
        <el-col :span="1">
          <el-avatar :src="d.imgPath"></el-avatar>
        </el-col>
        <el-col :span="5">
          <span class="username">{{ (usersTemp?.at(index)?.userName) ?? '用户' }}</span><br />
          <span class="datetime">{{ d.createTime }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>{{ d.text }}</p>
        </el-col>
        <el-col :span="8">
          <el-image :src="d.imgPath" :preview-src-list="[d.imgPath]" style="height: 150px;"
            :preview-teleported="true"></el-image>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts" name="viewDesign">
import { computed, onMounted, ref } from "vue";
import { getSiteDesignApi } from "@/api/modules/design"
import { Design, User } from "@/api/interface";
import { getUserInfoApi } from "@/api/modules/login";


// const users = computed(() => {
//   return usersTemp.value
// })

const usersTemp = ref<User.UserInfo[]>()
// const getUser = async (userId: number) => {
//   const res = await getUserInfoApi(userId)
//   // 确保 usersTemp 已经被赋值
//   usersTemp.value?.push(res.data)
// }

const designs = ref<Design.SiteDesign[]>()
onMounted(async () => {
  designs.value = (await getSiteDesignApi()).data;

  const usersToAdd: User.UserInfo[] = []; // 临时数组用于收集待添加的元素

  for (let index = 0; index < designs.value.length; index++) {
    const design = designs.value[index];
    if (false) {
      // usersToAdd.push(usersTemp.value[index]); // 将待添加元素放入临时数组
    } else {
      const userInfo = (await getUserInfoApi(design.userId)).data;
      usersToAdd.push(userInfo); // 将待添加元素放入临时数组
    }
  }
  usersTemp.value = usersToAdd; // 一次性修改 usersTemp.value
});
</script>

<style scoped>
.username {
  color: black;
}

.datetime {
  font-size: small;
  color: grey;
}
</style>
