<template>
    <div id="EstimateEditor">
    <!-- form dialog -->
<el-dialog title="Estimate Record" :visible.sync="dialogFormVisible">
<el-form :model="form">

<el-form-item label="Company" :label-width="formLabelWidth">
  <el-input v-model="form.companyName" autocomplete="off"></el-input>
</el-form-item>

<el-form-item label="Supervisor" :label-width="formLabelWidth">
  <el-input v-model="form.supervisor" autocomplete="off"></el-input>
</el-form-item>

<el-form-item label="Phone" :label-width="formLabelWidth">
  <el-input v-model="form.phone" autocomplete="off"></el-input>
</el-form-item>

<el-form-item label="Address1" :label-width="formLabelWidth">
  <el-input v-model="form.address1" autocomplete="off"></el-input>
</el-form-item>

<el-form-item label="City" :label-width="formLabelWidth">
  <el-input v-model="form.city" autocomplete="off"></el-input>
</el-form-item>

<el-form-item label="Zip" :label-width="formLabelWidth">
  <el-input v-model="form.zip" autocomplete="off"></el-input>
</el-form-item>

</el-form>
<span slot="footer" class="dialog-footer">
<el-button @click="dialogFormVisible = false">Cancel</el-button>
<el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
</span>
</el-dialog>
</div>

</template>



<script>

  import { bus } from '../main'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          companyName: '',
          supervisor: '',
          phone: '',
          address1: '',
          city: '',
          zip: ''
         
        },
        formLabelWidth: '120px'
      };
    },

    created() {
      bus.$on('editEstimate', (data) => {
          console.log("in editor");
          console.log(data);
          this.form.companyName = data.companyName;
          this.form.supervisor = data.supervisor;
          this.form.phone = data.phone;
          this.form.address1 = data.address1;
          this.form.city = data.city;
          this.form.zip = data.zip;

          this.dialogFormVisible = true;

      })
    }

  };
</script>
  