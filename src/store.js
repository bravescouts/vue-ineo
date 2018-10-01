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
    estimates: [],
    users: [
        {id: 1, value: 'Max', name: 'Max', registered: false},
        {id: 2, value: 'Anna', name: 'Anna', registered: false},
        {id: 3, value: 'Chris', name: 'Chris', registered: false},
        {id: 4, value: 'Sven', name: 'Sven', registered: false}
    ]
  },
  getters: {
    unregisteredUsers(state) {
      return state.users.filter(user => {
        return !user.registered;
      });
    },
    registrations(state) {
      return state.registrations;
    },
    totalRegistrations(state) {
      return state.registrations.length;
    },
    customers(state) {
      return state.customers;
    }
  },
  mutations: {
    saveCustomer(state, payload) {
      const date = new Date;
      
      var newID = state.maxID + 1;
      state.maxID = newID;

      const customer = {
        id: newID,
        value: payload.companyName,
        companyName: payload.companyName,
        title: null,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        address1: payload.address1,
        address2: null,
        city: payload.city,
        state: null,
        zip: payload.zip,
        created: date.toDateString()
      };

      state.customers.push(customer);
     
    },

    deleteCustomer(state, idx) {
      
      const currCustomer = state.customers.find(currCustomer => {
        return currCustomer.id == idx;
      });

      state.customers.splice(state.customers.indexOf(currCustomer), 1);

    },

    saveJob(state, payload) {
      const date = new Date;
      
      var newID = state.maxID + 1;
      state.maxID = newID;

      const job = {
        id: newID,
        value: payload.companyName,
        companyName: payload.companyName,
        title: null,
        supervisor: payload.supervisor,
        address1: payload.address1,
        address2: null,
        city: payload.city,
        state: null,
        zip: payload.zip,
        created: date.toDateString()
      };

      state.jobs.push(job);
     
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

    addCustomer({ commit }, payload) {

     
      //todo: store in db, then add to local view

      commit('saveCustomer', payload);
      console.log("store is adding customer to db");

     
    },
    addJob({ commit }, payload) {

     
      //todo: store in db, then add to local view

      commit('saveJob', payload);
      console.log("store is adding job to db");

     
    },
    addEstimate({ commit }, payload) {
      //todo: store in db, then add to local view
      commit('saveEstimate', payload);
      console.log("store is adding estimate to db");
    },
    register({ commit }, userId) {

      return new Promise((resolve, reject) => {

    /*
        axios({
          method:'get',
          auth: {
            username: '',
            password: ''
          },
          headers: {
            'OSvC-CREST-Application-Context':'test'
          },
          url:'https://westerndigital--tst2.custhelp.com/services/rest/connect/v1.4/RMAs.RMA/2901',
          responseType:'application/json'
        })
          .then(function(response) {
            console.log("done with get "+ response.data.lookupName);
        });
    */    
      

      setTimeout(() => {
          commit('register', userId)
          resolve()
        }, 1000)
      });
    
    }
  }
});
