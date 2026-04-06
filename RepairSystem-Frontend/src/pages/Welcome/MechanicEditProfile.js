import axios from 'axios';
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

export default {
    components: {DatePick},
    computed: {
        userId(){
            return this.$route.params.userId
        }
    },   
    data () {
    return {
		modalShow: false,
	  	mechanic: "",
		error: "",
		address: "",
      	password:"",
     	email:"",
	    phone:"",
		name:"",
		servicesList: [],
		capabilities:"",
		
		editAddress: "",
      	editPassword: " ",
     	editPhone:" ",

        nameState: null,
        emailState:null,
        phoneState:null,
        passwordState:null,
        addressState:null,
    }
    },
    created: function () {
        var id = this.$route.params.userId
        AXIOS.get('/mechanic/'.concat(id))
        .then(response => {
        // JSON responses are automatically parsed.
		this.mechanic = response.data
		this.address = response.data.address
        this.password = response.data.password
        this.email = response.data.email
        this.phone = response.data.phone
		this.name = response.data.name
		this.servicesList = response.data.services	

		  for(var i = 0; i < this.servicesList.length -1 ; i++)
		  {
			  this.capabilities = this.capabilities.concat(this.servicesList[i].serviceType+ ", ")  
		  }
		  this.capabilities = this.capabilities.concat(this.servicesList[this.servicesList.length-1].serviceType);
    })
    .catch(e => {
        this.error = e
        console.log(e)
    })
	},
	
	methods: {
		
	  editMechanics: function(email, name, password, phone)
      {
        console.log(email);
        console.log("testing edit");
        AXIOS.put('/mechanic/'.concat(email+"?name="+name+"&password="+password+"&phone="+phone), {}, {})
        .then(response=>{
		  this.mechanic = response.data;
		  location.reload;
        }).catch(e=> {
          this.error =e
        })
      }, 
		/** To AutoComplete the Edit Profile Modal */
        fillCredentials : function()
        {
          this.editName = this.name;
          this.editEmail = this.email;
          this.editPhone = this.phone;
		  this.editPassword = this.password;
		     
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