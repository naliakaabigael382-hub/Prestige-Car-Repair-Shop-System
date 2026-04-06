import axios from 'axios'
import Multiselect from 'vue-multiselect'
var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})


 /**For edit profile  */


function CustomerDto(name, password, phone, email, credit, debit, address){
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.email = email;
    this.credit = credit;
    this.debit = debit;
    this.address= address;
    this.lastDate= "";
    this.id ="";
}
    export default {

     components: {
            Multiselect
      },

      data() {
      return {
        modalShow:false,
        modalCar:false,
        modalApp:false,
        name: '',
        email:'',
        phone:'',
        password:'',
        address:'',
        credit:'',
        debit:'',
        customer:"",
        lastDate:"",
        customers: [],
        options: [],
        carNames: [],
        mechNames: [],
        serviceNames: [],
        appointment: [],
       
        nameState: null,
        emailState:null,
        phoneState:null,
        passwordState:null,
        addressState:null,
        creditState: null,
        debitState : null,
       
        error: "",

        editName : "",
        editEmail : " ",
        editPhone : " ",
        editPassword : " ", 
        editResidence: " ",
        editCredit: " ",
        editDebit:" ",

        typeOfCar: "",
        winterTires: "",
        numOfKm: "",

        customerId: "",
        startTime: "",
        endTime: "",
        specificCar: "",
        specificMech: "",
        specificService: "",
        timeslot: ""
      }
    },


    created: function () {
    // Initializing customers from backend
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

        /**
         * Creating a customer and posting it in the backend 
         */
        createCustomer: function (name,password,phone,email,credit, debit,address,){
           console.log(credit);
          AXIOS.post('/customer/'.concat(name), {},
            {  
                params:{
                  phone: phone,
                  password: password,
                  email: email,
                  credit: credit,
                  debit: debit,
                  address: address,
                }
            }).then(response => {
                 
              this.customers.push(response.data);
            })
            .catch(e => {
                    this.error = e
                })

            },
            
        
        editCustomer : function(email, name, password, phone, credit, debit, address)
        {
          console.log(email);
          console.log(name);
          console.log(password);
          console.log(phone);
          console.log(credit);
          console.log(debit);
          console.log(address);
          AXIOS.put('/customer/'.concat(email+"?newName="+name+"&newPassword="+password+"&newPhone="+phone+"&newCredit="+credit+"&newDebit="+debit+"&newAddress="+address),{},{})
          .then(response => {
            for(var i = 0; i < this.customers.length; i++){
              if(this.customers[i].id === response.data.id){
                this.customers[i] = response.data
                this.customers.push(response.data)
                this.customers.pop(response.data)
              }
            }
            this.customer = response.data;
          }).catch(e => {
            this.error = e;
          })
        },

        /** To AutoComplete the Edit Profile Modal */
        fillCredentials : function(row)
        {
            
          this.editName = row.name;
          this.editEmail = row.email;
          this.editPhone = row.phone;
          this.editPassword = row.password;
          this.editResidence = row.address;
          AXIOS.get('/customer/'.concat(row.id), {}, {})
          .then(response => {
            this.customer = response.data;
            this.editCredit = this.customer.creditHash;
            console.log(this.customer.debitHash);
            this.editDebit =this.customer.debitHash;
          }).
          catch(e=>{
            this.error =e;
          })
        
         
        },

        fillCredentials2 : function(row)
        {
          AXIOS.get('/customer/'.concat(row.id), {}, {})
          .then(response => {
            this.customer = response.data;
          }).
          catch(e=>{
            this.error =e;
          })
        
         
        },
        
        fillCredentials3 : function(row)
        {
          AXIOS.get('/customer/'.concat(row.id), {}, {})
          .then(response => {
            this.carNames = response.data.cars
            this.customerId = response.data.id

            AXIOS.get('/mechanics/', {}, {})
            .then(response => {
              this.mechNames = response.data
              AXIOS.get('/services/', {}, {})
              .then(response => {
                this.serviceNames = response.data
              }).
              catch(e=>{
                this.error =e;
              })
            }).
            catch(e=>{
              this.error =e;
            })
          }).
          catch(e=>{
            this.error =e;
          })
        },

        addCar: function(typeOfCar, winterTires, numOfKm){
          AXIOS.post('/car/'.concat(this.customer.id + "?carType=" + typeOfCar + "&winterTires=" + winterTires + "&numOfKilometers=" + numOfKm), {}, {})
            .then(response => {
              AXIOS.get('/customer/'.concat(this.customer.id), {}, {})
              .then(response => {
                for(var i = 0; i < this.customers.length; i++){
                  if(this.customers[i].id === this.customer.id){
                    this.customers[i] = response.data
                  }
                }
                this.customers.push(response.data)
                this.customers.pop(response.data)
              }).
              catch(e=>{
                this.error =e;
              })
            })
            .catch(e => {
              this.error = e;
            })
        },

        addApp: function(customerId, specificCar, specificMech, specificService, startDate, note){
        
            var endDate = startDate.split("-");
            var min_sec_array = endDate[3].split(":");
            var hours = min_sec_array[0];
            hours++;
            if (hours < 10) {
            	min_sec_array[0] = '0'.concat(hours);
            } else {
            	min_sec_array[0] = hours;
            }
     
            min_sec_array = min_sec_array.join(':');
			      endDate[3] = min_sec_array;
			      endDate = endDate.join('-');

            //console.log("Old date: " + startDate);
            //console.log("New date: " + endDate);
            //console.log('/timeslot/'.concat(startDate + "?endTime="+endDate))

            AXIOS.post('/timeslot/'.concat(startDate + "?endTime="+endDate), {}, {})
            .then(response => {
            // JSON responses are automatically parsed.
                this.timeslot  = response.data
            	AXIOS.post('/appointment/'.concat(customerId + "?timeSlotId="+this.timeslot.id + "&carId="+specificCar.id + "&services="+specificService.serviceType + "&note="+note), {}, {})
              .then(response => {
                this.appointment = response.data
                AXIOS.put('/appointment/addMechanic/'.concat(specificMech.id + "?appointmentId=" + this.appointment.id), {}, {})
                .then(response => {
                  console.log("test")

                })
            	  .catch(e => {
                	var errorMsg = e.response.data.message
                	console.log(errorMsg)
                	this.errorAppointment = errorMsg
                })
              })
                AXIOS.put
            	.catch(e => {
                	var errorMsg = e.response.data.message
                	console.log(errorMsg)
                	this.errorAppointment = errorMsg
            	})
  
            })
            .catch(e => {
                var errorMsg = e.response.data.message
                console.log(errorMsg)
                this.errorTimeSlot = errorMsg
            })
            
        },

        removeCustomer: function(id){
          AXIOS.delete('/customer/'.concat(id), {}, {})
            .then(response => {
              console.log(response)
              for(var i = 0; i < this.customers.length; i++){
                if(this.customers[i].id === id){
                  this.customers.splice(i,1)
                }
              }
            })
            .catch(e => {
              this.error = e;
            })
        },

     
        searchForCustomers: function(search){
            AXIOS.get('/customer')
            .then(response => {
                if(search.length == 0){
                    this.customers = response.data;
                } else {
                    this.customers = [];
                    var i;
                    for(i = 0; i < response.data.length; i++){
                        var customer = response.data[i];
                        if(customer.name.includes(search)){
                            this.customers.push(customer);
                        } else if(customer.email.includes(search)){
                            this.customers.push(customer);
                        } else if(customer.phone.toString().includes(search)){
                            this.mechanics.push(customer);
                        }else if (customer.address.includes(search))
                        {
                          this.customers.push(customer);
                        }else if (customer.creditHash.includes(search))
                        {
                          this.customers.push(customer);
                        }else if (customer.debitHash.includes(search))
                        {
                          this.customers.push(customer);
                        }
                    }
                }
                
            })
            .catch(e => {
                this.error = e
            })
        },


      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        this.emailState = valid
        this.phoneState = valid
        this.passwordState = valid 
        this.addressState = valid
        return valid
      },
      checkFormValidity2() {
        const valid = this.$refs.form.checkValidity()
        this.typeOfCar = valid
        this.winterTires = valid
        this.numOfKm = valid
        return valid
      },
      checkFormValidity3() {
        const valid = this.$refs.form.checkValidity()
        this.customerEmail = valid
        this.startTime = valid
        this.endTime = valid
        return valid
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      handleOk2(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit2()
      },
      handleOk3(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit3()
      },
       resetModal() {
        this.name = ''
        this.email=''
        this.phone=''
        this.password=''
        this.address=''
        this.customer=""
        this.credit =" "
        this.debit = " "
        this.nameState = null
        this.emailState =null
        this.phoneState = null
        this.passwordState = null
        this.addressState =null
        this.creditState = null
        this.debitState = null
       
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      handleSubmit2() {
        if (!this.checkFormValidity2()) {
          return
        }
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      handleSubmit3() {
        if (!this.checkFormValidity3()) {
          return
        }
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    
       
    }
  }