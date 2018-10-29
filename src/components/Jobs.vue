<template>
    <div id="jobs">
        <app-job-editor ref="editor"></app-job-editor>
        <h3>Jobs</h3>
         <el-table
         size="mini"
      :data="tableData"
      :default-sort = "{prop: 'firstName', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="40">
      </el-table-column>
       <el-table-column
        prop="companyName"
        label="Company"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="supervisor"
        label="Supervisor"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="address1"
        label="Address"
        width="160">
      </el-table-column>
      <el-table-column
        prop="city"
        label="City"
        width="150">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="Zip"
        width="60">
      </el-table-column>
      <el-table-column
      label="Operations">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        <el-button
          size="mini"
          @click="handleEstimates(scope.$index, scope.row)">Estimates</el-button>
      </template>
    </el-table-column>
      </el-table>
     
       <el-row :gutter="5" class="row-bg">
<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
      <span class="demo-input-label" size="small">Customer</span>
</el-col>

<el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="6">
 
    <el-autocomplete
      class="inline-input"
      size="medium"
      v-model="strCompanyName"
      :fetch-suggestions="querySearch"
      placeholder="Customer"
      :trigger-on-focus="false"
      @select="handleSelect">
      </el-autocomplete>
    
  </el-col>

  <el-col :xs="3" :sm="4" :md="4" :lg="7" :xl="8">
   <div> 
     <el-input
    size="medium"
    placeholder="Supervisor"
    v-model="strSupervisor">
    <template slot="prepend">Supervisor</template>
    </el-input>
  </div>
  </el-col>
 
  </el-row>

  <el-row :gutter="5" class="row-bg">
  <el-col :xs="2" :sm="3" :md="6" :lg="7" :xl="8">
   <div> 
     <el-input
    size="medium"
    placeholder="Address1"
    v-model="strAddress1">
    <template slot="prepend">Address</template>
    </el-input>
  </div>
  </el-col>
  <el-col :xs="2" :sm="3" :md="6" :lg="7" :xl="8">
    <div>
    <el-input
    size="medium"
    placeholder="City"
    v-model="strCity"> 
    <template slot="prepend">City</template>
    </el-input>
    </div>
  </el-col>
  <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="5">
    <div>
    <el-input
    size="medium"
    placeholder="Zipcode"
    v-model="strZip"> 
    <template slot="prepend">Zip</template>
    </el-input>
    </div>
  </el-col>
  </el-row>   

     <p></p>
     <el-button type="primary" @click="saveJob()">Add</el-button>

    
    </div>
</template>

<script>
import JobEditor from './JobEditor.vue'
import { bus } from '../main'
import { mapGetters } from 'vuex';
import { router } from '../main'

export default {
  components:{
    'app-job-editor':JobEditor
  },
  
  data() {
    return {
      strSupervisor: "",
      strAddress1: "",
      strCity: "",
      strZip:"",
      customerID:0,
      tableData: this.$store.state.jobs,
      links: [],
      strCompanyName: '',
      timeout:  null
    };
  },
  methods: {
    saveJob() {
      console.log("for city =" + this.strCity);

      //dispatch calls an action which allows the async behavior
      this.$store.dispatch('addJob', {
        companyName:this.strCompanyName,
        supervisor:this.strSupervisor,
        address1: this.strAddress1,
        city:this.strCity,
        zip: this.strZip
      });

      this.strCompanyName = "";
      this.strSupervisor = "";
      this.strAddress1 = "";
      this.strCity = "";
      this.strZip = "";
     
    },
    handleEdit(index, row) {
      var r = row;
      bus.$emit('editJob', r);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$store.commit("deleteJob", row.id);
    },
    handleEstimates(index, row) {
      router.push('/estimates/'+row.address1);
    },
    querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
     
      handleSelect(item) {
        this.customerID = item.id;
      }
  },
   mounted() {
    
      this.$store.dispatch('fetchCustomerList', null)
          .then((r) => {
            
            this.links = r;
      });
  

  },
};
</script>

<style scoped>
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

#jobs {
  box-shadow: 1px 1px 2px 1px #ccc;
  margin: 20px;
  padding: 20px;
  display: inline-block;
  width: 1000px;
  vertical-align: top;
}

.row h4 {
  display: inline-block;
  width: 70%;
  text-align: left;
  margin: 0 0 10px 0;
}



</style>