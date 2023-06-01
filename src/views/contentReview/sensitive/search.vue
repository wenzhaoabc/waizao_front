<template>
	<div v-show="filterTableData.length==0">暂无敏感内容</div>
	<div v-show="filterTableData.length!=0">
		<el-row :span="4" v-for="(item, index) in filterTableData" :key="index" :offset="1" style="margin-bottom: 15px">
			<el-card :body-style="{
				padding: '15px',
				width: '1300px',
				height: '170px',
			}" shadow="hover">
				<el-descriptions class="margin-top" title="敏感内容" :column="3" :size="size" :style="blockMargin">
					<el-descriptions-item label="内容" span="3">
						<lable v-html="item.content"></lable>
					</el-descriptions-item>
					<el-descriptions-item label="身份">{{ item.userImg }}</el-descriptions-item>
					<el-descriptions-item label="用户名">{{ item.userName }}</el-descriptions-item>
					<el-descriptions-item label="发布时间">{{ item.time }}</el-descriptions-item>
				</el-descriptions>
				<div style="display: flex;margin-bottom: 15px">
					<el-button type="primary" style="margin-right:15px;margin-bottom: 15px;height: 30px;"
						@click="pass(item.shareId)">
						恢复
					</el-button>
					<el-button type="danger" style="margin-right:15px;margin-bottom: 15px;height: 30px;"
						@click="reject(item.shareId)">
						删除
					</el-button>
				</div>
			</el-card>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="square">
import { Content } from "@/api/interface";
import { getMinganApi, deleteSquareApi, approveSquareApi } from "@/api/modules/contentManager";
import { reactive, computed, ref, onMounted } from "vue";
import { ElMessageBox, ElForm, ElMessage } from "element-plus";
const size = ref("");
const blockMargin = computed(() => {
	const marginMap = {
		large: "32px",
		default: "28px",
		small: "24px",
	};
	return {
		marginTop: marginMap[(size.value) as keyof typeof marginMap] || marginMap.default,
	};
});

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
	console.log("onMounted")
	getAllShare();
	//refreshdata();
});

const refreshdata = () => {
	search.value = "1"
	search.value = ""

	//此步是为了触发computed
};



const getAllShare = async () => {
	const words = ["牛逼", "党", "政府"]
	console.log("getAllShare")
	const { data } = await getMinganApi();
	console.log(typeof (data));
	data.forEach(i =>
		words.forEach(item => {
			let reg = new RegExp(item, 'g');
			i.content = i.content.replace(reg, '<font color="red">' + item + '</font>');
			//console.log(i.content)
		})
	)
	console.log(data);
	tableData.splice(0, tableData.length, ...data);
	refreshdata();
};


const pass = async (shareId: number) => {
	try {
		await ElMessageBox.confirm("你确定恢复这条分享吗?", "提示", {
			confirmButtonText: "确认",
			cancelButtonText: "取消",
			type: "warning",
		});

		console.log(shareId)
		try{
			await approveSquareApi(shareId);
		}catch (error) {
		ElMessage.error('网络错误，恢复失败')
	}
		

		ElMessage({
			message: '恢复成功',
			type: 'success',
		})
		getAllShare();
		refreshdata();
	} catch (error) {
		//ElMessage.error('网络错误，恢复失败')
	}
}

const reject = async (shareId: number) => {
	try {

		console.log(shareId)
		await deleteSquareApi(shareId);
		getAllShare()

		ElMessage({
			message: '删除成功',
			type: 'success',
		})

		getAllShare();
		refreshdata();
	} catch (error) {
		ElMessage.error('网络错误，删除失败')
	}
}

</script>
<style scoped>
.el-descriptions {
	margin-top: 20px;
}

.cell-item {
	display: flex;
	align-items: center;
}

.margin-top {
	margin-top: 0px;
}
</style>
