<template>
    <div id="customers">
               
        <app-customer-editor ref="editor"></app-customer-editor>

<el-row :gutter="20">
  <el-col :span="6">
    <div class="grid-content bg-purple">
     <autocomplete placeholder="Name Search" :source="[{id:1,name:'Acme'},{id:2,name:'JJ'}]">
     </autocomplete>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="grid-content bg-purple">
    <el-tag>Customers</el-tag>
    </div>
  </el-col>
</el-row>
       
         <el-table
      :data="getCustomers"
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
        prop="customer_name"
        label="Cust Name"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="first_name"
        label="First"
        sortable
        width="100">
      </el-table-column>
      <el-table-column 
        prop="last_name"
        label="Last"
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
          ></el-button>
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
    
        <el-row :gutter="10" class="row-bg">
      <el-col :xs="4" :sm="6" :md="7" :lg="8" :xl="9">
       <div> 
         <el-input
        size="medium"
        placeholder="Company Name"
        v-model="strCompanyName">
        <template slot="prepend">Company</template>
        </el-input>
      </div>
      </el-col>
     
      </el-row>

      <el-row :gutter="10" class="row-bg">
      
      <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="5">
       <div> 
         <el-input
        size="medium"
        placeholder="First Name"
        v-model="strFirstName">
        <template slot="prepend">First</template>
        </el-input>
      </div>
      </el-col>

      <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="5">
       <div> 
         <el-input
        size="medium"
        placeholder="Last Name"
        v-model="strLastName">
        <template slot="prepend">Last</template>
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
         <p></p>
         <el-button type="primary" @click="saveCustomer()">Add</el-button>

    </div>
  </el-collapse-item>
  
</el-collapse>
    
    </div>
</template>

<script>
import CustomerEditor from './CustomerEditor.vue'
import { bus } from '../main'
import Autocomplete from 'vuejs-auto-complete'

export default {
  components:{
    'app-customer-editor':CustomerEditor,
    Autocomplete
  },

  data() {
    return {
      activeName: '1',
      strCompanyName: "",
      strFirstName: "",
      strLastName: "",
      strPhone: "",
      strAddress1: "",
      strCity: "",
      strZip:"",
      tableData: this.$store.state.customers
      
    };
  },
  computed: {
    getCustomers() {
      return this.$store.state.customers;
    }
  },
  methods: {
    saveCustomer() {
      console.log("for city =" + this.strCity);

      //dispatch calls an action which allows the async behavior
      this.$store.dispatch('createCustomer', {
        
        customer_name: this.strCompanyName,
        first_name:this.strFirstName,
        last_name:this.strLastName,
        phone:this.strPhone,
        address_1:this.strAddress1,
        address_2:null,
        city:this.strCity,
        postal_code:this.strZip,
        province:1,
        country:1,
        county:"Brazos"
        });

      this.strCompanyName = "";
      this.strFirstName = "";
      this.strLastName = "";
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
      console.log(index, row);
      this.$store.commit("deleteCustomer", row.id);
    },
    filterTag(value, row) {
      return row.city === value;
    },
    filterHandler(value, row, column) {
      const property = column['city'];
      return row[property] === value;
    }
  },
   mounted() {
    
      this.$store.dispatch('fetchCustomerList', null)
          .then((r) => {
            
            this.cList = r;
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