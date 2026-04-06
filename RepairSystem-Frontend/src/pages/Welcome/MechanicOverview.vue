<template>
<div class="row no-gutters">
    <div class="col no-gutters">
        <div class="row no-gutters">
            <div class="left-top">
                <div class="rcorners">
                    &nbsp; &nbsp; &nbsp;
                    <b style="color: rgb(51 41 134); font-size: 30px; position: absolute; top: 25px; left: 65px"> Hello, </b>
                    <b style="color: #F3BE35; font-size: 30px; position: absolute; top: 25px; left: 150px "> {{this.mechanic.name}} </b>
                    <img src="../../assets/welcome-car.png" width="300px" height="150px" style="position: absolute; right: 25px">
                </div>
            </div>
        </div>

        <div class="row no-gutters">
            <div class="left-bottom">
                <img src="../../assets/appointment.png" width="50px">
                My Appointments
                <div class="container mt-3 mb-3" style="background-color:white; border-radius:30px;">
                    <table class="table table-striped tabled-bordered mydatatable" style="width: 670px">
                        <thead>
                            <tr style="text-align:center;  border-radius:30px;">
                                <th> Service </th>
                                <th> Car </th>
                                <th> Status </th>
                                <th> Start Time</th>
                                <th> Customer Name</th>
                                <th> Actions </th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="appointment in appointments" style="text-align:center">
                                <td> {{appointment.services[0].serviceType}} </td>
                                <td>{{ appointment.car.carType }}</td>
                                <td>{{ appointment.status }}</td>
                                <td>{{ appointment.timeSlot.startTime }}</td>
                                <td v-for="cus in customers" v-if="cus.id == appointment.customer.id">
                                {{cus.name}}
                                </td>
                                <td>

                                    <button class="btn-edit" @click="modalShow =!modalShow; fillCredentials(appointment)"> <img  class="img-add" src="../../assets/Admin/edit.png"/>  </button>
                                    <button class="btn-remove" @click="removeApp(appointment.id)"> <img  class="img-add" src="../../assets/Admin/delete.png"/>  </button> 
                        <b-modal
                        v-model="modalShow"
                        title="Edit Appointment"
                        id="modal-scoped"
                        >
                        <b-form ref="form" @submit.stop.prevent="handleSubmit">
                            <label class="typo__label"> <b>Appointment Status</b> </label>
                            <multiselect v-model="specificStatus" :state="statusState" :options="statusOptions" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true"> >
                                <template slot="selection" slot-scope="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values .length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                </template>
                            </multiselect>
                        </b-form>
                            

                            <template #modal-footer="{Save, Cancel}">

                                <!-- Emulate built in modal footer ok and cancel button actions -->
                                <b-button size="sm" variant="success" @click="editAppointment(specificStatus); modalShow =!modalShow"> Save </b-button>
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
        </div>
    </div>

    <div class="col no-gutters">
        <div class="rightside">
            <div class="row no-gutters">
                <div class="top">
                    <center><img src="../../assets/profile-default.png" width="100px" length="100px"></center>
                    <br>
                    <center> <b style="color: rgb(51 41 134); font-size: 20px;"> {{mechanic.name}}</b> </center>
                </div>
            </div>

            <div class="row no-gutters">
                <div class="middle">
                    <br>
                    <date-pick v-model="date" :hasInputElement="false"></date-pick>
                </div>
            </div>
            <div class="row no-gutters">
                <div class="bottom">
                    <br> <img src="../../assets/paint job 1.jpg" width="400px" length="400px">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect'
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
    baseURL: backendUrl,
    headers: {
        'Access-Control-Allow-Origin': frontendUrl
    }
})

export default {
    components: {
        DatePick,
        Multiselect
    },
    computed: {
        userId() {
            return this.$route.params.userId
        }
    },
    data() {
        return {
            mechanic: "",
            modalShow: false,
            error: "",
            appointments: [],
            appointment: "",
            mechAppointments: [],
            timeslots: [],
            customers: [],

            error: "",

            statusOptions: [
                {name: "AppointmentBooked"},
                {name: "CarReceived"},
                {name: "InRepair"},
                {name: "Completed"}
            ],

            specificStatus: "",
        }
    },
    created: function () {
        var id = this.$route.params.userId
        AXIOS.get('/mechanic/'.concat(id))
            .then(response => {
                // JSON responses are automatically parsed.
                this.mechanic = response.data
                AXIOS.get('/appointment/').
                then(response => {
                    for(var i = 0; i < response.data.length; i++){
                        console.log(response.data[i].mechanics[0].id)
                        console.log(id)
                        if(response.data[i].mechanics[0].id.toString() === id){
                            console.log(response.data[i])
                            this.appointments.push(response.data[i])
                        }
                    }
                    AXIOS.get('/timeslots/').
                    then(response => {
                        this.timeslots = response.data
                        AXIOS.get('/customer/').
                        then(response => {
                            this.customers = response.data
                        }).catch(e => {
                            this.error = e
                            console.log(e)
                        })
                    }).catch(e => {
                        this.error = e
                        console.log(e)
                    })

                }).catch(e => {
                    this.error = e
                    console.log(e)
                })
            })
            .catch(e => {
                this.error = e
                console.log(e)
            })
    },

    methods: {
        editAppointment: function(status){
            console.log(this.appointment)
            console.log(status)
            AXIOS.put('/appointment/editAppointment/'.concat(this.appointment.id + "?status=" + status.name)).
                then(response => {
                    for(var i = 0; i < this.appointments.length; i++){
                        if(this.appointments[i].id === this.appointment.id){
                            this.appointments[i] = response.data
                            //work around
                            this.appointments.push(response.data)
                            this.appointments.pop(response.data)
                        }
                    }
                })
                .catch(e => {
                    this.error = e
                })
        },

        removeApp: function(appointmentId){
            console.log("test")
            AXIOS.delete('/appointment/'.concat(appointmentId)).
                then(response => {
                    for(var i = 0; i < this.appointments.length; i++){
                        if(this.appointments[i].id === appointmentId){
                            this.appointments.splice(i,1)
                        }
                    }
                })
                .catch(e => {
                    this.error = e
                })
        },

        fillCredentials: function (appointment) {
            AXIOS.get('/mechanics/').
                then(response => {
                    this.mechanics = response.data
                    AXIOS.get('/cars/'.concat(appointment.customer.id)).
                    then(response => {
                        this.cars = response.data
                        this.mechOptions = this.mechanics
                        this.carOptions = this.cars
                        this.specificStatus = this.status
                        this.appointment = appointment
                    })
                    .catch(e => {
                    this.error = e
                    console.log(e)
                    })
                })
                .catch(e => {
                    this.error = e
                })
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
            this.modalShow= false
            this.error= ""
        }

    }

}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.overview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 40px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}

.rightside {
    height: 98.5vh;
    width: 70%;
    position: absolute;
    content: "";
    right: 0px;
    background: white
}

.top {
    height: 50%;
    width: 100%;
    position: absolute;
    content: "";
    top: 20px;
}

.rcorners {
    border-radius: 25px;
    background: white;
    width: 750px;
    height: 150px;
}

.rcorners2 {
    border-radius: 25px;
    background: white;
    width: 400px;
    height: 300px;
    border: 3px solid;
    border-color: #D3D2E1;
    padding: 25px;
}

.middle {
    height: 30%;
    width: 90%;
    position: absolute;
    content: "";
    left: 20px;
    top: 200px;
}

.bottom {
    height: 30%;
    width: 80%;
    position: absolute;
    content: "";
    left: 20px;
    top: 500px;
}

.left-top {

    position: absolute;
    content: "";
    top: 50px;
    left: 70px
}

.left-bottom {

    position: absolute;
    content: "";
    left: 70px;
    top: 250px;
    width: 690px;
}

.mydatatable {
    transform: translateX(-8px);
}

.img-add {
    max-height: 20px;
    transform: translateY(-1px);
}

.btn-remove {
    border-color: #5430be;
    background-color: transparent;
    border-radius: 10px;
    border-width: 2px;
}

.btn-edit{
    border-color: #5430be;
    background-color: transparent;
    border-radius:10px;
    border-width:2px;
}

</style>
