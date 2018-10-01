
<template>
<div>
<el-card class="box-card">
  <div class="text item">
    Manage Job Sites and Materials {{ errors }} {{ msg }} 
  
  </div>
</el-card>
</div>
</template>

<script>
import Utils from '../mixins/utils.js';

export default {
  mixins: [Utils],
  data: function() {
    return {
      errors: '--HOME--',
      msg: this.getCreatedDate()
    }
  }
}
</script>



<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
