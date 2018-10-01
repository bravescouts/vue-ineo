<template>
<div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Level 1 - Job Material Summary</span>
    <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'List item ' + o }}
  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Level 2 - Job Material Summary</span>
    <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'List item ' + o }}
  </div>
</el-card>

</div>

</template>


<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
      }
    }
  }
</script>

<style>
 .text {
    font-size: 12px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>