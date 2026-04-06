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
    data () {
      return {
          name: '',
          password: '',
          phone: '',
          email: '',
          address: '',
          creditHash: '',
          debitHash: '',
          customer: "",
          customers: [],
          error: "",
      }
    },
    created: function () {
      // Initializing persons from backend
      AXIOS.get('/customer')
      .then(response => {
        // JSON responses are automatically parsed.
        this.customers = response.data
      })
      .catch(e => {
        this.error = e
      })
      },
    methods: {
      editCustomer : function(email, name, password, phone, address, creditHash, debitHash)
        {
          AXIOS.put('/customer/editAllCustomerCredentials/'.concat(email),{},
          {
            params:{
              name: name,
              email: email,
              password: password,
              phone: phone,
              address: address,
              creditHash: creditHash,
              debitHash: debitHash,
            }
          }).then(response => {
            this.response = response.data;
            location.reload();
          }).catch(e => {
            this.error = e;
          })
        },
    }
  }