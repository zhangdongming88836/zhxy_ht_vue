<template>
  <div>
    <el-form :inline="true" class="demo-form-inline pull-left">
      <el-form-item label="班级人员：">
        <el-input style="width: 360px"></el-input>
      </el-form-item>
      <template>
        <el-button type="primary" @click="closure()">关闭</el-button>
      </template>
    </el-form>
    <el-table :data="data.tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column prop="dadadwfv" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="DeleteStudents(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block"></div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="data.currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  setup(props, context) {
    const data = reactive({
      //默认第几页
      currentPage4: 1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    });
   console.log(context.root.$route.query); 
    //方法区域
    //关闭方法
    const closure = () => {
      context.root.$router.push({ path: "/student" });
    };
    //删除学生
    const DeleteStudents = (value) => {
      console.log(value);
    };
    //每页几条数据
   const handleSizeChange = (val) =>  {
        console.log(`每页 ${val} 条`);
      };
      //当前第几页数据
    const handleCurrentChange = (val) => {
        console.log(`当前页: ${val}`);
      }
    return {
      data,
      closure, //抛出关闭
      DeleteStudents, //抛出删除学生
      handleCurrentChange,//抛出当前页码
      handleSizeChange,//抛出每页几条数据
    };
  },
};
</script>
<style lang="scss" scoped>
.block{
    height:30px;
}
</style>