<template>
    <div id="jobs">
        <app-job-editor ref="editor"></app-job-editor>
        <h3>Jobs</h3>
         <el-table
         size="mini"
      :data="getJobs"
      :default-sort = "{prop: 'firstName', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="40">
      </el-table-column>
       <el-table-column
        prop="cust_id"
        label="Cust ID"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="site_id"
        label="Site ID"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="160">
      </el-table-column>
      <el-table-column
        prop="supervisor_id"
        label="Supervisor"
        width="150">
      </el-table-column>
      <el-table-column
        prop="contact_name"
        label="Contact"
        width="60">
      </el-table-column>
       <el-table-column
        prop="start_date"
        label="Start"
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
      v-model="strCustomerName"
      :fetch-suggestions="querySearch"
      placeholder="Customer"
      :trigger-on-focus="false"
      @select="handleSelect">
      </el-autocomplete>
    
  </el-col>

  <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="6">
 
    <el-autocomplete
      class="inline-input"
      size="medium"
      v-model="strSiteName"
      :fetch-suggestions="querySearchSite"
      placeholder="Site"
      :trigger-on-focus="false"
      @select="handleSelectSite">
      </el-autocomplete>
    
  </el-col>

  <el-col :xs="3" :sm="4" :md="4" :lg="7" :xl="8">
   <div> 
     <el-input
    size="medium"
    placeholder="JobName"
    v-model="strJobName">
    <template slot="prepend">JobName</template>
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
<el-row>
<el-col :xs="2" :sm="3" :md="6" :lg="7" :xl="8">
    <div>
    <el-input
    size="medium"
    placeholder="Contact"
    v-model="strContactName"> 
    <template slot="prepend">Contact Name</template>
    </el-input>
    </div>
  </el-col>
   <el-date-picker
      v-model="strDate"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
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
      strJobName:"",
      strDate:"",
      strContactName:"",
      customerID:0,
      siteID:0,
      tableData: this.$store.state.jobs,
      links:[],
      jobs: [],
      sites: [],
      strCustomerName: '',
      strSiteName: '',
      timeout:  null
    };
  },
  computed: {
    getJobs() {
      return this.$store.state.jobs;
    }
  },
  methods: {
    saveJob() {
      console.log("for city =" + this.strCity);

      //dispatch calls an action which allows the async behavior
      this.$store.dispatch('addJob', {
        name: this.strJobName,
        cust_id:this.$store.state.currCustomerID,
        site_id:this.$store.state.currSiteID,
        supervisor_id:1,
        contact_name: this.strContactName,
        start_date: this.strDate,
        type: 1,
        status: 1
      });

      this.strCompanyName = "";
      this.strSupervisor = "";
      this.strAddress1 = "";
      this.strJobName = "";
      this.strCity = "";
      this.strZip = "";
      this.strContactName = "";
     
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
      router.push('/estimates/'+row.id);
    },
    querySearchSite(queryString, cb) {
        var sites = this.sites;
        var results = queryString ? sites.filter(this.createFilter(queryString)) : sites;
        // call callback function to return suggestions
        cb(results);
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
     
      handleSelectSite(item) {
        this.siteID = item.id;
      },
      handleSelect(item) {
        this.customerID = item.id;
      }
  },
   mounted() {
    
      const selectedCustomer = this.$store.state.customers.find( curr => {
        return curr.id == this.$store.state.currCustomerID;
      });
      this.strCustomerName = selectedCustomer.customer_name;


      const selectedSite = this.$store.state.sites.find( curr => {
        return curr.id == this.$store.state.currSiteID;
      });
      this.strSiteName = selectedSite.site_name;


     this.$store.dispatch('fetchJobList', null)
          .then((r) => {
            
            this.jobs = r;
      });


      this.$store.dispatch('fetchCustomerList', null)
          .then((r) => {
            
            this.links = r;
      });


      this.$store.dispatch('fetchSiteList', null)
          .then((r) => {
            
            this.sites = r;
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