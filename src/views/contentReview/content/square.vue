<template>
	<div v-show="filterTableData.length==0">暂无审核内容</div>
	<div v-show="filterTableData.length!=0">
		<el-row :span="4" v-for="(item, index) in filterTableData" :key="index" :offset="1" style="margin-bottom: 15px">
			<el-card :body-style="{
				padding: '10px',
				width: '1300px',
				height: '120px',
			}" shadow="hover">
				<span>{{ item.content }}</span>
				<div style="display: flex">
					<h5 style="width: 200px">身份：{{ item.userImg }}</h5>
					<h5 style="width: 200px">ID：{{ item.userName }}</h5>
					<h5 style="width: 300px">发布时间：{{ item.time }}</h5>
				</div>
				<div style="display: flex;margin-bottom: 15px">
					<el-button type="primary" style="margin-right:15px;margin-bottom: 15px;height: 30px;"
						@click="pass(index, item.shareId)">
						批准
					</el-button>
					<el-button type="danger" style="margin-right:15px;margin-bottom: 15px;height: 30px;"
						@click="reject(index, item.shareId)">
						驳回
					</el-button>
				</div>

			</el-card>
		</el-row>

	</div>
</template>

<script setup lang="ts" name="square">
import { Content } from "@/api/interface";
import { getSquareApi, deleteSquareApi, approveSquareApi } from "@/api/modules/contentManager";
import { reactive, computed, ref, onMounted } from "vue";
import { ElMessageBox, ElForm, ElMessage } from "element-plus";

const search = ref("");
const tableData: Content.ResSquare[] = [
	{
		shareId: 0,
		img: "",
		content: "",
		userName: "",
		userImg: "",
		isLove: false,
		loveNum: 0,
		place: "",
		time: "",
		commentAmount: 0,
		comment: "",
	},
];

const filterTableData = computed(() =>
	tableData.filter(
		(data) =>
			!search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
	)
);
//
onMounted(async () => {
	getAllShare();
	refreshdata();
});

const refreshdata = () => {
	search.value = "1"
	search.value = ""
	//此步是为了触发computed
};

const getAllShare = async () => {
	const { data } = await getSquareApi();
	console.log(data);
	tableData.splice(0, tableData.length, ...data);
	refreshdata();
};

const pass = async (index: number, shareId: number) => {
	try {

		console.log(shareId)
		await approveSquareApi(shareId);
		getAllShare()

		ElMessage({
			message: '批准成功',
			type: 'success',
		})
	} catch (error) {
		ElMessage.error('网络错误，批准失败')
	}
}

const reject = async (index: number, shareId: number) => {
	try {
		await ElMessageBox.confirm("你确定驳回这条分享吗?", "提示", {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		});

		console.log(shareId)
		try{
			await deleteSquareApi(shareId);
		}catch (error) {
		ElMessage.error('网络错误，驳回失败')
	}
		
		getAllShare()

		ElMessage({
			message: '驳回成功',
			type: 'success',
		})
	} catch (error) {
		//
	}
}

</script>
<style scoped></style>
