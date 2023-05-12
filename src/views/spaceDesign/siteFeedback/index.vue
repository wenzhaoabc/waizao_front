<template>
    <div class="card root-container">
        <div id="t-map-feedback-container" style="width: 100%;height: 100%;"></div>

        <el-dialog v-model="feedbackDetail.showModel" :title="feedbackDetail.currentFeedback?.title">
            <el-descriptions title="基本信息">
                <el-descriptions-item label="反馈主题">{{ feedbackDetail.currentFeedback?.title }}</el-descriptions-item>
                <el-descriptions-item label="反馈村民">{{ feedbackDetail.currentUser?.userName }}</el-descriptions-item>
                <el-descriptions-item label="反馈时间">
                    {{ feedbackDetail.currentFeedback?.createdTime.toString().split(' ')[0] }}
                </el-descriptions-item>
                <el-descriptions-item label="处理状态">
                    <span v-if="feedbackDetail.currentFeedback?.siteId">
                        {{ '已处理 : ' + feedbackDetail.currentSite?.title }}
                    </span>
                    <span v-else>未处理</span>
                </el-descriptions-item>
                <el-descriptions-item label="反馈内容" width="200">
                    <span>
                        {{ feedbackDetail.currentFeedback?.content }}
                    </span>
                </el-descriptions-item>
            </el-descriptions>
            <h3 style="color: black;">反馈图片</h3>
            <el-image class="feedback-image" v-for="img in feedbackDetail.currentFeedback?.imgList" :key="img" :src="img"
                fit="cover" />
            <h3 style="color: black;">处理</h3>
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input v-model="feedbackDetail.reply" placeholder="请输入点位名称" :minlength="1" clearable></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="success" @click="handleReplyFeedback">
                        {{ feedbackDetail.currentFeedback?.siteId ? '修改' : '确认' }}
                    </el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="siteFeedback">
import { reactive, ref, onMounted } from 'vue';
import { Site } from '@/api/interface';
import { getSiteFeedbackApi, resolveSiteFeedbackApi } from '@/api/modules/sites';
import { getUserInfoApi } from '@/api/modules/login';
import { getSiteInfoApi } from '@/api/modules/sites';
import { User } from '@/api/interface/index';
import { GlobalStore } from '@/stores';
import { ElMenu, ElMessage } from 'element-plus';

let dataMap = {
    map: null,
    markLayer: null, // 点位标记图层
    latitude: '30.952112',
    lngitude: '121.873531',
};
const TMap = (window as any).TMap;
const globalStore = GlobalStore();

/**
 * 初始化地图
 */
const initMap = () => {
    let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude)
    dataMap.map = new TMap.Map(document.getElementById('t-map-feedback-container'), {
        center: center,//设置地图中心点坐标
        zoom: 17.2,   //设置地图缩放级别
        pitch: 43.5,  //设置俯仰角
        rotation: 45    //设置地图旋转角度
    });
}

/**
 * 添加标记点位
 */
const feedback = ref<Site.SiteFeedback[]>();

const addSiteMarker = () => {
    dataMap.markLayer = new TMap.MultiMarker({
        map: dataMap.map,
        styles: {
            "resolved": new TMap.MarkerStyle({
                "width": 25,
                "height": 35,
                "offset": { x: 0, y: -25 },
                "color": "#47484c",
                "anchor": { x: 16, y: 32 }
            }),
            "unresolved": new TMap.MarkerStyle({
                "width": 25,
                "height": 35,
                "color": "#20a162",
                "offset": { x: 0, y: -25 },
                "anchor": { x: 16, y: 32 }
            })
        },
        geometries: feedback.value?.map(f => {
            return {
                id: (f.id).toString(),
                styleId: f.siteId != undefined ? 'resolved' : 'unresolved',
                position: new TMap.LatLng(f.siteLatitude, f.siteLongitude),
                content: f.title,
                properties: {
                    title: f.title,
                }
            }
        })
    });

    (dataMap.markLayer as any).on("click", handleMarkerClick);
}



/**
 * 点位详情模态框
 */
const feedbackDetail = reactive({
    showModel: false,
    currentFeedback: null as Site.SiteFeedback | null,
    currentUser: null as User.UserInfo | null,
    currentSite: null as Site.SiteInfo | null,
    reply: "",
})

const handleMarkerClick = async (evt: any) => {
    console.log("点击标记点", evt);
    const { id } = evt.geometry;
    feedbackDetail.currentFeedback = feedback.value?.find(f => f.id == Number(id))!
    console.log(feedbackDetail);

    const { data: ui } = await getUserInfoApi(feedbackDetail.currentFeedback.userId);
    feedbackDetail.currentUser = ui;

    if (feedbackDetail.currentFeedback.siteId) {
        const { siteId } = feedbackDetail.currentFeedback;
        const { data: temp } = await getSiteInfoApi(siteId);
        feedbackDetail.currentSite = temp;
    }

    feedbackDetail.showModel = true;
}

const handleReplyFeedback = async () => {
    if (feedbackDetail.reply.length < 2) {
        ElMessage({ message: "请输入合法点位名称", type: "error" });
        return;
    }
    const res = await resolveSiteFeedbackApi({ siteName: feedbackDetail.reply, feedbackId: feedbackDetail.currentFeedback!.id });
    if (res.code != 200) {
        ElMessage({ message: res.msg, type: "error" });
    } else {
        ElMessage({ message: "反馈处理成功", type: "success" });
    }
}

onMounted(async () => {
    initMap();

    const { data: resfeedback } = await getSiteFeedbackApi(1);
    feedback.value = resfeedback;
    console.log(feedback.value);
    addSiteMarker();
})
</script>

<style scoped>
.root-container {
    height: 100%;
    width: 100%;
    position: relative;
}

.feedback-image {
    width: 120px;
    height: 120px;
    margin-right: 20px;
}
</style>