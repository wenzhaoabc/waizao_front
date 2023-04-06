<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="政治面貌" prop="type" />
      <el-table-column label="住址" prop="address" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="按照姓名查询" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div id="buttons">
      <!-- Form -->
      <el-button type="primary" style="margin-right:15px" @click="dialogFormVisible = true">
        新增村民
      </el-button>
      <el-dialog v-model="dialogFormVisible" title="新增村民信息" style="width:600px">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="住址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="政治面貌" :label-width="formLabelWidth">
            <el-input v-model="form.type" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="warning">以EXCEL导入</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-button type="warning">导出EXCEL表格</el-button>
      <el-button type="warning">导出PDF</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="villager">
import { reactive, computed, ref } from "vue";
import { ElMessageBox } from "element-plus";


//Data
interface User {
  name: string;
  phone: string;
  type: string;
  address: string;
}
const search = ref("");
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const tableData: User[] = [
  {
    name: "张三",
    phone: "123456789",
    type: "群众",
    address: "街道办事处301",
  },
  {
    name: "李四",
    phone: "123456789",
    type: "党员",
    address: "街道办事处302",
  },
  {
    name: "王五",
    phone: "123456789",
    type: "党员",
    address: "街道办事处303",
  },
  {
    name: "周六",
    phone: "123456789",
    type: "党员",
    address: "街道办事处304",
  },
];
const form = reactive({
  name: '',
  phone: '',
  address: '',
  type: '',
})

//Methods
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm("你确定删除这个村民的信息吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const index = tableData.findIndex((item) => item.name === row.name);
      tableData.splice(index, 1);
      search.value = "1";
      search.value = ""; //此步是为了触发computed
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped>
#buttons {
  margin-top: 20px;
  text-align: right;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-input {
  width: 300px;
}
</style>
