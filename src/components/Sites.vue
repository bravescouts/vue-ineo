<template>
    <div id="sites">
  
<el-row :gutter="20">
  <el-col :span="6">
    <div class="grid-content bg-purple">
     <autocomplete placeholder="Name Search" :source="[{id:1,name:'Acme'},{id:2,name:'JJ'}]">
     </autocomplete>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="grid-content bg-purple">
    <el-tag>Sites</el-tag>
    </div>
  </el-col>
</el-row>
       
         <el-table
      :data="getSites"
      max-height="300"
      size="mini"
      :default-sort = "{prop: 'firstName', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="40">
      </el-table-column>
       <el-table-column
        prop="site_name"
        label="Site Name"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="contact_name"
        label="Contact"
        sortable
        width="100">
      </el-table-column>
     <el-table-column
        prop="phone"
        label="Phone"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address_1"
        label="Address"
        width="100">
      </el-table-column>
      <el-table-column
      prop="city"
      label="City"
      width="100"
      :filters="[{ text: 'College Station', value: 'College Station' }, { text: 'Bryan', value: 'Bryan' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.city === 'College Station' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.city}}</el-tag>
      </template>

      </el-table-column>
      <el-table-column
        prop="postal_code"
        label="Zip"
        width="100">
      </el-table-column>
      <el-table-column
      label="Operations">
      <template slot-scope="scope">
        <el-button
          type="primary" icon="el-icon-edit" circle
          @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button
          type="danger" icon="el-icon-delete" circle
          @click="handleDelete(scope.$index, scope.row)"></el-button>
        <el-button
         type="info" icon="el-icon-setting" circle
          @click="$router.push('/2')">
        </el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-collapse v-model="activeName" accordion>
  <el-collapse-item title="Search" name="1">
  <div>
Search
  </div>
  </el-collapse-item>
  <el-collapse-item title="NEW" name="2">
    <div>

      <el-autocomplete
      class="inline-input"
      size="medium"
      v-model="strCompanyName"
      :fetch-suggestions="querySearch"
      placeholder="Customer"
      :trigger-on-focus="false"
      @select="handleSelect">
      </el-autocomplete>


      <el-row :gutter="10" class="row-bg">
        <el-col :xs="4" :sm="6" :md="7" :lg="8" :xl="9">
          <div> 
            <el-input
            size="medium"
            placeholder="Site Name"
            v-model="strSiteName">
            <template slot="prepend">Site</template>
            </el-input>
          </div>
        </el-col>
      
       <el-col :xs="4" :sm="6" :md="7" :lg="8" :xl="9">
       <div> 
         <el-input
        size="medium"
        placeholder="Contact Name"
        v-model="strContactName">
        <template slot="prepend">Contact Name</template>
        </el-input>
      </div>
      </el-col>
      
      <el-col :xs="2" :sm="3" :md="4" :lg="6" :xl="7">
        <div>
        <el-input
        size="medium"
        placeholder="Phone"
        v-model="strPhone"> 
        <template slot="prepend">Phone</template>
        </el-input>
        </div>
      </el-col>
      
      </el-row>

      <el-row :gutter="10" class="row-bg">
      <el-col :xs="2" :sm="3" :md="4" :lg="8" :xl="9">
       <div> 
         <el-input
        size="medium"
        placeholder="Address1"
        v-model="strAddress1">
        <template slot="prepend">Address 1</template>
        </el-input>
      </div>
      </el-col>
      <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="6">
        <div>
        <el-input
        size="medium"
        placeholder="City"
        v-model="strCity"> 
        <template slot="prepend">City</template>
        </el-input>
        </div>
      </el-col>
        <el-col :xs="2" :sm="3" :md="3" :lg="4" :xl="4">
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


    <el-button type="primary" @click="saveSite()">Add</el-button>

    </div>
  </el-collapse-item>
  
</el-collapse>
    
    </div>
</template>

<script>
import { bus } from '../main'
import Autocomplete from 'vuejs-auto-complete'

export default {
  components:{
    Autocomplete
  },

  data() {
    return {
      strCompanyName: null,
      links: [],
      activeName: '1',
      strSiteName: "",
      strContactName: "",
      strLastName: "",
      strPhone: "",
      strAddress1: "",
      strCity: "",
      strZip:"",
      customerID: 0,
      tableData: this.$store.state.sites
      
    };
  },
  computed: {
    getSites() {
      return this.$store.state.sites;
    }
  },
  methods: {
    saveSite() {
      console.log("for city =" + this.strCity);

      //dispatch calls an action which allows the async behavior
      this.$store.dispatch('createSite', {
        
        site_name: this.strSiteName,
        contact_name:this.strContactName,
        phone:this.strPhone,
        address_1:this.strAddress1,
        address_2:null,
        city:this.strCity,
        postal_code:this.strZip,
        province:1,
        country:1,
        county:"Brazos",
        latitude: "1",
        longitude: "2",
        cust_id: 60,
        type: 1
        });

      this.strSiteName = "";
      this.strContactName = "";
      this.strPhone = "";
      this.strAddress1 = "";
      this.strCity = "";
      this.strZip = "";

    },
    handleEdit(index, row) {
      var r = row;
      bus.$emit('editCustomer', r);
    },
    handleDelete(index, row) {
      this.$store.commit("deleteSite", row.id);
      this.$message('Site Deleted.');
    },
    filterTag(value, row) {
      return row.city === value;
    },
    filterHandler(value, row, column) {
      const property = column['city'];
      return row[property] === value;
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
    
      this.$store.dispatch('fetchSiteList', null)
          .then((r) => {
            
            this.cList = r;
      });
  
      this.$store.dispatch('fetchCustomerList', null)
          .then((r) => {
            
            this.links = r;
      });

  },
 
};
</script>

<style scoped>
#customers {
  box-shadow: 1px 1px 2px 1px #ccc;
  margin: 10px;
  padding: 10px;
  display: inline-block;
  width: 950px;
  vertical-align: top;
}

.row h4 {
  display: inline-block;
  width: 70%;
  text-align: left;
  margin: 0 0 10px 0;
}
</style>