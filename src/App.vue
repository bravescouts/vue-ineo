<template>
  <div id="app">
 
    <el-container>
      <el-aside width="220px" >
        <el-menu default-active="1" class="el-menu-vertical-demo" :router="true" >
            <el-menu-item v-on:click="$router.push('/0')" index="0" router=router>
              <span slot="title"><h1>Home</h1></span>
            </el-menu-item>

            <el-menu-item v-on:click="$router.push('/1')" index="1" router=router>
              <span slot="title"><h1>Customers</h1></span>
             </el-menu-item>

            <el-menu-item v-on:click="$router.push('/2')" index="2" router=router>
                <span slot="title"><h1>Jobs</h1></span>
            </el-menu-item>

            <el-menu-item v-on:click="$router.push('/3')" index="3" router=router>
                <span slot="title"><h1>Estimates</h1></span>
            </el-menu-item>

            <el-menu-item v-on:click="$router.push('/4')" index="4" router=router>
                <span slot="title"><h1>Notes</h1></span>
            </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main> <router-view></router-view> </el-main>
    </el-container>
  
  </div>
</template>

<script>
  import Registration from './components/Registration.vue';
  import Registrations from './components/Registrations.vue';
  import Customers from './components/Customers.vue';
 
  import { router } from './main'

export default {
     components: {
        appRegistration: Registration,
        appRegistrations: Registrations,
        appCustomers: Customers
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

#app {
   
  
  font-family: Helvetica, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
