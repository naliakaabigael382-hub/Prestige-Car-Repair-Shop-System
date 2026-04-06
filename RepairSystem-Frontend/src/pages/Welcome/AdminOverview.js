import axios from 'axios'
import Multiselect from 'vue-multiselect'
import 'vue-date-pick/dist/vueDatePick.css';
import DatePick from 'vue-date-pick';

var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: {
    'Access-Control-Allow-Origin': frontendUrl
  }
})

function TimeSlotDto(startTime, endTime) {
  this.startTime = endTime;
  this.endTime = endTime;
  this.id = "";
  this.mechanics = [];
  this.appointments = [];
}

export default {
  components: {
    Multiselect,
    DatePick
  },
  data() {
    return {
      admin: "",
      modalShow: false,
      startTime: '',
      endTime: '',
      id: '',
      timeslots: [],
      mechanics: [],
      customers: [],
      cars: [],
      appointments: [],
      appointment: "",

      startTimeState: null,
      endTimeState: null,

      error: "",

      statusOptions: [
        { name: "AppointmentBooked" },
        { name: "CarReceived" },
        { name: "InRepair" },
        { name: "Completed" }
      ],

      specificStatus: "",
    }
  },
  created: function () {
    var id = this.$route.params.userId
    AXIOS.get('/admin/'.concat(id))
      .then(response => {
        this.admin = response.data
        AXIOS.get('/timeslots/').then(response => {
          this.timeslots = response.data
          AXIOS.get('/appointment').then(response => {
            this.appointments = response.data
            // Fetch payment status for each appointment
            this.appointments.forEach(appointment => {
              AXIOS.get(`/payments/status/${appointment.id}`).then(response => {
                appointment.paymentStatus = response.data.paymentDone ? 'Completed' : 'Pending';
              }).catch(e => {
                console.error(e);
              });
            });
            AXIOS.get('/mechanics').then(response => {
              this.mechanics = response.data
              AXIOS.get('/customer').then(response => {
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
    editAppointment: function (appointment, status) {
      AXIOS.put('/appointment/editAppointment/'.concat(appointment.id + "?status=" + status.name))
        .then(response => {
          for (var i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i].id === appointment.id) {
              this.appointments[i] = response.data
              // work around
              this.appointments.push(response.data)
              this.appointments.pop(response.data)
            }
          }
        })
        .catch(e => {
          this.error = e
        })
    },

    removeApp: function (appointmentId) {
      AXIOS.delete('/appointment/'.concat(appointmentId))
        .then(response => {
          for (var i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i].id === appointmentId) {
              this.appointments.splice(i, 1)
            }
          }
        })
        .catch(e => {
          this.error = e
        })
    },

    fillCredentials: function (appointment) {
      AXIOS.get('/mechanics/').then(response => {
        this.mechanics = response.data
        AXIOS.get('/cars/'.concat(appointment.customer.id)).then(response => {
          this.cars = response.data
          this.mechOptions = this.mechanics
          this.carOptions = this.cars
          this.specificStatus = this.status
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
      this.modalShow = false
      this.startTime = ''
      this.endTime = ''
      this.id = ''
      this.timeslots = []
      this.mechanics = []
      this.appointments = []
      this.startTimeState = null
      this.endTimeState = null
      this.error = ""
    }
  }
}
