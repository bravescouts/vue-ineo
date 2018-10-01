<template>
    <div id="customers">
                
        <app-customer-editor ref="editor"></app-customer-editor>
        <h3>Customers</h3>
         <el-table
      :data="tableData"
      max-height="400"
      size="mini"
      :default-sort = "{prop: 'firstName', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="40">
      </el-table-column>
       <el-table-column
        prop="companyName"
        label="Co. Name"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="firstName"
        label="First"
        sortable
        width="100">
      </el-table-column>
      <el-table-column 
        prop="lastName"
        label="Last"
        width="100">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address1"
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
        prop="zip"
        label="Zip"
        width="100">
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
      </template>
    </el-table-column>
      </el-table>
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
</template>

<script>
import CustomerEditor from './CustomerEditor.vue'
import { bus } from '../main'


export default {
  components:{
    'app-customer-editor':CustomerEditor
  },

  data() {
    return {
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
  methods: {
    saveCustomer() {
      console.log("for city =" + this.strCity);

      //dispatch calls an action which allows the async behavior
      this.$store.dispatch('addCustomer', {
        companyName:this.strCompanyName,
        firstName:this.strFirstName,
        lastName:this.strLastName,
        phone: this.strPhone,
        address1: this.strAddress1,
        city:this.strCity,
        zip: this.strZip
      });

      this.strCompanyName = "";
      this.strFirstName = "";
      this.strLastName = "";
      this.strPhone = "";
      this.strAddress1 = "";
      this.strCity = "";
      this.strZip = "";

      /*
      this.$store.commit('saveCustomer', {
        name:this.strName,
        city:this.strCity
      });
      */
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
  }
 
};
</script>

<style scoped>
#customers {
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