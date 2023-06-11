<template>
    <div class="card">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="进行中" name="first">
                <div v-for="s in inProcess?.sites" :key="s.siteId">
                    <h3>{{ s.title }}</h3>
                    <el-card v-for="v in inProcess?.votes.filter(vv => vv.siteId === s.siteId)" :key="v.id" shadow="hover"
                        class="vote-card">

                        <template #header>
                            <div class="card-header">
                                <span>{{ '供稿 : ' + inProcess?.users.find(uu => uu.userId == v.userId)?.userName }}</span>
                                <el-button class="card-button" @click="setFinalDesign(v)">选为终稿</el-button>
                            </div>
                        </template>

                        <p>{{ v.draftText }}</p>
                        <el-image :src="v.imgPath" class="vote-img" :preview-src-list="[v.imgPath]" preview-teleported>
                        </el-image>
                        <div class="vote-user">
                            <p>当前得票 : {{ v.voteNum }}</p>
                            <el-avatar v-for="u in inProcess?.users.filter(uu => v.userIds.indexOf(uu.userId) !== -1)"
                                :key="u.userId" :src="u.avatar" size="small"></el-avatar>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="查看所有" name="second">
                <div v-for="s in allVotes?.sites" :key="s.siteId">
                    <h3>{{ s.title }}</h3>
                    <el-card v-for="v in allVotes?.votes.filter(vv => vv.siteId === s.siteId)" :key="v.id" shadow="hover"
                        class="vote-card">

                        <template #header>
                            <div class="card-header">
                                <span>{{ '供稿 : ' + allVotes?.users.find(uu => uu.userId == v.userId)?.userName }}</span>
                                <!-- <el-button class="card-button" @click="setFinalDesign(v)">选为终稿</el-button> -->
                                <span v-if="v.selected" style="color: red;">终稿</span>
                            </div>
                        </template>

                        <p>{{ v.draftText }}</p>
                        <el-image :src="v.imgPath" class="vote-img" :preview-src-list="[v.imgPath]" preview-teleported>
                        </el-image>
                        <div class="vote-user">
                            <p>总得票 : {{ v.voteNum }}</p>
                            <el-avatar v-for="u in allVotes?.users.filter(uu => v.userIds.indexOf(uu.userId) !== -1)"
                                :key="u.userId" :src="u.avatar" size="small"></el-avatar>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts" name="votes">
import { ref, onMounted } from 'vue'
import { ElMessage, type TabsPaneContext } from 'element-plus'
import { Vote } from '@/api/interface/index'
import { getOnVotesApi, getAllVotesApi, setFinalDesignApi } from '@/api/modules/votes'

// const currentDataSource = ref()

const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const inProcess = ref<Vote.ResVotes>()
const allVotes = ref<Vote.ResVotes>()
onMounted(async () => {
    inProcess.value = (await getOnVotesApi()).data;
    allVotes.value = (await getAllVotesApi()).data;
    // currentDataSource.value = inProcess.value;
});

const setFinalDesign = async (vote: Vote.DesignVote) => {
    const { data } = await setFinalDesignApi(vote);
    if (data) {
        ElMessage.success("已设置为终稿")
    } else {
        ElMessage.error("设置失败")
    }
}
</script>

<style scoped>
.vote-card {
    margin-bottom: 20px;
}

.vote-img {
    width: 200px;
}

.vote-user {
    margin-top: 20px;
    font-size: small;
    color: grey;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>