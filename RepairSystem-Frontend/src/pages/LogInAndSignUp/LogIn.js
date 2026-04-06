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
  name: "LogIn",
  data () {
    return {
    customer: "",
    mechanic: "",
    admin: "",
	  error: ""
    }
  },
  methods: {
    logIn: function (email, password) {
	  AXIOS.get('/customer/login/'.concat(email + "?password=" + password), {}, 
	  {})
		.then(response => {
      	// JSON responses are automatically parsed.
      this.customer = response.data;
      if(this.customer == ""){

        AXIOS.get('/mechanic/login/'.concat(email + "?password=" + password), {}, 
	      {})
		    .then(response => {
      	    // JSON responses are automatically parsed.
          this.mechanic = response.data;
          if(this.mechanic == ""){

            AXIOS.get('/admin/login/'.concat(email + "?password=" + password), {}, 
	          {})
		        .then(response => {
      	        // JSON responses are automatically parsed.
              this.admin = response.data;
              if(this.admin == ""){
                this.error = "cannot find person with given credentials"
              } else {
                location.replace(frontendUrl+"/adminDashboard/Overview/"+this.admin.id);
              }
    	        })
    	        .catch(e => {
      		      this.error = e
            })
            
          } else {
            location.replace(frontendUrl+"/mechanicDashboard/Overview/"+this.mechanic.id);
          }
    	    })
    	    .catch(e => {
      		  this.error = e
        })
        
      } else {
        location.replace(frontendUrl+"/customerDashboard/Overview/"+this.customer.id);
      }
    	})
    	.catch(e => {
      		this.error = e
		})
		}
  }
}

