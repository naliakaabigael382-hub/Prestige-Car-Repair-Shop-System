import axios from 'axios'
var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

function AdminDto(email, password, name, phone) {
	this.name = name;
	this.password = password;
	this.phone = phone;
	this.email = email;
	this.id = "";
	this.lastActive = "";
}

export default {
    name: 'editAdmin',
    data () {
      return {
          admin: "",
          error: "",
      }
    },
    methods: {
        editAdmin: function (oldEmail, name, password, phone){
            AXIOS.post('/customer/editAllCustomerCredentials/'.concat(oldEmail + "?name=" + name + "?password=" + password + "?phone=" + phone), {},
	  {})
      .then(response => {
        // JSON responses are automatically parsed.
        this.admin = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.error = e
      })
  

        }
    }
  }