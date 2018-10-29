import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'Axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    maxID: 0,
    registrations: [],
    customers: [],
    jobs: [],
    sites: [],
    estimates: [],
    currCustomerID: 0,
    currSiteID: 0,
    currJob: 0
    
  },
  getters: {
    
    customers(state) {
      return state.customers;
    }
  },
  mutations: {
    saveCustomer(state, payload) {
      const date = new Date;
      
      state.customers.push(payload);
     
    },

    saveSite(state, payload) {
      const date = new Date;
      
      state.sites.push(payload);
     
    },

    deleteCustomer(state, idx) {
      
      const currCustomer = state.customers.find(currCustomer => {
        return currCustomer.id == idx;
      });

      return new Promise((resolve, reject) => {

        var options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json' }
        }
        
        axios('http://li708-14.members.linode.com:5000/customer/delete/'+currCustomer.id, options)
        .then((response) => {
         
          state.customers.splice(state.customers.indexOf(currCustomer), 1);
          
          resolve(response.data);

        })
        .catch((error) => {
          resolve(error.message);
        });
      });



    },

    deleteSite(state, idx) {
      
      const currSite = state.sites.find(currSite => {
        return currSite.id == idx;
      });

      return new Promise((resolve, reject) => {

        var options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json' }
        }
        console.log("site id = " + idx);
        axios('http://li708-14.members.linode.com:5000/site/delete/'+currSite.id, options)
        .then((response) => {
         
          state.sites.splice(state.sites.indexOf(currSite), 1);
          
          resolve(response.data);

        })
        .catch((error) => {
          resolve(error.message);
        });
      });

    },

    saveJob(state, payload) {
      const date = new Date;
      
      state.jobs.push(payload);
     
    },

    deleteJob(state, idx) {
      
      const currJob = state.jobs.find(currJob => {
        return currJob.id == idx;
      });

      state.jobs.splice(state.jobs.indexOf(currJob), 1);

    },

    saveEstimate(state, payload) {
      const date = new Date;
      
      var newID = state.maxID + 1;
      state.maxID = newID;

      const estimate = {
        id: newID,
        structSpace:payload.structSpace,
        structLevel:payload.structLevel,
        plane:payload.plane,
        matlSize:payload.matlSize,
        matlType:payload.matlType,
        matlThickness:payload.matlThickness,
        matlQty:payload.matlQty,
        created: date.toDateString()
      };

      state.estimates.push(estimate);
     
    },

    deleteEstimate(state, idx) {
      
      const currEstimate = state.estimates.find(currEstimate => {
        return currEstimate.id == idx;
      });

      state.estimates.splice(state.estimates.indexOf(currEstimate), 1);

    },
    
    register(state, userId) {
      const date = new Date;
      const user = state.users.find(user => {
        return user.id == userId;
      });
      user.registered = true;
      const registration = {
        userId: userId,
        name: user.name,
        date: date.getMonth() + '/' + date.getDay() 
      };
      state.registrations.push(registration);
    },
    unregister(state, payload) {
      const user = state.users.find(user => {
        return user.id == payload.userId;
      });
      user.registered = false;
      const registration = state.registrations.find(registration => {
        return registration.userId == payload.userId;
      });
      state.registrations.splice(state.registrations.indexOf(registration), 1);
      
    }
  },

  
  actions: {

    createCustomer({ commit }, payload) {

      return new Promise((resolve, reject) => {
        //todo: store in db, then add to local view
        var options = {
          method:'post',
          headers: {
            'Content-Type':'application/json'
          },
          data: payload
        };

        axios('http://li708-14.members.linode.com:5000/customer/create', options)
        .then((response) => {
          
          var newCustomer = Object.assign({id:response.data.id}, payload);
          console.log(newCustomer);
          store.commit('saveCustomer', newCustomer);
          resolve(newCustomer);
        })
        .catch((error) => {
          resolve(error.message);
        });
      });
    },

    createSite({ commit }, payload) {

      return new Promise((resolve, reject) => {
        //todo: store in db, then add to local view
        var options = {
          method:'post',
          headers: {
            'Content-Type':'application/json'
          },
          data: payload
        };

        axios('http://li708-14.members.linode.com:5000/site/create', options)
        .then((response) => {
          
          var newSite = Object.assign({id:response.data.id}, payload);
          
          store.commit('saveSite', newSite);
          resolve(newSite);
        })
        .catch((error) => {
          resolve(error.message);
        });
      });
    },

    fetchCustomer({ commit }, payload) {

    },
    fetchCustomerList( { commit }, data) {
    
      return new Promise((resolve, reject) => {

        var options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json' }
        }
        
        axios('http://li708-14.members.linode.com:5000/customer/list/all', options)
        .then((response) => {
         
          store.state.customers = response.data;
          resolve(response.data);

        })
        .catch((error) => {
          resolve(error.message);
        });
      })

    },
    fetchSiteList( { commit }, data) {
    
      return new Promise((resolve, reject) => {

        var options = {
          method: 'GET',
          headers: {'Content-Type': 'application/json' }
        }
        
        axios('http://li708-14.members.linode.com:5000/site/list/all', options)
        .then((response) => {
         
          store.state.sites = response.data;
          resolve(response.data);

        })
        .catch((error) => {
          resolve(error.message);
        });
      })

    },
    addJob({ commit }, payload) {

      return new Promise((resolve, reject) => {
        //todo: store in db, then add to local view
        var options = {
          method:'post',
          headers: {
            'Content-Type':'application/json'
          },
          data: payload
        };

        axios('http://li708-14.members.linode.com:5000/job/create', options)
        .then((response) => {
          
          var newJob = Object.assign({id:response.data.id}, payload);
          
          store.commit('saveJob', newJob);
          resolve(newJob);
        })
        .catch((error) => {
          resolve(error.message);
        });
      });

    },
    addEstimate({ commit }, payload) {
      //todo: store in db, then add to local view
      commit('saveEstimate', payload);
      console.log("store is adding estimate to db");
    },
    register({ commit }, userId) {

      return new Promise((resolve, reject) => {

      setTimeout(() => {
          commit('register', userId)
          resolve()
        }, 1000)
      });
    
    }
  }
});
