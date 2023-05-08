<template>
    <div class="card component-root">
        <div id="t-map-container"></div>
        <div class="site-info">
            <el-button v-if="!communityInfo?.area" type="primary" @click="drawCommunityEdge">绘制边界</el-button>
            <span v-else>
                <el-button v-if="!isEditingEdge" type="primary" @click="editCommunityEdge">编辑边界</el-button>
                <el-button v-else type="success" @click="edgeEditCompleted">完成</el-button>
            </span>
            <el-button type="primary" @click="addNewSite">添加点位</el-button>
            <el-card v-if="currentSite != null" class="site-info-card">
                <el-carousel :interval="5000" arrow="always" class="" height="150px">
                    <el-carousel-item v-for="item in currentSite?.images" :key="item.imgId">
                        <el-image :src="item.imgPath" fit="fill" :preview-src-list="[item.imgPath]" />
                    </el-carousel-item>
                </el-carousel>
                <h3>{{ currentSite?.title }}</h3>
                <p class="site-info-community">{{ communityInfo?.name }} : <span>{{ currentSite?.createTime }}</span></p>
                <p>{{ currentSite?.detail }}</p>
            </el-card>
        </div>
        <div class="toolControl" v-if="currentGeometryId.length > 0">
            <div class="toolItem" :class="{ 'toolItem-active': currentGeometryId == 'marker' }" title="点标记"
                @click="selectGeometryType('marker')"
                style="background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker_editor.png');">
            </div>
            <div class="toolItem" :class="{ 'toolItem-active': currentGeometryId == 'polyline' }" title="折线"
                @click="selectGeometryType('polyline')"
                style="background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polyline.png');"></div>
            <div class="toolItem" :class="{ 'toolItem-active': currentGeometryId == 'polygon' }" title="多边形"
                @click="selectGeometryType('polygon')"
                style="background-image: url('https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/polygon.png');"></div>
        </div>
        <div class="sefl-map-controller">
            <div class="satellite-contoller" @click="changeBaseMapType">
                <SvgIcon v-if="!baseMapTypeSvgStreet" name="map-satellites" :icon-style="mapControllerStyle" />
                <SvgIcon v-else name="map-street" :icon-style="mapControllerStyle" />
            </div>
            <div class="origin-cenetr-contoller">
                <SvgIcon name="map-location-fill" :icon-style="mapControllerStyle" @click="gotoOriginCenter" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="communityHome">
import { getCommunitySites, getCommunityInfo, updateCommunityEdge } from '@/api/modules/sites';
import { onMounted, ref, reactive, CSSProperties, computed } from 'vue';
import SvgIcon from "@/components/SvgIcon/index.vue";
import { Site } from "@/api/interface/index";
import { ElMessage } from 'element-plus';
const mapControllerStyle = {
    width: "24px",
    height: "24px",
    backgroundColor: "#fff",
    padding: "8px",
    borderRadius: "5px",
    boxShadow: "0 8px 19px rgba(41,64,102,.12)"
} as CSSProperties;


// 当前社区的信息
const communityInfo = ref<Site.CommunityInfo>();
// * 所有点位的信息
const communitySites = ref<Site.SiteInfo[]>();
// 当前要展示详细信息的点位
const currentSite = ref<Site.SiteInfo>();
var dataMap = {
    map: null,
    editor: null,   // 绘制地理边界
    markLayer: null, // 点位标记图层
    edgeLayer: null, // 社区地理边界图层
    edgeEditor: null, // 地理边界编辑
    latitude: '30.949663938173174',
    lngitude: '121.87020113512813',
};
const TMap = (window as any).TMap;

/**
 * 初始化地图
 */
const initMap = () => {
    let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude)
    dataMap.map = new TMap.Map(document.getElementById('t-map-container'), {
        center: center,//设置地图中心点坐标
        zoom: 17.2,   //设置地图缩放级别
        pitch: 43.5,  //设置俯仰角
        rotation: 45    //设置地图旋转角度
    });

    // 绑定点击事件
    (dataMap.map as any).on('click', clickMapHandler)
}

const clickMapHandler = (event: any) => {
    console.log(event);
}



/**
 * 添加点位标记
 * @param sites 点位数组
 */
const createSitesMarks = (sites: Site.SiteInfo[]) => {
    console.log({ sites });

    if (sites != null) {
        dataMap.markLayer = new TMap.MultiMarker({
            map: dataMap.map,
            styles: {
                "primary": new TMap.MarkerStyle({
                    width: 25,
                    height: 35,
                    color: '#229453', // 标注点文本颜色,
                    offset: { x: 0, y: -25 },
                    anchor: { x: 16, y: 32 }
                })
            },
            geometries: sites.map(s => {
                return {
                    id: s.siteId,
                    styleId: "primary",
                    position: new TMap.LatLng(s.siteLatitude, s.siteLongitude),
                    content: s.title,
                    properties: {
                        title: s.title
                    }
                }
            })
        });
        (dataMap.markLayer as any).on("click", handleMarkClick);
    }
}

const handleMarkClick = (event: any) => {
    console.log("handleMarkClick", event);
    currentSite.value = communitySites.value?.find(s => s.siteId == event.geometry.id)
}

/**
 * 添加社区地理边界
 * @param info 社区信息
 */
const createAreaEdge = (info: Site.CommunityInfo) => {
    const path = info.area.coordinates[0].map(p => {
        return new TMap.LatLng(p.at(0), p.at(1))
    })
    dataMap.edgeLayer = new TMap.MultiPolygon({
        id: "polygon-layer", // 图层id
        map: dataMap.map, // 显示多边形图层的底图
        styles: {
            // 多边形的相关样式
            "primary": new TMap.PolygonStyle({
                color: 'rgba(123,231,255,0.5)', // 面填充色
                showBorder: true, // 是否显示拔起面的边线
                borderColor: '#00FFFF', // 边线颜色
            }),
        },
        geometries: [
            {
                id: "polygon-id", // 多边形图形数据的标志信息
                styleId: "primary", // 样式id
                paths: path, // 多边形的位置信息
                properties: {
                    // 多边形的属性数据
                    title: info.name,
                    id: info.id
                },
            },
        ],
    });
}


/**
 * 自定义工具栏
 */
// 回到原位置
const gotoOriginCenter = () => {
    (dataMap.map as any).panTo(new TMap.LatLng(dataMap.latitude, dataMap.lngitude));
}
// 卫星图/标准地图切换
const baseMapTypeSvgStreet = ref<boolean>(false);
const changeBaseMapType = () => {
    let mapType = (dataMap.map as any).getBaseMap();
    console.log(mapType);

    if (mapType.type == "satellite") {
        (dataMap.map as any).setBaseMap({
            type: "vector",
            features: ['base', 'building3d', 'building2d', 'point', 'label', 'arrow'],
            buildingRange: [16.5, 20]
        });
        baseMapTypeSvgStreet.value = false;
    } else {
        (dataMap.map as any).setBaseMap({
            type: "satellite",
            features: ['base', 'road']
        });
        baseMapTypeSvgStreet.value = true;
    }
}

/**
 * 社区地理边界绘制
 */
const currentGeometryId = ref<string>("");
const selectGeometryType = (event: string) => {
    currentGeometryId.value = event;
    console.log({ event });
    (dataMap.editor as any).setActiveOverlay(event);
}
const drawCommunityEdge = () => {
    currentGeometryId.value = "marker"
    dataMap.editor = new TMap.tools.GeometryEditor({
        map: dataMap.map,
        overlayList: [
            {
                overlay: new TMap.MultiMarker({
                    map: dataMap.map,
                }),
                id: 'marker',
            },
            {
                overlay: new TMap.MultiPolyline({
                    map: dataMap.map,
                }),
                id: 'polyline',
            },
            {
                overlay: new TMap.MultiPolygon({
                    map: dataMap.map,
                }),
                id: 'polygon',
            }
        ],
        actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW,
        activeOverlayId: 'marker',
        snappable: true,
    });
    // selectGeometryType("marker");
    (dataMap.editor as any).on('draw_complete', handleGeometryCompleted)
}

const handleGeometryCompleted = (geometry: any) => {
    console.log(geometry);
}

/**
 * 编辑社区地理边界
 */
const isEditingEdge = ref<boolean>(false);
let editedEdgePath: Array<any> = [];
const editCommunityEdge = () => {
    currentSite.value = undefined;
    isEditingEdge.value = true;
    const path = communityInfo.value?.area.coordinates[0].map(p => {
        return new TMap.LatLng(p.at(0), p.at(1))
    })
    dataMap.edgeEditor = new TMap.tools.GeometryEditor({
        map: dataMap.map, // 编辑器绑定的地图对象
        overlayList: [ // 可编辑图层
            {
                overlay: new TMap.MultiPolygon({
                    map: dataMap.map,
                    styles: {
                        highlight: new TMap.PolygonStyle({
                            color: 'rgba(255, 255, 0, 0.6)'
                        })
                    },
                    geometries: [
                        {
                            paths: path
                        },
                    ]
                }),
                id: 'polygon',
                selectedStyleId: 'highlight'
            }
        ],
        actionMode: TMap.tools.constants.EDITOR_ACTION.INTERACT, // 编辑器的工作模式
        activeOverlayId: 'polygon', // 激活图层
        selectable: true, // 开启点选功能
        snappable: true // 开启吸附
    });
    (dataMap.edgeEditor as any).on('adjust_complete', (event: any) => {
        console.log(event);
        editedEdgePath = event.paths;
    });
}

const edgeEditCompleted = async () => {
    (dataMap.edgeLayer as any).remove(["polygon-id"]);
    console.log({ editedEdgePath });
    const geoJson = editedEdgePath.map(p => {
        return [p.lat, p.lng];
    })
    communityInfo.value!.area.coordinates = [geoJson];
    const path = editedEdgePath.map(p => {
        return new TMap.LatLng(p.lat, p.lng);
    });
    console.log(dataMap);

    (dataMap.edgeLayer as any).updateGeometries([{
        id: "polygon-id",
        styleId: "primary",
        paths: path
    }]);
    geoJson.push(geoJson[0])
    await updateCommunityEdge({ communityId: communityInfo.value!.id, area: { type: "Polygon", coordinates: [geoJson] } });
    (dataMap.edgeEditor as any).disable();
    ElMessage({ message: "更改成功", type: "success" });
    isEditingEdge.value = false;
    (dataMap.map as any).easeTo({
        pitch: 43.5,  //设置俯仰角
        rotation: 45 // 旋转角度
    })
}

/**
 * 添加新的点位
 */
const addNewSite = () => {
    (dataMap.map as any).on("rightclick", handleMapRightClick)
}

const handleMapRightClick = (evt: any) => {
    console.log("右键单击", evt);
}

onMounted(async () => {
    // nextTick(async () => {
    //     initMap();
    //     const data = await getSitesInfo();
    //     console.log(data);
    // });
    initMap();
    // 请求当前社区的信息
    communityInfo.value = (await getCommunityInfo(1)).data;
    createAreaEdge(communityInfo.value);
    // 请求当前社区的所有点位
    communitySites.value = (await getCommunitySites(communityInfo.value.id)).data;
    createSitesMarks(communitySites.value);
})


</script>

<style>
#t-map-container {
    /*地图(容器)显示大小*/
    width: 100%;
    height: 100%;
}
</style>

<style scoped>
.component-root {
    height: 100%;
    width: 100%;
    position: relative;
}

.site-info {
    position: absolute;
    z-index: 1001;
    top: 25px;
    left: 25px;
}

.site-info-card {
    margin-top: 10px;
    width: 300px;
    height: 480px;
}

.site-info-community {
    font-size: small;
}

.toolControl {
    position: absolute;
    top: 25px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: 252px;
    z-index: 1001;
}

.toolItem {
    width: 30px;
    height: 30px;
    float: left;
    margin: 1px;
    padding: 4px;
    border-radius: 3px;
    background-size: 30px 30px;
    background-position: 4px 4px;
    background-repeat: no-repeat;
    box-shadow: 0 1px 2px 0 #e4e7ef;
    background-color: #ffffff;
    border: 1px solid #ffffff;
}

.toolItem:hover {
    border-color: #789cff;
}

.toolItem-active {
    border-color: #d5dff2;
    background-color: #d5dff2;
}

.sefl-map-controller {
    inset: auto 0px 0px auto;
    position: absolute;
    z-index: 1001;
    transform: translate(0px, 0px);
    padding: 20px;
}

.satellite-contoller {
    margin: auto 30px 7px auto;
}

.origin-cenetr-contoller {
    margin: 20px 30px 30px auto;
}
</style>