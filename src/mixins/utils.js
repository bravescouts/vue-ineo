
const date = new Date;

export default {
  data: function(){
      return {
        msg: 'utils'
      }
  },
  methods:{
      getCreatedDate() {
        return date.toDateString();
      }
  }
}
