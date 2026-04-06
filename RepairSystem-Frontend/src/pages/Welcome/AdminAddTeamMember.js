import axios from 'axios'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';

var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

function MechanicDto(name, password, phone, email) {
  this.name = name;
  this.password = password;
  this.phone = phone;
  this.email = email;
  this.id = ""
}

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      admin: "",
      mechanic: "",
      modalShow: false,
      mechanics: [],
      value: [],
      options: [
        { name: "CarRepair" },
        { name: "OilChange" },
        { name: "RegularCheckup" },
        { name: "CarWash" },
        { name: "TireChange" },
        { name: "RoadsideAssistance" },
        { name: "Towing" },
        { name: "CarInspection" },
        { name: "Other" }
      ],

      nameState: null,
      emailState: null,
      phoneState: null,
      passwordState: null,
      addressState: null,
      capabilitiesState: null,
      error: "",

      /** Work Hours */
      mondayStartTime: "",
      mondayEndTime: "",
      tuesdayStartTime: "",
      tuesdayEndTime: "",
      wednesdayStartTime: "",
      wednesdayEndTime: "",
      thursdayStartTime: "",
      thursdayEndTime: "",
      fridayStartTime: "",
      fridayEndTime: "",
      saturdayStartTime: "",
      saturdayEndTime: "",

      /** Edit Work Hours */
      editMondayStart: "",
      editMondayEnd: "",
      editTuesdayStart: "",
      editTuesdayEnd: "",
      editWednesdayStart: "",
      editWednesdayEnd: "",
      editThursdayStart: "",
      editThursdayEnd: "",
      editFridayStart: "",
      editFridayEnd: "",
      editSaturdayStart: "",
      editSaturdayEnd: "",
    }
  },

  created: function () {
    // Initializing mechanics from backend
    AXIOS.get('/mechanics')
      .then(response => {
        // JSON responses are automatically parsed.
        this.mechanics = response.data
      })
      .catch(e => {
        this.error = e
      })
  },

  methods: {
    /**
     * To Create a Mechanic
     */
    createMechanic: function (name, password, phone, email, value, mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd) {
      AXIOS.post('/mechanic/'.concat(name), {}, {
        params: {
          name: name,
          phone: phone,
          password: password,
          email: email,
        }
      }).then(response => {
        var services = []
        for (var i = 0; i < value.length; i++) {
          services.push(value[i].name)
        }
        AXIOS.put("/mechanic/updateServices/".concat(email + "?services=" + services), {}, {})
          .then(response => {
            var timeslotsStart = "".concat(mondayStart + "," + tuesdayStart + "," + wednesdayStart + "," + thursdayStart + "," + fridayStart + "," + saturdayStart)
            var timeslotsEnd = "".concat(mondayEnd + "," + tuesdayEnd + "," + wednesdayEnd + "," + thursdayEnd + "," + fridayEnd + "," + saturdayEnd)
            AXIOS.put("/mechanic/addTimeSlots/".concat(email + "?timeslotsStart=" + timeslotsStart + "&timeslotsEnd=" + timeslotsEnd), {}, {})
              .then(response => {
                this.mechanics.push(response.data)
              })
              .catch(e => {
                this.error = e
              })
          })
          .catch(e => {
            this.error = e
          })
      })
        .catch(e => {
          this.error = e
        })

    },

    /** To Save the Edits in Edit Profile */
    editMechanic: async function (name, password, phone, services, editMondayStart, editMondayEnd, editTuesdayStart, editTuesdayEnd, editWednesdayStart, editWednesdayEnd, editThursdayStart, editThursdayEnd, editFridayStart, editFridayEnd, editSaturdayStart, editSaturdayEnd) {
      var email = this.mechanic.email
      try {
        await AXIOS.put('/mechanic/'.concat(email + "?name=" + name + "&password=" + password + "&phone=" + phone), {})
        var request = services.map(service => service.name).join(",")
        console.log(request)
        await AXIOS.put("/mechanic/updateServices/".concat(email + "?services=" + request), {})
        var timeslotsStart = "".concat(editMondayStart + "," + editTuesdayStart + "," + editWednesdayStart + "," + editThursdayStart + "," + editFridayStart + "," + editSaturdayStart)
        var timeslotsEnd = "".concat(editMondayEnd + "," + editTuesdayEnd + "," + editWednesdayEnd + "," + editThursdayEnd + "," + editFridayEnd + "," + editSaturdayEnd)
        let response = await AXIOS.put("/mechanic/addTimeSlots/".concat(email + "?timeslotsStart=" + timeslotsStart + "&timeslotsEnd=" + timeslotsEnd), {})
        for (var i = 0; i < this.mechanics.length; i++) {
          if (this.mechanics[i].id === this.mechanic.id) {
            this.mechanics[i] = response.data
            this.mechanics.push(response.data)
            this.mechanics.pop()
          }
        }
      } catch (e) {
        this.error = e
      }
    },

    /** To AutoComplete the Edit Profile Modal */
    fillCredentials: function (row) {
      this.editName = row.name;
      this.editEmail = row.email;
      this.editPhone = row.phone;
      this.editPassword = row.password;
      this.editMondayStart = row.timeSlots[0].startTimeFormat
      this.editMondayEnd = row.timeSlots[0].endTimeFormat
      this.editTuesdayStart = row.timeSlots[1].startTimeFormat
      this.editTuesdayEnd = row.timeSlots[1].endTimeFormat
      this.editWednesdayStart = row.timeSlots[2].startTimeFormat
      this.editWednesdayEnd = row.timeSlots[2].endTimeFormat
      this.editThursdayStart = row.timeSlots[3].startTimeFormat
      this.editThursdayEnd = row.timeSlots[3].endTimeFormat
      this.editFridayStart = row.timeSlots[4].startTimeFormat
      this.editFridayEnd = row.timeSlots[4].endTimeFormat
      this.editSaturdayStart = row.timeSlots[5].startTimeFormat
      this.editSaturdayEnd = row.timeSlots[5].endTimeFormat
      this.mechanic = row;
    },

    removeMechanic: function (id) {
      AXIOS.delete('/mechanic/'.concat(id), {})
        .then(response => {
          for (var i = 0; i < this.mechanics.length; i++) {
            if (this.mechanics[i].id == id) {
              this.mechanics.splice(i, 1)
              break
            }
          }
        })
        .catch(e => {
          this.error = e;
        })
    },

    searchForMechanics: function (search) {
      AXIOS.get('/mechanics')
        .then(response => {
          if (search.length == 0) {
            this.mechanics = response.data;
          } else {
            this.mechanics = [];
            for (var i = 0; i < response.data.length; i++) {
              var mechanic = response.data[i];
              if (mechanic.name.includes(search)) {
                this.mechanics.push(mechanic);
              } else if (mechanic.email.includes(search)) {
                this.mechanics.push(mechanic);
              } else if (mechanic.phone.toString().includes(search)) {
                this.mechanics.push(mechanic);
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
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    resetModal() {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.password = ''
      this.address = ''
      this.mechanic = ""
      this.capacities = ""
      this.nameState = null
      this.emailState = null
      this.phoneState = null
      this.passwordState = null
      this.addressState = null
      this.capabilitiesState = null
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}

