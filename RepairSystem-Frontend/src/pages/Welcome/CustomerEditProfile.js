import axios from 'axios'
import DatePick from 'vue-date-pick';
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
	this.credit = credit;
	this.debit = debit;
	this.appointments = "";
	this.id = "";
	this.cars = "";
	this.lastActive = "";
}

export default {
    components: {DatePick},
    data () {
    return {
	  name: '',
		password: '',
		phone: '',
		email: '',
		address: '',
		credit: '',
		debit: '',
		customer: "",
		customers: [],
		error: "",

		nameState: null,
        emailState:null,
        phoneState:null,
        passwordState:null,
        addressState:null,
        creditState: null,
        debitState : null,
		  
		editName : "",
        editEmail : " ",
        editPhone : " ",
        editPassword : " ", 
        editAddress: " ",
        editCredit: " ",
		editDebit:" ",
		modalShow: false,
}
    },
    created: function () {
        var id = this.$route.params.userId
        AXIOS.get('/customer/'.concat(id))
        .then(response => {
        // JSON responses are automatically parsed.
		this.customer = response.data
		this.name = response.data.name
		this.email = response.data.email
		this.credit = response.data.creditHash
		this.debit = response.data.debitHash
		this.address = response.data.address
		this.phone = response.data.phone
		this.password = response.data.password
    })
    .catch(e => {
        this.error = e
        console.log(e)
    })
    },
        methods: {
			editCustomers : function(newName, newPassword, newPhone, newCredit, newDebit, newAddress)
			{
				AXIOS.put('/customer/'.concat(this.customer.email + "?newName=" + newName + "&newPassword=" + newPassword + "&newPhone=" + newPhone + "&newCredit=" + newCredit + "&newDebit=" + newDebit + "&newAddress=" + newAddress), {}, 
				{})
				.then(response => {
					this.customer = response.data;
					this.name = response.data.name
					this.email = response.data.email
					this.credit = response.data.creditHash
					this.debit = response.data.debitHash
					this.address = response.data.address
					this.phone = response.data.phone
					this.password = response.data.password
				}).catch(e => {
					this.error = e;
				})
			},

			fillCredentials: function()
			{
				this.editName = this.name;
				this.editEmail = this.email;
				this.editPhone = this.phone;
				this.editPassword = this.password;
				this.editAddress = this.address;
				this.editDebit = this.debit;
				this.editCredit = this.credit;

			}, 

			handleSubmit() {
				if (!this.checkFormValidity()) {
					return
				}
				
				this.$nextTick(() => {
					this.$bvModal.hide('modal-prevent-closing')
				})
			}, 

			resetModal() {
				this.name = ''
				this.email=''
				this.phone=''
				this.password=''
				this.address=''
				this.mechanic=""
				this.capacities=""
				this.nameState = null
				this.emailState =null
				this.phoneState = null
				this.passwordState = null
				this.addressState =null
				this.capabilitiesState = null
			},
    }
}