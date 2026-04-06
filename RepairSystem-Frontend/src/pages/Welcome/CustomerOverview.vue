<template>
  <div class="row no-gutters">
    <div class="col no-gutters">
      <div class="row no-gutters">
        <div class="left-top">
          <div class="rcorners">
            &nbsp; &nbsp; &nbsp;
            <b style="color: rgb(51 41 134); font-size: 30px; position: absolute; top: 25px; left: 65px">Hello, </b>
            <b style="color: #F3BE35; font-size: 30px; position: absolute; top: 25px; left: 150px">{{ customer.name }}</b>
            <p style="color: black; font-size: 20px; position: absolute; top: 70px; left: 85px;">Have a nice day!</p>
          </div>
        </div>
      </div>

      <div class="row no-gutters">
        <div class="left-bottom">
          <img src="../../assets/appointment.png" width="50px">
          My Appointments

          <div class="container mt-3 mb-3" style="background-color: white; border-radius: 30px">
            <table class="table table-striped table-bordered mydatatable">
              <thead>
              <tr style="text-align: center; border-radius: 30px;">
                <th>Service</th>
                <th>Car</th>
                <th>Appointment Status</th>
                <th>Start Time</th>
                <th>Mechanic Name</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id" style="text-align: center">
                <td>{{ appointment.services[0].serviceType }}</td>
                <td>{{ appointment.car.carType }}</td>
                <td>{{ appointment.status }}</td>
                <td>{{ appointment.timeSlot.startTime }}</td>
                <td v-for="mech in mechanics" v-if="mech.id == appointment.mechanics[0].id">{{ mech.name }}</td>
                <td>
                  <span v-if="!appointment.paymentDone" class="text-danger">Payment Pending</span>
                  <span v-else class="text-success">Payment Completed</span>
                </td>
                <td>
                  <button v-if="!appointment.paymentDone"
                          class="btn btn-primary"
                          @click="redirectToPayment(appointment.id)">
                    Make Payment
                  </button>
                  <button v-else class="btn btn-secondary" disabled>Payment Done</button>
                  <button v-if="appointment.paymentDone"
                          class="btn btn-success"
                          @click="downloadReceipt(appointment.id)">
                    Download Receipt
                  </button>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <h1 style="color: white">Footer</h1>
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
            <center><b style="color: rgb(51 41 134); font-size: 20px;">{{ customer.name }}</b></center>
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
            <br><img src="../../assets/paint job 1.jpg" width="400px" length="400px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

var config = require('../../../config');

// Configure API URLs
var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port;
var backendUrl = config.dev.backendHost;
var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: {
    'Access-Control-Allow-Origin': frontendUrl,
    'Content-Type': 'application/json'
  }
});

export default {
  components: {
    DatePick
  },
  data() {
    return {
      customer: "",
      appointments: [],
      timeslots: [],
      mechanics: [],
      error: "",
      loading: false
    };
  },
  created() {
    this.fetchCustomerData();
  },
  methods: {
    async fetchCustomerData() {
      try {
        this.loading = true;
        var id = this.$route.params.userId;
        const customerResponse = await AXIOS.get(`/customer/${id}`);
        this.customer = customerResponse.data;

        const appointmentsResponse = await AXIOS.get(`/appointments/${id}`);
        this.appointments = appointmentsResponse.data.map(appointment => {
          AXIOS.get(`/payments/status/${appointment.id}`).then(response => {
            appointment.paymentDone = response.data.paymentDone;
            appointment.paymentId = response.data.paymentId;
            appointment.receiptLink = response.data.receiptLink;
          }).catch(e => {
            console.error("Error checking payment status:", e);
          });

          return appointment;
        });

        const timeslotsResponse = await AXIOS.get('/timeslots/');
        this.timeslots = timeslotsResponse.data;

        const mechanicsResponse = await AXIOS.get('/mechanics/');
        this.mechanics = mechanicsResponse.data;

      } catch (e) {
        this.error = e;
        console.error('Error fetching data:', e);
      } finally {
        this.loading = false;
      }
    },

    removeApp(appointmentId) {
      AXIOS.delete(`/appointment/${appointmentId}`)
        .then(response => {
          this.appointments = this.appointments.filter(app => app.id !== appointmentId);
        })
        .catch(e => {
          this.error = e;
          console.log('Error removing appointment:', e);
        });
    },

    redirectToPayment(appointmentId) {
      //this.$router.push(`/customerDashboard/makePayment/${appointmentId}`);
      location.replace(frontendUrl+"/customerDashboard/makePayment/"+this.customer.id);
    },

    async downloadReceipt(appointmentId) {
      try {
        const paymentStatusResponse = await AXIOS.get(`/payments/status/${appointmentId}`);

        if (paymentStatusResponse.data.paymentDone) {
          const paymentId = paymentStatusResponse.data.paymentId;

          const receiptResponse = await AXIOS.get(`/payments/receipts/${paymentId}`, { responseType: 'blob' });

          if (receiptResponse.status === 200) {
            const receiptLink = URL.createObjectURL(receiptResponse.data);
            const fileName = `receipt_${paymentId}.pdf`;

            const link = document.createElement('a');
            link.href = receiptLink;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            alert('Error: Receipt not found or available.');
          }
        } else {
          alert('Payment is still pending, please complete the payment first.');
        }
      } catch (e) {
        console.error('Error downloading receipt:', e);
        alert('Error downloading receipt. Please try again.');
      }
    }
  }
};
</script>


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
    width: 600px;
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
    width: 680px;
}

.btn-remove {
    border-color: #5430be;
    background-color: transparent;
    border-radius: 10px;
    border-width: 2px;

}

.img-add {
    max-height: 20px;
}

.mydatatable {
    transform: translateX(-12px);
}

</style>
