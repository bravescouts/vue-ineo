<template>
  <el-tabs type="card">
      <el-tab-pane label="Deliver to Level 1">
<p></p>
<!-- summary of 2nd level delivery -->
<el-row :gutter="10" class="row-bg">
  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
    <el-tag
      type=""
      :key="tag.label"
      v-for="tag in getTags"
      :disable-transitions="true"
      >
      {{tag.label}} = {{tag.qty}}
    </el-tag>
  </el-col>
</el-row>



      </el-tab-pane>
      <el-tab-pane label="Deliver to Level 2">
        <p></p>
<!-- summary of 2nd level delivery -->
<el-row :gutter="10" class="row-bg">
  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
    <el-tag
      type="danger"
      :key="tag.label"
      v-for="tag in getTags"
      :disable-transitions="true"
      >
      {{tag.label}} = {{tag.qty}}
    </el-tag>
  </el-col>
</el-row>



      </el-tab-pane>
    </el-tabs>
</template>


<script>
 export default {
    data() {
      return {
        qty:50,
        tableData: this.$store.state.estimates
       
      };
    },
    computed: {
      // a computed getter
      getQty: function () {
        //return this.$store.state.estimates;
        return 44;
      },

      getTags: function () {
        var summaries = [];

        this.$store.state.estimates.forEach(element => {
          summaries.push({label:"12 ft. 1/2 Sheetrock",qty:99});
        });

        return summaries;
      }
    }

  };
  </script>