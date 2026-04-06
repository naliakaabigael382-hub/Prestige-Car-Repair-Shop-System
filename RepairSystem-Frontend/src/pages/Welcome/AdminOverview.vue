<template>
  <div class="row no-gutters">
    <div class="col no-gutters">
      <div class="row no-gutters">
        <div class="left-top">
          <nav class="navbar">
            <span class="navbar-brand mb-0 h1">
              <img src="../../assets/appointment.png" width="50px">
              Upcoming Appointments
            </span>
          </nav>

          <!-- The Table containing all the appointment information -->
          <div class="container mt-3 mb-3" style="background-color:white; border-radius:30px;">
            <table class="table table-striped table-bordered mydatatable" style="width: 100%">
              <thead>
              <tr style="text-align:center; border-radius:30px;">
                <th>Customer Name</th>
                <th>Status</th>
                <th>Time Slot</th>
                <th>Mechanic Name</th>
                <th>Service</th>
                <th>Car</th>
                <th>Payment Status</th> <!-- New column for payment status -->
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="appointment in appointments" style="text-align:center">
                <td v-for="cus in customers" v-if="cus.id == appointment.customer.id">{{cus.name}}</td>
                <td>{{ appointment.status }}</td>
                <td>{{ appointment.timeSlot.startTime }}</td>
                <td v-for="mech in mechanics" v-if="mech.id == appointment.mechanics[0].id">{{mech.name}}</td>
                <td>{{appointment.services[0].serviceType}}</td>
                <td>{{appointment.car.carType}}</td>
                <td>
                  <!-- Display payment status -->
                  <span v-if="appointment.paymentStatus === 'Completed'" class="text-success">Payment Completed</span>
                  <span v-else class="text-danger">Payment Pending</span>
                </td>
                <td>
                  <button class="btn-edit" @click="modalShow =!modalShow; fillCredentials(appointment)">
                    <img class="img-add" src="../../assets/Admin/edit.png" />
                  </button>
                  <button class="btn-remove" @click="removeApp(appointment.id)">
                    <img class="img-add" src="../../assets/Admin/delete.png" />
                  </button>
                  <b-modal v-model="modalShow" title="Edit Appointment" id="modal-scoped">
                    <b-form ref="form" @submit.stop.prevent="handleSubmit">
                      <label class="typo__label"><b>Appointment Status</b></label>
                      <multiselect v-model="specificStatus" :state="statusState" :options="statusOptions" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span class="multiselect__single" v-if="values.length && !isOpen">{{ values.length }} options selected</span>
                        </template>
                      </multiselect>
                    </b-form>

                    <template #modal-footer="{Save, Cancel}">
                      <b-button size="sm" variant="success" @click="editAppointment(appointment, specificStatus); modalShow =!modalShow">Save</b-button>
                      <b-button size="sm" variant="danger" @click="modalShow =!modalShow">Cancel</b-button>
                    </template>
                  </b-modal>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <h1 style="color:white">Footer</h1>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="./AdminOverview.js">
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

.button1 {
    background: rgb(51 41 134);
    width: 100px;
    height: 60px;
    color: white;
    padding: 6px;
    border-radius: 8px;
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
    left: 30px;
    width: 1100px;
}

.left-bottom {

    position: absolute;
    content: "";
    left: 0px;
    top: 450px;
    width: 80vh;
}

.profile {
    height: 100%;
    width: 100%;
    /**color: rgb(167, 167, 167);   */
    color: rgb(51 41 134);
    background: #D3D2E1;
}

.navbar {
    color: rgb(51 41 134)
}

.title-header {
    margin-left: 40px;
    margin-right: 20px;
}

.btn-primary {
    border-radius: 10px;
    margin-right: 20px;
    transform: translateY(-5px);

}

.btn-edit{
    border-color: #5430be;
    background-color: transparent;
    border-radius:10px;
    border-width:2px;
}

.btn-secondary {
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

.search-btn {
    border-radius: 20px;
    border-color: transparent;
    background-color: transparent;
    transform: translate(-35px, -1px);
}

.btn-remove {
    border-color: #5430be;
    background-color: transparent;
    border-radius: 10px;
    border-width: 2px;

}

.line {
    height: 2px;
    background-color: rgba(64, 57, 134, 1)
}

.img-add {
    max-height: 20px;
    transform: translateY(-1px);
}

.table {
    border-radius: 30px;
    color: #111B47;

}
</style>
