
import axios from 'axios'
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

function CustomerDto(email, password, name, phone, address, credit, debit) {
	this.name = name;
	this.password = password;
	this.phone = phone;
	this.email = email;
	this.address = address;
	this.creditHash = credit;
	this.debitHash = debit;
	this.appointments = "";
	this.cars = "";
	this.lastActive = "";
}

export default {
  name: "home",
  components: {DatePick},
  data () {
    return {
	  customer: "",
	  error: ""
    }
  },
  created: function () {
    var id = location.search.substring(4);
    AXIOS.get('/customer/'.concat(id))
    .then(response => {
      // JSON responses are automatically parsed.
      this.customer = response.data
    })
    .catch(e => {
      this.error = e
    })
  },

  

}
