import axios from 'axios';
import DatePick from 'vue-date-pick';

var config = require('../../../config')
var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

function AdminstrativeAssistantDto(aName, aPassword, aPhone, aEmail){
	this.name = aName;
	this.password= aPassword;
	this.phone= aPhone;
	this.email = aEmail;
	this.id =""
}
export default {
    components: {DatePick},
    data () {
    return {
      modalShow: false,
	    admin: "",
      error: "",
      address: "",
      password:"",
      email:"",
	    phone:"",
	    name:"",

      editAdmin: "",
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
        AXIOS.get('/admin/'.concat(id))
        .then(response => {
        // JSON responses are automatically parsed.
        this.admin = response.data
        this.address = response.data.address
        this.password = response.data.password
        this.email = response.data.email
        this.phone = response.data.phone
        this.name = response.data.name
    })
    .catch(e => {
        this.error = e
        console.log(e)
    })
    },

    methods: {

      editAdmins: function(email, name, password, phone)
      {
        console.log(email);
        console.log("testing edit");
        AXIOS.put('/admin/'.concat(email+"?name="+name+"&password="+password+"&phone="+phone), {}, {})
        .then(response=>{
          this.admin = response.data;
          location.reload();
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