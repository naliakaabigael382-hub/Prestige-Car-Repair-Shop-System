<!-- Customers -->
<template>
  
    <div class="profile">
       <nav class="navbar">
            <span class="navbar-brand mb-0 h1">
                <div class="row">
                      <form>
                        <input type="text" v-model="s" value="" class="search-input" placeholder="  Search">
                    </form>

                  <button class="search-btn" @click="searchForCustomers(s)"> <img class="img-add" src="../../assets/Admin/search.png"/> </button>          
                  <b-button v-b-modal.modal-prevent-closing class="btn-primary"> Add Customer <img class="img-add" src="../../assets/Admin/plus.png"/> </b-button>

                        <b-modal
                        id="modal-prevent-closing"
                        ref="modal"
                        title="Add New Customer"
                        @show="resetModal"
                        @hidden="resetModal"
                        @ok="createCustomer(name,password,phone,email,credit,debit, address)"
                        >
                        <b-form ref="form" @submit.stop.prevent="handleSubmit">

                            <b-form-group
                            label="Name"
                            label-for="name-input"
                            invalid-feedback="Name is required"
                            :state="nameState"
                            >
                            <b-form-input
                                id="name-input"
                                v-model="name"
                                :state="nameState"
                                required
                            ></b-form-input>
                            </b-form-group>

                           <b-form-group
                            label="Email"
                            label-for="email-input"
                            invalid-feedback="email is required"
                            :state="emailState"
                            >
                            <b-form-input
                                id="email-input"
                                v-model="email"
                                :state="emailState"
                                required
                            ></b-form-input>
                            </b-form-group> 

                            <b-form-group
                            label="Password"
                            label-for="password-input"
                            invalid-feedback="password is required"
                            :state="passwordState"
                            >
                            <b-form-input
                                id="password-input"
                                v-model="password"
                                :state="passwordState"
                                required
                            ></b-form-input>
                            </b-form-group> 

                            <b-form-group
                            label="Phone Number"
                            label-for="phone-input"
                            invalid-feedback="Phone number is required"
                            :state="phoneState"
                            >
                            <b-form-input
                                id="Phone Number-input"
                                v-model="phone"
                                :state="phoneState"
                                required
                            ></b-form-input>
                            </b-form-group> 

                            <b-form-group
                            label="Residence Address"
                            label-for="address-input"
                            invalid-feedback="Address is required"
                            :state="addressState"
                            >
                            <b-form-input
                                id="address-input"
                                v-model="address"
                                :state="addressState"
                                required
                            ></b-form-input>
                            </b-form-group>  

                             <b-form-group
                            label="Credit Card"
                            label-for="CreditCard"
                            >
                            <b-form-input
                                id="credit-input"
                                v-model="credit"
                                :state="creditState"
                            ></b-form-input>
                            </b-form-group>  

                             <b-form-group
                            label="Debit Card"
                            label-for="DebitCard"
                            >
                            <b-form-input
                                id="debit-input"
                                v-model="debit"
                                :state="debitState"
                            ></b-form-input>
                            </b-form-group>  
                        </b-form>
                        
                        </b-modal>
                    
                </div>
            </span>
        </nav>

    
     
  <!--
        The Table containing all the mechanic information#D3D2E1 --> 
        <div class="container mt-3 mb-3" style="background-color:white; border-radius:30px;">
          <table class = "table table-striped tabled-bordered mydatatable" style="width: 100">
              <thead>
                    <tr style="text-align:center;  border-radius:30px;">
                        <th> Name </th>
                        <th>Email</th>
                        <th>Phone Number </th>
                        <th>Address</th>
                        <th> Cars </th>
                   <!--     <th> Credit Card </th>
                        <th> Debit Card </th>-->
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers" style="text-align:center">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.email }}</td>
                        <td>{{ customer.phone }}</td>
                        <td>{{ customer.address  }}</td>
                        <td> 
                            <table class="table">
                                <tbody>
                                    <td v-for="car in customer.cars">
                                        {{car.carType}}
                                    </td>
                                </tbody>
                            </table>

                        </td>
                   <!--     <td>{{ customer.creditHash}} </td>
                        <td>{{ customer.debitHash}} </td>-->
                        <td> 
                        <button class="btn-edit" @click=" modalShow =!modalShow; fillCredentials(customer)"> <img  class="img-add" src="../../assets/Admin/edit.png"/>  </button>
                        <button class="btn-add-car" @click="modalCar =! modelCar; fillCredentials2(customer)"> <img  class="img-add" src="../../assets/Admin/addCar.png"/>  </button> 
                        <button class="btn-add-app" @click="modalApp =!modalApp; fillCredentials3(customer)"> <img class="img-add" src="../../assets/Admin/plus.png" /> </button>
                        <button class="btn-remove" @click="removeCustomer(customer.id)"> <img  class="img-add" src="../../assets/Admin/delete.png"/>  </button> 
                        
                        <!-- Modal for add app to customer-->
                        <b-modal
                        v-model="modalApp"
                        title="Add New Appointment"
                        id="modal-scoped3"
                        >
                        <b-form ref="form" @submit.stop.prevent="handleSubmit3">

                            <b-form-group
                            label="Customer Id"
                            label-for="customerId-input"
                            invalid-feedback="Customer Id is required"
                            :state="customerId"
                            >
                            <b-form-input
                                id="customerId"
                                type="text"
                                v-model="customerId"
                                name="customerId"
                                :value="customerId"
                            >
                            </b-form-input>
                            </b-form-group>

                            <label class="typo__label"> Car </label>
                            <multiselect v-model="specificCar" :state="specificCarState" :options="carNames" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="carType" track-by="carType" :preselect-first="true"> >
                                <template slot="selection" slot-scope="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values .length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                </template>
                            </multiselect>
                            <br>
                             <label class="typo__label"> Mechanic </label>
                            <multiselect v-model="specificMech" :state="specificMechState" :options="mechNames" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true"> >
                                <template slot="selection" slot-scope="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values .length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                </template>
                            </multiselect>
                            <br>
                            <label class="typo__label"> Service </label>
                            <multiselect v-model="specificService" :state="specificServiceState" :options="serviceNames" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="serviceType" track-by="serviceType" :preselect-first="true"> >
                                <template slot="selection" slot-scope="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values .length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                </template>
                            </multiselect>
                            <br>
                            <b-form-group
                            label="Start Time (YYYY-MM-DD-HH:mm)"
                            label-for="startTime-input"
                            invalid-feedback="Start Time is required"
                            :state="startTime"
                            >
                            <b-form-input
                                id="startTime"
                                type="text"
                                v-model="startTime"
                                name="startTime"
                                :value="startTime"
                            >
                            </b-form-input>
                            </b-form-group>

                            <b-form-group
                            label="Note"
                            label-for="note-input"
                            invalid-feedback="Note is required"
                            :state="note"
                            >
                            <b-form-input
                                id="note"
                                type="text"
                                v-model="note"
                                name="note"
                                :value="note"
                            >
                            </b-form-input>
                            </b-form-group>
                        </b-form>

                            <template #modal-footer="{Save, Cancel}">
                              
                                <!-- Emulate built in modal footer ok and cancel button actions -->
                                <b-button size="sm" variant="success" @click="modalApp =!modalApp; addApp(customerId, specificCar, specificMech, specificService, startTime, note)"> Save </b-button>
                                <b-button size="sm" variant="danger" @click="modalApp =!modalApp">Cancel</b-button> 
      
                            </template>
                        </b-modal>

                        <!-- Modal for add car to customer-->
                        <b-modal
                        v-model="modalCar"
                        title="Add Car"
                        id="modal-scoped2"
                        >
                        <b-form ref="form" @submit.stop.prevent="handleSubmit2">

                            <b-form-group
                            label="Type of Car"
                            label-for="typeOfCar-input"
                            invalid-feedback="Type of Car is required"
                            :state="typeOfCar"
                            >
                            <b-form-input
                                id="typeOfCar"
                                type="text"
                                v-model="typeOfCar"
                                name="typeOfCar"
                                :value="typeOfCar"
                            >
                            </b-form-input>
                            </b-form-group>

                            <b-form-group
                            label="Winter Tires"
                            label-for="winterTires-input"
                            invalid-feedback="Winter Tires is required"
                            :state="winterTires"
                            >
                            <b-form-input
                                id="winterTires"
                                type="text"
                                v-model="winterTires"
                                name="winterTires"
                                :value="winterTires"
                            >
                            </b-form-input>
                            </b-form-group>

                            <b-form-group
                            label="Number of Kilometers"
                            label-for="numOfKm-input"
                            invalid-feedback="Number of Kilometers is required"
                            :state="numOfKm"
                            >
                            <b-form-input
                                id="numOfKm"
                                type="text"
                                v-model="numOfKm"
                                name="numOfKm"
                                :value="numOfKm"
                            >
                            </b-form-input>
                            </b-form-group>
                        </b-form>
                            <template #modal-footer="{Save, Cancel}">
                              
                                <!-- Emulate built in modal footer ok and cancel button actions -->
                                <b-button size="sm" variant="success" @click=" addCar(typeOfCar, winterTires, numOfKm);modalCar =!modalCar"> Save </b-button>
                                <b-button size="sm" variant="danger" @click="modalCar =!modalCar">Cancel</b-button> 
      
                            </template>

                        </b-modal>

                        <!-- Modal for edit customer-->
                        <b-modal
                        v-model="modalShow"
                        title="Edit Profile"
                        id="modal-scoped"
                        >
                        <b-form ref="form" @submit.stop.prevent="handleSubmit">
                           
                            <b-form-group
                            label="Name"
                            label-for="editName-input"
                            invalid-feedback="Name is required"
                            :state="editEmailState"
                            >
                            <b-form-input
                                id="editName"
                                type="text"
                                v-model="editName"
                                name="editName"
                                :value="editName"
                            >
                            </b-form-input>
                            </b-form-group>

                              <b-form-group
                            label="Email"
                            label-for="editEmail-input"
                            invalid-feedback="Email is required"
                            :state="editEmailState"
                            >
                            <b-form-input
                                id="editEmail"
                                type="text"
                                v-model="editEmail"
                                name="editEmail"
                                :value="editEmail"
                            >
                            </b-form-input>
                            </b-form-group> 

                            <b-form-group
                            label="Phone"
                            label-for="editPhone-input"
                            invalid-feedback="Phone is required"
                            :state="editPhoneState"
                            >
                            <b-form-input
                               id="editPhone"
                               v-model="editPhone"
                               type="text"
                               name="editPhone"
                               :value="editPhone"
                            > 
                            </b-form-input>
                            </b-form-group>

                             <b-form-group
                            label="Password"
                            label-for="editPassword-input"
                            invalid-feedback="Password is required"
                            :state="editPhoneState"
                            >
                            <b-form-input
                               id="editPassword"
                               v-model="editPassword"
                               type="text"
                               name="editPassword"
                               :value="editPassword"
                            > 
                            </b-form-input>
                            </b-form-group>

                            
                             <b-form-group
                            label="Residence "
                            :state="editResidenceState"
                            >
                            <b-form-input
                               id="editPassword"
                               v-model="editResidence"
                               type="text"
                               name="editPassword"
                               :value="editResidence"
                            > 
                            </b-form-input>
                            </b-form-group>

                            
                             <b-form-group
                            label="Credit Card"
                            label-for="editCredit-input"
                            invalid-feedback="Credit is required"
                            :state="editCreditState"
                            >
                            <b-form-input
                               id="editCredit"
                               v-model="editCredit"
                               type="text"
                               name="editCredit"
                               :value="editCredit"
                            > 
                            </b-form-input>
                            </b-form-group>

                           <b-form-group
                            label="Debit Card"
                            label-for="editDebit-input"
                            invalid-feedback="Debit is required"
                            :state="editDebitState"
                            >
                            <b-form-input
                               id="editDebit"
                               v-model="editDebit"
                               type="text"
                               name="editDebit"
                               :value="editDebit"
                            > 
                            </b-form-input>
                            </b-form-group>
   
                            </b-form>
                            <template #modal-footer="{Save, Cancel}">
                              
                                <!-- Emulate built in modal footer ok and cancel button actions -->
                                <b-button size="sm" variant="success" @click=" editCustomer(editEmail, editName, editPassword, editPhone, editCredit, editDebit, editResidence);modalShow =!modalShow"> Save </b-button>
                                <b-button size="sm" variant="danger" @click="modalShow =!modalShow">Cancel</b-button> 
      
                            </template>
                        </b-modal> 

                             
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <h1 style="color:white"> Footer </h1>
                </tfoot>
            </table>
        </div>
        
    </div>
</template>

<script src="./AdminEditCustomer.js">
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.profile {
    height: 100%;
    width: 100%;
    /**color: rgb(167, 167, 167);   */
    color:rgb(51 41 134);
    background:  #D3D2E1;
}

.navbar{
    color:rgb(51 41 134)
}
.title-header{
    margin-left: 40px;
    margin-right:20px;  
}

.btn-primary{
    border-radius: 10px;
    margin-right:20px;  
    transform: translateY(-5px);
    
}

.btn-edit{
    border-color: #5430be;
    background-color: transparent;
    border-radius:10px;
    border-width:2px;
}
.btn-add-car{
    border-color: #5430be;
    background-color: transparent;
    border-radius:10px;
    border-width:2px;
}
.btn-add-app{
    border-color: #5430be;
    background-color: transparent;
    border-radius:10px;
    border-width:2px;
}
.btn-secondary
{
    border-radius: 10px;
    border-width: 2px;
    background: #5430be;
    border-color: transparent;
    transform: translateY(-5px);
}

.search-input {
    margin-left: 80px;
    border-radius: 20px;
    background-color: white;
    width: 400px;
    border-color: transparent;
}
.search-btn{
    border-radius: 20px;
    border-color: transparent;
    background-color: transparent;
    transform: translate(-35px,-1px);
}

.btn-remove{
    border-color: #5430be;
    background-color: transparent;
    border-radius:10px;
    border-width:2px;

}
.line
{
    height:2px;
    background-color:rgba(64, 57, 134, 1)
}
.img-add{
    max-height:20px;
    transform: translateY(-1px);
}

.table {
    border-radius: 30px;
    color: #111B47;

}

</style>