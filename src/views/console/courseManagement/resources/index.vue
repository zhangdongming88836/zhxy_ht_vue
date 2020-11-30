<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="data.tableData"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip pull-top" >
        <!-- 引入公共的表格组件 组件在components>table>index.vue -->
        <Table :configTable="data.configTable">
          <!-- 子组件的 按钮 slot -->
          <template v-slot:status="data">
            <el-button type="danger" size="mini" @click="DeleteRole(data.data)"
              >删除</el-button
            >
          </template>
        </Table>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
//引入公共表格的组件
import Table from "@/components/table/index.vue";
export default {
  components: {
    Table,
  },
  name: "resources",
  setup(props, context) {
    const data = reactive({
      //传入公共组件表格的整体数据
      configTable: {
        //多选框的显示
        selection: false,
        //表格的头部数据
        tableHeader: [
          { lable: "文件名", field: "name"},
          { lable: "大小", field: "name" },
          { lable: "状态", field: "name" },
          { lable: "操作", typeRow: "slot", slotName: "status" },
        ],
        //表格文件内容的数据
        tableData: [
          {
            name: "food2.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
          {
            name: "food.jpeg",
             url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
      },
    });
     //方法区域相当于2.0的methods
    //用户管理删除角色
     const DeleteRole = data => {
       context.root.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          context.root.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          context.root.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
    console.log(context);
    //文件列表移除文件时的钩子
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    //点击文件列表中已上传的文件时的钩子
    const handlePreview = (file) => {
      console.log(file);
    };
    //文件超出个数限制时的钩子
    const handleExceed = (files, fileList) => {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    };
    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    const beforeRemove = (file, fileList) => {
      return context.root.$confirm(`确定移除 ${file.name}？`);
    };
    return {
      data,
      DeleteRole,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>