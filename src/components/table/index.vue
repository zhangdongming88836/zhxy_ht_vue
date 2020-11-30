<template>
  <div>
    <!-- 这里是公共的表格组件 -->
    <el-table :data="data.tableData" border style="width: 100%" size="mini">
      <!-- 多选框 -->
      <el-table-column v-if="data.selection" type="selection" width="50">
      </el-table-column>
      <!-- 表格数据 -->
      <template v-for="item in data.tableHeader">
        <!-- 插槽slot -->
        <el-table-column
          :key="item.id"
          :prop="item.field"
          :label="item.lable"
          align="center"
          v-if="item.typeRow === 'slot'"
          width="280"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 表格文本数据渲染 -->
        <el-table-column
          :key="item.id"
          :prop="item.field"
          :label="item.lable"
          align="center"
          v-else
        ></el-table-column>
      </template>
    </el-table>
    <div class="block"></div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.paging.currentPage"
      :page-sizes="data.paging.pageSsizes"
      :page-size="data.paging.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.paging.total"
      background
    >
    </el-pagination>
    <div class="blank"></div>
  </div>
</template>
<script>
import { onBeforeMount, onMounted, reactive,watch } from "@vue/composition-api";
export default {
  name: "tableComponent",
  //接受父组件的数据
  props: {
    configTable: {
      type: Object,
      default: () => {},
    },
    total:{
      type:Number,
      default:0
    }
  },
  setup(props, context) {
    //这里data中保存所有的基础数据
    const data = reactive({
      //将父组件的值赋值给子组件的变量
      tableHeader: props.configTable.tableHeader,
      tableData: [
        
      ],
      selection: props.configTable.selection,
      //分页的基础数据
      paging:{
        total:100,
        pageSize:10,
        pageSsizes:[10,20,30,40],
        currentPage:1,
      },
    });
    watch(() => props.configTable.tableData,(val)=>{
      data.tableData = val;
        
    })
     watch(() => props.total,(val)=>{
      data.paging.total = val;
        
    })
    /**************************************************** */
    //每页多少条方法
   const handleSizeChange = (val) => {
        //console.log(`每页 ${val} 条`);
        data.paging.pageSize = val;
        context.emit("strip",data.paging.pageSize);
      };
      //当前第几页的方法
   const handleCurrentChange = (val) => {
        //console.log(`当前页: ${val}`);
        data.paging.currentPage = val;
        context.emit("page",data.paging.currentPage);
      }
      onMounted(()=>{
        context.emit("page",data.paging.currentPage);
        context.emit("strip",data.paging.pageSize);
      });
    return {
      data, //抛出对象
      handleSizeChange,//抛出每页多少条方法
      handleCurrentChange,//抛出当前第几页的方法
      
    };
  },
};
</script>
<style lang="scss" scoped>
.block {
  margin-top: 30px;
}
.blank{
  height:300px;
}
</style>