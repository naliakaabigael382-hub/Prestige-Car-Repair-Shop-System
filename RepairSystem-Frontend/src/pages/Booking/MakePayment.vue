<template>
  <div id="payment" style="position: relative; left: 20px; top: 20px;">
    <h2>Make a Payment</h2>
    <br>

    <div class="row" style="position: relative; width: 100vh; left: 30px">
      <div class="col">
        <h5>Select Appointment</h5>
        <b-group>
          <b-select
            v-model="selectedAppointmentId"
            :options="appointments.map(app => ({ value: app.id, text: app.services[0].serviceType }))"
            placeholder="Select an appointment"
          ></b-select>
          <br>
        </b-group>

        <h5>Billing Information</h5>

        <h7>Email</h7>
        <b-group>
          <b-input type="text" v-model="email" :value="email" readonly></b-input>
          <br>
        </b-group>

        <h7>Address</h7>
        <b-group>
          <b-input type="text" v-model="address" :value="address" readonly></b-input>
          <br>
        </b-group>

        <h7>Credit</h7>
        <b-group>
          <b-input type="password" v-model="credit" :value="credit" readonly></b-input>
          <br>
        </b-group>

        <h7>Debit</h7>
        <b-group>
          <b-input type="password" v-model="debit" :value="debit" readonly></b-input>
        </b-group>
        <br>

        <toggle-button
          :height="25"
          :color="{checked: '#75C791', unchecked: '#75C791'}"
          :width="75"
          :labels="{checked: 'Credit', unchecked: 'Debit'}"
          v-model="paymentMethod"
        />
        <br>

        <h7>Amount</h7>
        <b-group>
          <b-input type="text" v-model="amount" placeholder="Enter amount"></b-input>
          <br>
        </b-group>

        <button class="button1" @click="makePayment" :disabled="!selectedAppointmentId || !amount">
          Make Payment
        </button>

        <div v-if="paymentReceipt" style="margin-top: 20px;">
          <h5>Payment Receipt:</h5>
          <p><strong>Appointment:</strong> {{ paymentReceipt.appointment.services[0].serviceType }}</p>
          <p><strong>Amount:</strong> ${{ paymentReceipt.amount }}</p>
          <p><strong>Payment Method:</strong> {{ paymentReceipt.paymentMethod }}</p>
          <p><strong>Date:</strong> {{ paymentReceipt.date }}</p>
          <button class="btn-primary1" @click="deleteReceipt(paymentReceipt.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';

var config = require('../../../config');
var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port;
var backendUrl = config.dev.backendHost;

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: {
    'Access-Control-Allow-Origin': frontendUrl,
    'Content-Type': 'application/json'
  }
});

Vue.use(ToggleButton);

export default {
  data() {
    return {
      email: '',
      address: '',
      credit: '',
      debit: '',
      customer: "",
      appointments: [],
      selectedAppointmentId: null,
      error: "",
      paymentReceipt: null,
      amount: '',
      paymentMethod: true // Use `true` for Credit, `false` for Debit
    };
  },
  created() {
    var id = this.$route.params.userId;
    AXIOS.get(`/customer/${id}`)
      .then(response => {
        this.customer = response.data;
        this.email = response.data.email;
        this.credit = response.data.creditHash;
        this.debit = response.data.debitHash;
        this.address = response.data.address;
        return AXIOS.get(`/appointments/${id}`);
      })
      .then(response => {
        this.appointments = response.data;
      })
      .catch(e => {
        this.error = 'Failed to load data. Please try again later.';
      });
  },
  methods: {
    makePayment() {
      if (!this.selectedAppointmentId || !this.amount) {
        alert("Please select an appointment and enter a valid amount.");
        return;
      }

      const data = {
        appointmentId: this.selectedAppointmentId,
        amount: parseFloat(this.amount).toFixed(2),
        paymentMethod: this.paymentMethod ? "Credit" : "Debit", // Convert boolean to "Credit" or "Debit"
        email: this.email,
        address: this.address,
        debit: this.debit,
        status: "COMPLETED"
      };

      AXIOS.post("/payments", data)
        .then(response => {
          alert("Payment successful! Receipt available here: " + response.data);

          // Redirect to the Overview page after successful payment
          location.replace(`${frontendUrl}/customerDashboard/Overview/${this.customer.id}`);
        })
        .catch(e => {
          alert("Payment failed. Please try again later.");
        });
    },

    deleteReceipt(receiptId) {
      AXIOS.delete(`/receipt/${receiptId}`)
        .then(response => {
          this.paymentReceipt = null;
          alert('Receipt deleted successfully.');
        })
        .catch(e => {
          alert('Error deleting receipt. Please try again.');
        });
    }
  }
};
</script>




<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
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
  background: rgb(51 41 134);
  width: 200px;
  height: 30px;
  color: white;
  border-radius: 8px;
}

.btn-primary1{
  border-radius: 10px;
  margin-right:20px;
  border-color: rgb(51 41 134);
  border-width: 3px;
  color: black;
  transform: translateY(-5px);
  background: #D3D2E1;
  position:relative;
  top: 20px;
}
</style>
