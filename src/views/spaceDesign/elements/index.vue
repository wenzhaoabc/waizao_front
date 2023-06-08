<template>
    <div class="card">
        <div class="">
            <h3 class="type-name">基础设计元素</h3>
            <el-button style="float: right;" type="success" @click="isaddBaseType = true;">添加</el-button>
        </div>
        <div v-for="(t, index) in elements" :key="t.typeId">
            <h4 class="type-name">{{ t.name }}</h4>
            <el-button class="type-btn" type="danger" @click="handleDeleteType(t.typeId)">删除</el-button>
            <el-scrollbar>
                <div class="scroll-h">
                    <div class="block">
                        <el-image class="item-img" :src="String(t.imgPath)" :lazy="true" />
                        <span>封图</span>
                        <el-button size="small" type="danger" @click="changeTypeImg(t.typeId)">更换</el-button>
                    </div>
                    <div class="block" v-for="(i, index) in t.items" :key="i.itemId">
                        <el-image class="item-img" :src="i.imgPath" :lazy="true"
                            :preview-src-list="t.items.map(img => img.imgPath)" :preview-teleported="true"
                            :initial-index="index">
                            <template #viewer>
                                <h1>VIEWER内容</h1>
                                <p>{{ i.imgPath }}</p>
                            </template>
                        </el-image>
                        <span>{{ i.name }}</span>
                        <el-button size="small" type="danger" @click="deleteItem(t.typeId, i.itemId)">删除</el-button>
                    </div>
                    <Img imageUrl="" height="120px" width="120px" :disabled="true"
                        @click="currentTypeId = t.typeId; isUploadItem = true"></Img>
                </div>
            </el-scrollbar>
        </div>
        <h3>AR设计元素</h3>
        <el-scrollbar>
            <div class="scroll-h">
                <div class="block" v-for="(i, index) in armodels" :key="i.id">
                    <el-image class="item-img" :src="i.imgPath" :lazy="true" @click="handleThreeView(i)" />
                    <span>{{ i.name }}</span>
                    <el-button size="small" type="danger" @click="deleteArModel(i.id)">删除</el-button>
                </div>
                <Img imageUrl="" height="120px" width="120px" :disabled="true" @click="isAddingAr = true"></Img>
            </div>
        </el-scrollbar>

        <el-dialog v-model="isUploadItem" title="添加设计元素">
            <el-form :model="newTypeItem">
                <el-form-item label="名称">
                    <el-input v-model="newTypeItem.name" placeholder="新设计元素的名称"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <Img v-model:image-url="newTypeItem.img" height="120px" width="120px"></Img>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isUploadItem = false">取消</el-button>
                    <el-button type="primary" @click="addTypeItem">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="isaddBaseType" title="添加基础设计类型">
            <el-form :model="newBaseType">
                <el-form-item label="名称">
                    <el-input v-model="newBaseType.name" placeholder="新设计类型的名称"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="newBaseType.description" placeholder="简短的描述"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <Img v-model:image-url="newBaseType.imgPath" height="120px" width="120px"></Img>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isaddBaseType = false">取消</el-button>
                    <el-button type="primary" @click="addBaseType">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="isAddingAr" title="添加AR设计模型">
            <el-form :model="newArModel">
                <el-form-item label="名称">
                    <el-input v-model="newArModel.name" placeholder="AR模型的名称"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <Img v-model:image-url="newArModel.imgPath" height="120px" width="120px"></Img>
                </el-form-item>
                <el-form-item label="模型">
                    <el-upload drag action="http://47.103.223.106:5000/file/upload-single" :limit="1"
                        :on-success="uploadModelSuccess">
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                gltf files with a size less than 30Mb
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isAddingAr = false">取消</el-button>
                    <el-button type="primary" @click="addNewArModel">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="elements">
import { onMounted, reactive, ref } from 'vue';
import * as api from '@/api/modules/design';
import { Design } from '@/api/interface/index';
import Img from '@/components/Upload/Img.vue';
import { ElEmpty, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const elements = ref<Design.Type[]>()
// * AR设计元素
const armodels = ref<Design.ARModel[]>()

// * 基础设计元素

// * 添加基础设计元素
const isaddBaseType = ref<boolean>(false)
const newBaseType = reactive({
    name: "",
    description: "",
    imgPath: ""
})
const addBaseType = async () => {
    if (newBaseType.name.length > 0 && newBaseType.imgPath.length > 0) {
        const { data: newType } = await api.addDesignType(newBaseType);
        elements.value?.push(newType);
        ElMessage({ message: "添加成功", type: "success" })
        isaddBaseType.value = false;
        newBaseType.description = ""
        newBaseType.name = ""
        newBaseType.imgPath = ""
    } else {
        ElMessage({ message: "内容不可为空", type: "error" })
    }
}

const handleDeleteType = async (typeId: number) => {
    const { data } = await api.deleteTypeApi(typeId)
    if (data == true) {
        ElMessage({ message: "删除成功", type: "success" })
        const index = elements.value?.findIndex(t => t.typeId == typeId)
        if (index != null) {
            elements.value?.splice(index, 1)
        }
    } else {
        ElMessage({ message: "删除失败", type: "error" })
    }
    console.log("删除");
}

const changeTypeImg = (typeId: number) => {
    console.log("更换封面图");
}

const deleteItem = async (typeId: number, itemId: number) => {
    const { data } = await api.deleteItemApi(itemId)
    if (data == true) {
        ElMessage({ message: "删除成功", type: "success" })
        elements.value?.forEach(t => {
            if (t.typeId == typeId) {
                const index = t.items.findIndex(i => i.itemId == itemId)
                t.items.splice(index, 1)
            }
        })
    } else {
        ElMessage({ message: "删除失败", type: "error" })
    }
    console.log("删除某一个设计元素");

}

const isUploadItem = ref<boolean>(false)
const newTypeItem = reactive({
    name: "",
    img: ""
})
const currentTypeId = ref<number>();
const addTypeItem = async () => {
    isUploadItem.value = true;
    const { data: newItem } = await api.addDesignItem({ typeId: currentTypeId.value!, name: newTypeItem.name, description: "", imgPath: newTypeItem.img })
    elements.value?.forEach(t => { if (t.typeId == currentTypeId.value) { t.items.push(newItem) } });
    ElMessage({ message: "添加成功", type: "success" });
    isUploadItem.value = false;
    newTypeItem.img = "";
    newTypeItem.name = "";
    // currentTypeId.value = null;
    // console.log("自定义上传方法");
}

// * AR模型
const isAddingAr = ref<boolean>(false)
const newArModel = reactive({
    name: "",
    imgPath: "",
    model: ""
})

const deleteArModel = async (id: number) => {
    const { data } = await api.deleteArModelApi(id);
    if (data == true) {
        ElMessage({ message: "删除成功", type: "success" })
        const index = armodels.value?.findIndex(a => a.id == id)
        if (index != null) { armodels.value?.splice(index, 1) }
    }
    console.log("删除AR模型", id);
}
const uploadModelSuccess = (res: any) => {
    console.log(res);
    console.log("上传成功");
    newArModel.model = res.data.fileUrl
}

const addNewArModel = async () => {
    const { code, data } = await api.addNewArModel(newArModel);
    if (code == 200) {
        ElMessage({ message: "上传成功", type: "success" })
        armodels.value?.push(data)
        isAddingAr.value = false;
    } else {
        ElMessage({ message: "添加失败", type: "error" })
    }
}

/**
 * 3维模型预览
 */
const router = useRouter()
const handleThreeView = (arModel: Design.ARModel) => {
    const modelUrl = arModel.model;
    if (modelUrl == undefined || modelUrl == "") {
        ElMessage({ message: "暂无立体模型", type: "warning" })
        return;
    }
    router.push({ path: '/space-design/element/viewer', query: { url: modelUrl } })
}

onMounted(async () => {
    const { data: allElem } = await api.getAllDesignElementApi()
    elements.value = allElem
    const { data: ars } = await api.getAllArModel()
    armodels.value = ars
})
</script>

<style scoped>
.type-name {
    display: inline-block;
}

.type-btn {
    float: right;
}

.item-img {
    width: 120px;
    height: 120px;
    margin: 0 20px;
}

.item-divider {
    /* height: 100px; */
    line-height: 100px;
    /* display: inline-block; */
}

.block {
    display: inline-block;
    text-align: center;
    margin-right: 20px;
}

.block span {
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
}

.scroll-h {
    /* flex-shrink: 0; */
    display: flex;
    align-items: start;
    justify-content: start;
    width: 100%;
    margin: 15px;
    /* text-align: center; */
    /* border-radius: 4px; */
}
</style>