<template>
    <div id="esimates">
        {{ jobID }}
        <app-estimate-editor ref="editor"></app-estimate-editor>
        <h3>Estimates</h3>
         <el-table
      size="mini"
      :data="getEstimates"
      :default-sort = "{prop: 'firstName', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="40">
      </el-table-column>
       <el-table-column
        prop="area"
        label="Area"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="job_id"
        label="Job"
        sortable
        width="60">
      </el-table-column>
        <el-table-column
        prop="qty"
        label="Qty"
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
      </template>
    </el-table-column>
      </el-table>
     
    
    
<el-row :gutter="10" class="row-bg">

  <el-col :xs="4" :sm="6" :md="7" :lg="8" :xl="9">
   <div> 
     <el-input
    size="medium"
    placeholder="Spatial Name"
    v-model="strSpace">
    <template slot="prepend">Area</template>
    </el-input>
  </div>
  </el-col>
  <el-col :xs="4" :sm="6" :md="7" :lg="8" :xl="9">
    <div>
    <el-select size="medium" v-model="strLevel" placeholder="Level">
      <template slot="prepend">Level</template>
    <el-option
       v-for="item in levelOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
   </el-select>
    </div>
  </el-col>
 <el-col :xs="4" :sm="6" :md="7" :lg="8" :xl="9">
    <div>
    <el-select size="medium" v-model="strPlane" placeholder="Select Plane">
    <el-option
       v-for="item in planeOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
   
  </el-select>
    </div>
  </el-col>
 
  </el-row>

  <el-row :gutter="5" class="row-bg">
 
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
     
   <el-select v-model="strSpecs" size="large" multiple placeholder="Specs">
    <el-option-group
      v-for="group in specOptions"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key=item.label
        :label=item.label
        :value=item.key>
      </el-option>
    </el-option-group>
  </el-select>
    
  </el-col>

  <el-col :xs="3" :sm="4" :md="5" :lg="6" :xl="7">
    <div>
   <el-input-number v-model="strQty" :min="1" :max="200"></el-input-number>
    </div>
  </el-col>

  </el-row>    
     <p></p>
     <el-button type="primary" @click="saveEstimate()">Add</el-button>
     
     <p></p>
    <app-estimate-summary></app-estimate-summary>
  

    </div>
</template>

<script>
import EstimateEditor from './EstimateEditor.vue'
import EstimateSummary from './EstimateSummary.vue'
import { bus } from '../main'
import { mapGetters } from 'vuex';

export default {
  components:{
    'app-estimate-editor':EstimateEditor,
    'app-estimate-summary':EstimateSummary
  },
  props: ['jobID'],
  data() {
    return {
      estimates:[],
       tags: [
          { name: 'Tag 1', type: '' },
          { name: 'Tag 2', type: 'success' },
          { name: 'Tag 3', type: 'info' },
          { name: 'Tag 4', type: 'warning' }
        ],
      strSpace: "",
      tableData: this.$store.state.estimates,
      links: [],
      strCompanyName: '',
      timeout:  null,
      strPlane: '',
      sheetSpecs: null,
       planeOptions: [{
          value: 'WALL',
          label: 'WALL'
        }, {
          value: 'CEILING',
          label: 'CEILING'
        }],
        strLevel: '',
       levelOptions: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        },{
          value: '3',
          label: '3'
        }],
        strQty: 0,
        strSpecs: '',
        specOptions: [
          {
          label: 'Sheet Size',
          options: [{
            key: 1,
            attr: 'matl_size',
            value: '8',
            label: '8 Ft'
          }, {
            key: 2,
            attr: 'matl_size',
            value: '9',
            label: '9 Ft'
          },{
            key: 3,
            attr: 'matl_size',
            value: '10',
            label: '10 Ft'
          },{
            key: 4,
            attr: 'matl_size',
            value: '11',
            label: '11 Ft'
          },{
            key: 5,
            attr: 'matl_size',
            value: '12',
            label: '12 Ft'
          }] },
          {
      label: 'Type',
      options: [
      {
        key: '51',
        attr: 'matl_type',
        value: 'type:SR',
        label: 'Sheetrock'
      }, {
        key: '52',
        attr: 'matl_type',
        value: 'type:CB',
        label: 'Cement Board'
      },{
        key: '53',
        attr: 'matl_type',
        value: 'type:WR',
        label: 'Water Resistant'
      }]
      },
      {
      label: 'Thickness',
      options: [
      {
        key: '63',
        attr: 'matl_thickness',
        value: 'thick:.25',
        label: '1/4'
      },{
        key: '64',
        attr: 'matl_thickness',
        value: 'thick:.5',
        label: '1/2'
      },{
        key: '65',
        attr: 'matl_thickness',
        value: 'thick:.625',
        label: '5/8'
      }]}
        ]
    };
  },
  computed: {
    getEstimates() {
      return this.$store.state.estimates;
    }
  },
  methods: {
    saveEstimate() {
     
     var vSheetSpecSize;
     var vSheetSpecType;
     var vSheetSpecThickness;

     for (var i = 0; i < this.specOptions.length; i++) {
        for(var k=0; k < this.specOptions[i].options.length; k++) {
           // console.log("key="+this.specOptions[i].options[k].key);
           const cSheetSpec = this.specOptions[i].options.find(spec => {
            return spec.key == this.strSpecs[k];
          });

          if(cSheetSpec != null) {

            if(cSheetSpec.attr == 'matl_size')
              vSheetSpecSize = cSheetSpec;
            if(cSheetSpec.attr == 'matl_type')
              vSheetSpecType = cSheetSpec;
            if(cSheetSpec.attr == 'matl_thickness')
              vSheetSpecThickness = cSheetSpec;


          }
        }
     }
    console.log("attr:");  
    console.log(vSheetSpecSize);
    console.log(vSheetSpecType);
    console.log(vSheetSpecThickness);
     
      //dispatch calls an action which allows the async behavior
      this.$store.dispatch('addEstimate', {
        job_id: 1,
        area: this.strSpace,
        area_level: 1,
        application_type: 1,
        matl_type: 1,
        matl_size: 2, 
        matl_dim: 1, 
        matl_attr1: null, 
        matl_attr2: null, 
        matl_attr3: null,
        matl_attr4: null,
        matl_attr5: null,
        qty: this.strQty
      });

     
    },
    handleEdit(index, row) {
      var r = row;
      bus.$emit('editEstimate', r);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$store.commit("deleteEstimate", row.id);
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
      loadAll() {
        return this.$store.state.estimates;
      },
      handleSelect(item) {
        this.strCompanyName = item.companyName;
      }
  },
  mounted() {
      this.links = this.loadAll();
       this.$store.dispatch('fetchEstimateList', null)
          .then((r) => {
            
            this.estimates = r;
      });
  }
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

#estimates {
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

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 380px;
  }


</style>