import axios from 'axios'
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
	this.id = "";
	this.cars = "";
	this.lastActive = "";
}

export default {
  name: "SignUp",
  data () {
    return {
	  customer: "",
	  error: ""
    }
  },
  methods: {
    createCustomer: function (email, password, name, phone, address, credit, debit) {
	  AXIOS.post('/customer/'.concat(name), {}, 
	  {params: {
		password: password,
		phone: phone,
		email: email,
		credit: credit,
		debit: debit,
		address: address}})
		.then(response => {
      	// JSON responses are automatically parsed.
		  this.customer = response.data;
		  location.replace(frontendUrl+"/customerDashboard/Overview/"+this.customer.id);
    	})
    	.catch(e => {
      		this.error = e
		})
		}
  }
}
