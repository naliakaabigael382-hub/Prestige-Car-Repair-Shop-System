<!-- Team Members -->
<template>

    <div class="profile">
       <nav class="navbar">
            <span class="navbar-brand mb-0 h1">
                <div class="row">
                    <form onSubmit="return false;">
                        <input type="text" v-model="s" value="" class="search-input" placeholder="  Search">
                    </form>

                  <button class="search-btn" @click="searchForMechanics(s)"> <img class="img-add" src="../../assets/Admin/search.png"/> </button>

                  <b-button v-b-modal.modal-prevent-closing class="btn-primary"> Add Mechanic <img class="img-add" src="../../assets/Admin/plus.png"/> </b-button>

                        <b-modal
                        id="modal-prevent-closing"
                        ref="modal"
                        title="Add New Mechanic"
                        @show="resetModal"
                        @hidden="resetModal"
                        @ok="createMechanic(name,password,phone,email,value,mondayStart,mondayEnd,tuesdayStart,tuesdayEnd,wednesdayStart,wednesdayEnd,thursdayStart,thursdayEnd,fridayStart,fridayEnd,saturdayStart,saturdayEnd)"
                        >

                        <!-- Personal Information part of the form -->
                        <label> <b>Personal Information  </b> </label>
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

                            <!-- For WorkHours -->
                            <label> <b> Work Hours </b> </label>

                            <div class="row">
                                <p style="margin-left:20px;margin-right:28px"> Monday </p>
                                <div class="col">
                                    <b-form-input
                                    id="mondayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="mondayStart"
                                    placeholder="Start Time"
                                    >
                                    </b-form-input>

                                </div>
                                <div class="col">
                                 <b-form-input
                                    id="mondayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="mondayEnd"
                                    placeholder="End Time"
                                >
                                </b-form-input>
                            </div>
                        </div>

                                <div class="row">
                                <p style="margin-left:20px;margin-right:25px">Tuesday</p>
                                <div class="col">
                                    <b-form-input
                                    id="tuesdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="tuesdayStart"
                                    placeholder="Start Time"
                                    >
                                    </b-form-input>

                                </div>
                                <div class="col">
                                 <b-form-input
                                    id="tuesdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="tuesdayEnd"
                                    placeholder="End Time"
                                >
                                </b-form-input>
                            </div>
                        </div>


                                <div class="row">
                                <p style="margin-left:20px">Wednesday</p>
                                <div class="col">
                                    <b-form-input
                                    id="wednesdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="wednesdayStart"
                                    placeholder="Start Time"
                                    >
                                    </b-form-input>

                                </div>
                                <div class="col">
                                 <b-form-input
                                    id="wednesdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="wednesdayEnd"
                                    placeholder="End Time"
                                >
                                </b-form-input>
                            </div>
                        </div>

                            <div class="row">
                                <p style="margin-left:20px;margin-right:18px">Thursday</p>
                                <div class="col">
                                    <b-form-input
                                    id="thursdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="thursdayStart"
                                    placeholder="Start Time"
                                    >
                                    </b-form-input>

                                </div>
                                <div class="col">
                                 <b-form-input
                                    id="thursdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="thursdayEnd"
                                    placeholder="End Time"
                                >
                                </b-form-input>
                            </div>
                        </div>

                               <div class="row">
                                <p style="margin-left:20px;margin-right:40px">Friday</p>
                                <div class="col">
                                    <b-form-input
                                    id="fridayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="fridayStart"
                                    placeholder="Start Time"
                                    >
                                    </b-form-input>

                                </div>
                                <div class="col">
                                 <b-form-input
                                    id="fridayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="fridayEnd"
                                    placeholder="End Time"
                                >
                                </b-form-input>
                            </div>
                        </div>

                            <div class="row">
                                <p style="margin-left:20px;margin-right:21px">Saturday</p>
                                <div class="col">
                                    <b-form-input
                                    id="saturdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="saturdayStart"
                                    placeholder="Start Time"
                                    >
                                    </b-form-input>

                                </div>
                                <div class="col">
                                 <b-form-input
                                    id="saturdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="saturdayEnd"
                                    placeholder="End Time"
                                >
                                </b-form-input>
                            </div>
                        </div>
                    </b-form>

                    <!-- Capabilities part of the form -->
                    <label class="typo__label"> <b> Capabilities </b> </label>
                    <multiselect v-model="value" :state="capabilitiesState" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                            <span class="multiselect__single" v-if="values .length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                        </template>
                    </multiselect>
                </b-modal>

            </div>
        </span>
    </nav>


  <!--
        The Table containing all the mechanic information#D3D2E1 -->
        <div class="container mt-3 mb-3" style="background-color:white; border-radius:30px">
          <table class = "table table-striped tabled-bordered mydatatable" style="width:1100px">
              <thead>
                    <tr style="text-align:center;  border-radius:30px;">
                        <th> Name </th>
                        <th>Email</th>
                        <th> Number</th>
                        <th> Work Schedule </th>
                        <th>Capabilities</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mechanic in mechanics" style="text-align:center">
                        <td>{{ mechanic.name }}</td>
                        <td>{{ mechanic.email }}</td>
                        <td>{{ mechanic.phone }}</td>
                        <td>
                            <table class="table">
                                <tbody>
                                    <td> Mo <br> {{mechanic.timeSlots[0].startTimeFormat}}-{{mechanic.timeSlots[0].endTimeFormat}} </td>
                                    <td> Tu <br> {{mechanic.timeSlots[1].startTimeFormat}}-{{mechanic.timeSlots[1].endTimeFormat}}</td>
                                    <td> We <br> {{mechanic.timeSlots[2].startTimeFormat}}-{{mechanic.timeSlots[2].endTimeFormat}}</td>
                                    <td> Th <br> {{mechanic.timeSlots[3].startTimeFormat}}-{{mechanic.timeSlots[3].endTimeFormat}}</td>
                                    <td> Fr <br> {{mechanic.timeSlots[4].startTimeFormat}}-{{mechanic.timeSlots[4].endTimeFormat}}</td>
                                    <td> Sa <br> {{mechanic.timeSlots[5].startTimeFormat}}-{{mechanic.timeSlots[5].endTimeFormat}}</td>
                                </tbody>
                            </table>

                        </td>
                        <td>
                            <span v-for="service in mechanic.services" style="text-align:center">
                                {{service.serviceType}}
                            </span>
                        </td>
                        <td>
                        <button class="btn-edit" @click="modalShow =!modalShow; fillCredentials(mechanic)"> <img  class="img-add" src="../../assets/Admin/edit.png"/>  </button>
                        <button class="btn-remove" @click="removeMechanic(mechanic.id)"> <img  class="img-add" src="../../assets/Admin/delete.png"/>  </button>
                          <b-modal v-model="modalShow" title="Edit Profile" id="modal-scoped">
                            <b-form ref="form" @submit.stop.prevent="handleSubmit">

                              <label><b>Personal Information</b></label>

                              <b-form-group
                                label="Name"
                                label-for="editName-input"
                                invalid-feedback="Name is required"
                                :state="editNameState"
                              >
                                <b-form-input
                                  id="editName"
                                  type="text"
                                  v-model="editName"
                                  name="editName"
                                  :value="editName"
                                />
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
                                />
                              </b-form-group>

                              <b-form-group
                                label="Password"
                                label-for="editPassword-input"
                                invalid-feedback="Password is required"
                                :state="editPasswordState"
                              >
                                <b-form-input
                                  id="editPassword"
                                  v-model="editPassword"
                                  type="password"
                                  name="editPassword"
                                  :value="editPassword"
                                />
                              </b-form-group>

                              <label><b>Work Hours</b></label>

                              <div class="row">
                                <p style="margin-left: 20px; margin-right: 28px">Monday</p>
                                <div class="col">
                                  <b-form-input
                                    id="editMondayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="editMondayStart"
                                    :value="editMondayStart"
                                  />
                                </div>
                                <div class="col">
                                  <b-form-input
                                    id="editMondayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="editMondayEnd"
                                    :value="editMondayEnd"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <p style="margin-left: 20px; margin-right: 25px">Tuesday</p>
                                <div class="col">
                                  <b-form-input
                                    id="editTuesdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="editTuesdayStart"
                                    :value="editTuesdayStart"
                                  />
                                </div>
                                <div class="col">
                                  <b-form-input
                                    id="editTuesdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="editTuesdayEnd"
                                    :value="editTuesdayEnd"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <p style="margin-left: 20px">Wednesday</p>
                                <div class="col">
                                  <b-form-input
                                    id="editWednesdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="editWednesdayStart"
                                    :value="editWednesdayStart"
                                  />
                                </div>
                                <div class="col">
                                  <b-form-input
                                    id="editWednesdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="editWednesdayEnd"
                                    :value="editWednesdayEnd"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <p style="margin-left: 20px; margin-right: 18px">Thursday</p>
                                <div class="col">
                                  <b-form-input
                                    id="editThursdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="editThursdayStart"
                                    :value="editThursdayStart"
                                  />
                                </div>
                                <div class="col">
                                  <b-form-input
                                    id="editThursdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="editThursdayEnd"
                                    :value="editThursdayEnd"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <p style="margin-left: 20px; margin-right: 40px">Friday</p>
                                <div class="col">
                                  <b-form-input
                                    id="editFridayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="editFridayStart"
                                    :value="editFridayStart"
                                  />
                                </div>
                                <div class="col">
                                  <b-form-input
                                    id="editFridayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="editFridayEnd"
                                    :value="editFridayEnd"
                                  />
                                </div>
                              </div>

                              <div class="row">
                                <p style="margin-left: 20px; margin-right: 21px">Saturday</p>
                                <div class="col">
                                  <b-form-input
                                    id="editSaturdayStart"
                                    type="time"
                                    class="form-control"
                                    v-model="editSaturdayStart"
                                    :value="editSaturdayStart"
                                  />
                                </div>
                                <div class="col">
                                  <b-form-input
                                    id="editSaturdayEnd"
                                    type="time"
                                    class="form-control"
                                    v-model="editSaturdayEnd"
                                    :value="editSaturdayEnd"
                                  />
                                </div>
                              </div>

                              <b-form-group>
                                <label class="typo__label"><b>Capabilities</b></label>
                                <multiselect
                                  v-model="value"
                                  :state="capabilitiesState"
                                  :options="options"
                                  :multiple="true"
                                  :close-on-select="false"
                                  :clear-on-select="false"
                                  :preserve-search="true"
                                  placeholder="Pick some"
                                  label="name"
                                  track-by="name"
                                  :preselect-first="true"
                                >
                                  <template slot="selection" slot-scope="{ values, search, isOpen }">
          <span class="multiselect__single" v-if="values.length && !isOpen">
            {{ values.length }} options selected
          </span>
                                  </template>
                                </multiselect>
                              </b-form-group>

                              <template #modal-footer="{ Save, Cancel }">
                                <!-- Emulate built-in modal footer ok and cancel button actions -->
                                <b-button
                                  size="sm"
                                  variant="success"
                                  @click="editMechanic(
          editName, editPassword, editPhone, value,
          editMondayStart, editMondayEnd,
          editTuesdayStart, editTuesdayEnd,
          editWednesdayStart, editWednesdayEnd,
          editThursdayStart, editThursdayEnd,
          editFridayStart, editFridayEnd,
          editSaturdayStart, editSaturdayEnd
        ); modalShow = !modalShow"
                                >
                                  Save
                                </b-button>
                                <b-button size="sm" variant="danger" @click="modalShow = !modalShow">
                                  Cancel
                                </b-button>
                              </template>
                            </b-form>
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

<script src="./AdminAddTeamMember.js">
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
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

.btn-edit {
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
