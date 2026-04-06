<template>
<div class="row no-gutters">
    <div class="col no-gutters">
        <div class="row no-gutters">
            <div class="left-top">
                <div class="rcorners">
                    <date-pick
                    style = "width: 90%;height: 100%; transform:translate(30px,60px) "
                    v-model="date"
                    :hasInputElement="false"
                    :pickTime="true"
                    :format="'YYYY-MM-DD-HH:mm'"
                    :displayFormat="'YYYY.MM.DD H:mm A'"
                    >
                    </date-pick>
                </div>
            </div>
        </div>
    </div>


        <div class="col no-gutters">
            <div class="rightside">
                <div class="row no-gutters">
                    <div class="top">
                        <b style="color: rgb(51 41 134); font-size: 30px; position: absolute; top: 25px; left: 65px"> Ready to book your appointment? </b>
                    </div>
                </div>

                <div class="row no-gutters">
                    <div class="middle">
                        <div class = "col">
                            <form>
                                <label class="typo__label"> Service </label>
                                <multiselect v-model="service" :state="serviceState" :options="availableServices" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick a Service" label="serviceType" track-by="serviceType" :preselect-first="true">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                                        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                    </template>
                                </multiselect>
                            </form>
                            <form>
                            <br>
                                <label class="typo__label"> Car  </label> <b-button v-b-modal.modal-prevent-closing class="btn-primary1"> <img class="img-add" src='../../assets/Admin/plus.png'/> </b-button>
                                <multiselect v-model="car" :state="carState" :options="availableCars" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick a Car" label="carType" track-by="carType" :preselect-first="true">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                                        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                    </template>
                                </multiselect>

                                <b-modal
                                id="modal-prevent-closing"
                                ref="modal"
                                title="Add Car"
                                @show="resetModal"
                                @hidden="resetModal"
                                @ok="createCar(carType, winterTires, numOfKm)"
                                >
                                <b-form ref="form" @submit.stop.prevent="handleSubmit">

                                  <b-form-group
                                    label="Car Type"
                                    label-for="carType-select"
                                    invalid-feedback="Car Type is required"
                                    :state="CarTypeState"
                                  >
                                    <b-form-select
                                      id="carType-select"
                                      v-model="carType"
                                      :options="carTypeOptions"
                                      :state="CarTypeState"
                                      required
                                    ></b-form-select>
                                  </b-form-group>

                                  <b-form-group
                                    label="Winter Tires"
                                    label-for="winterTires-select"
                                    invalid-feedback="State of Winter Tires is required"
                                    :state="winterTiresState"
                                  >
                                    <b-form-select
                                      id="winterTires-select"
                                      v-model="winterTires"
                                      :options="winterTiresOptions"
                                      :state="winterTiresState"
                                      required
                                    ></b-form-select>
                                  </b-form-group>

                                  <b-form-group
                                    label="Number of Kilometers"
                                    label-for="numOfKm-input"
                                    invalid-feedback="Number of Kilometers is required"
                                    :state="numOfKmState"
                                    >
                                    <b-form-input
                                        id="numOfKm-input"
                                        v-model="numOfKm"
                                        :state="numOfKmState"
                                        required
                                    ></b-form-input>
                                    </b-form-group>

                                </b-form>
                                </b-modal>
                            </form>
                            <br>
                            <form>
                                <label class="typo__label"> Mechanic </label>
                                <multiselect v-model="mechanic" :state="mechanicState" :options="availableMechanics" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick a Mechanic" label="name" track-by="name" :preselect-first="true">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                                        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                                    </template>
                                </multiselect>
                            </form>
                            <br>
                            <form>
                             <label  class="typo__label"> Note </label>
                             <br>
                              <input type="text" v-model="note" value="" style="width:380px; border-color:gray;">
                            </form>

                             <br>
                            <button class="button1" @click="createAppointment(date, value, service, note, car)">
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>


<script>
import Multiselect from "vue-multiselect";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import axios from "axios";

var config = require("../../../config");

var frontendUrl = "http://" + config.dev.host + ":" + config.dev.port;
var backendUrl = config.dev.backendHost;

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { "Access-Control-Allow-Origin": frontendUrl },
});

export default {
  components: { DatePick, Multiselect },
  data: () => ({
    // Dropdown-related data
    carType: "",
    winterTires: "",
    CarTypeState: null,
    winterTiresState: null,
    carTypeOptions: [
      { value: null, text: "Select Car Type", disabled: true },
      { value: "SEDAN", text: "Sedan" },
      { value: "COUPE", text: "Coupe" },
      { value: "SPORTS", text: "Sports" },
      { value: "HATCHBACK", text: "Hatchback" },
      { value: "MINIVAN", text: "Minivan" },
      { value: "STATIONWAGON", text: "Station Wagon" },
      { value: "CONVERTIBLE", text: "Convertible" },
      { value: "TRUCK", text: "Truck" },
      { value: "SUV", text: "SUV" },
      { value: "OTHER", text: "Other" },
    ],
    winterTiresOptions: [
      { value: null, text: "Select Tire Status", disabled: true },
      { value: true, text: "True" },
      { value: false, text: "False" },
    ],

    // Existing logic data
    date: "",
    timeslot: "",
    errorTimeSlot: "",
    availableServices: [],
    customer: "",
    error: "",
    availableMechanics: [],
    mechanic: "",
    appointment: "",
    service: "",
    car: "",
    availableCars: [],
  }),
  created: function () {
    var id = this.$route.params.userId;

    AXIOS.get("/customer/".concat(id))
      .then((response) => {
        this.customer = response.data;
      })
      .catch((e) => {
        this.error = e;
        console.log(e);
      });

    AXIOS.get("/mechanics")
      .then((response) => {
        this.availableMechanics = response.data;

        AXIOS.get("/services")
          .then((response) => {
            this.availableServices = response.data;

            AXIOS.get("/cars/".concat(id), {}, {})
              .then((response) => {
                this.availableCars = response.data;
              })
              .catch((e) => {
                var errorMsg = e.response.data.message;
              });
          })
          .catch((e) => {
            this.error = e;
          });
      })
      .catch((e) => {
        this.error = e;
      });
  },
  methods: {
    isPastDate: function (date) {
      return date < new Date();
    },
    createAppointment: function (startDate, mechanic, service, note, car) {
      var vehicleId = car == null ? this.car.id : car.id;

      var endDate = startDate.split("-");
      var min_sec_array = endDate[3].split(":");
      var hours = min_sec_array[0];
      hours++;
      min_sec_array[0] = hours < 10 ? "0".concat(hours) : hours;
      min_sec_array = min_sec_array.join(":");
      endDate[3] = min_sec_array;
      endDate = endDate.join("-");

      AXIOS.post("/timeslot/".concat(startDate + "?endTime=" + endDate), {}, {})
        .then((response) => {
          this.timeslot = response.data;

          AXIOS.post(
            "/appointment/".concat(
              this.customer.id +
              "?timeSlotId=" +
              this.timeslot.id +
              "&carId=" +
              vehicleId +
              "&services=" +
              this.service.serviceType +
              "&note=" +
              this.note
            ),
            {},
            {}
          )
            .then((response) => {
              this.appointment = response.data;
              AXIOS.put(
                "/appointment/addMechanic/".concat(
                  this.mechanic.id + "?appointmentId=" + this.appointment.id
                ),
                {},
                {}
              )
                .then((response) => {
                  location.replace(
                    frontendUrl +
                    "/customerDashboard/Overview/" +
                    this.customer.id
                  );
                })
                .catch((e) => {
                  var errorMsg = e.response.data.message;
                  this.errorAppointment = errorMsg;
                });
            })
            .catch((e) => {
              var errorMsg = e.response.data.message;
              this.errorAppointment = errorMsg;
            });
        })
        .catch((e) => {
          var errorMsg = e.response.data.message;
          this.errorTimeSlot = errorMsg;
        });
    },
    createCar: function (carType, winterTires, numOfKm) {
      AXIOS.post(
        "/car/".concat(
          this.customer.id +
          "?carType=" +
          carType +
          "&winterTires=" +
          winterTires +
          "&numOfKilometers=" +
          numOfKm
        ),
        {},
        {}
      ).then((response) => {
        this.car = response.data;
        this.availableCars.push(response.data);
      });
    },
  },
};
</script>




<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.left-top {

    position: absolute;
    content: "";
    top: 100px;
    left: 70px;
    height:300px;
}


.rcorners {
    border-radius: 25px;
    background: white;
    width: 700px;
    height: 400px;
}
.rightside {
    height: 98.5vh;
    width: 70%;
    position: absolute;
    content: "";
    right: 0px;
    background: white
}
.middle {
    height: 30%;
    width: 90%;
    position: absolute;
    content: "";
    left: 20px;
    top: 200px;
}

.messages {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 40px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}

.btn-primary{
	width: 100px;
	height: 30px;
    border-radius: 10px;
    margin-right:20px;
    transform: translateY(-5px);
}

.button1 {
  width: 200px;
  height: 50px;
  color: black;
  border-radius: 8px;
  border-color: transparent;
  background: rgb(244,206,122);
  background: linear-gradient(325deg, rgba(244,206,122,1) 2%, rgba(167,148,218,1) 84%);
}

.top {
    height: 50%;
    width: 100%;
    position: absolute;
    content: "";
    top: 20px;
}

.Rectangle
	{
		height:60px;
		width:60px;
		border-radius: 20px;
		background-color: #E6E6FA

	}
.rightside {
    height: 98.5vh;
    width: 70%;
    position: absolute;
    content: "";
    right: 0px;
    background: white
}

.btn-primary1{
    border-radius: 10px;
    margin-right:20px;
    border-color: #F3BE35;
    border-width: 3px;
    color: black;
    transform: translateY(-5px);
    background: #F3BE35;
    position:relative;
    height:20px;
    width:15px;
}
.img-add{
    max-height:17px;
    transform: translate(-8px, -12px);
}
</style>
