<template>
<div class="row no-gutters">
    <div class="col no-gutters">
        <div class="profile">
            <div class="name">
                <div class="text">
                    <h1> {{customer.name}} </h1>
                </div>
                <div class="ellipse">
                    <img src="../../assets/profile-default.png" width="60px" length="60px">

                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-5">
                        <div class="col">
                            Residence
                        </div>
                        <div class="w-100">
                        </div>
                        <b-group>
                            <b-input type="text" v-model="address" :value="address" readonly>
                            </b-input>
                            <br>
                        </b-group>
                    </div>
                    <div class="col-5">
                        <div class="col">
                            password
                        </div>
                        <div class="w-100">
                        </div>
                        <b-group>
                            <b-input type="password" v-model="password" :value="password" readonly>
                            </b-input>
                            <br>
                        </b-group>
                    </div>
                    <div class="w-100">
                    </div>
                    <div class="col">
                        <div class="row">
                            <div class="col-5">
                                <div class="col">
                                    Email
                                </div>
                                <div class="w-100">
                                </div>
                                <b-group>
                                    <b-input type="text" v-model="email" :value="email" readonly>
                                    </b-input>
                                    <br>
                                </b-group>
                            </div>
                            <div class="col-5">
                                <div class="col">
                                    Telephone
                                </div>
                                <div class="w-100">
                                </div>
                                <b-group>
                                    <b-input type="text" v-model="phone" :value="phone" readonly>
                                    </b-input>
                                </b-group>
                            </div>
                        </div>
                    </div>
                    <div class="w-100">
                    </div>
                    <div class="col">
                        <div class="row">
                            <div class="col-5">
                                <div class="col">
                                    Credit
                                </div>
                                <div class="w-100">
                                </div>
                                <b-group>
                                    <b-input type="password" v-model="credit" :value="credit" readonly>
                                    </b-input>
                                    <br>
                                </b-group>
                            </div>
                            <div class="col-5">
                                <div class="col">
                                    Debit Card
                                </div>
                                <div class="w-100">
                                </div>
                                <b-group>
                                    <b-input type="password" v-model="debit" :value="dedit" readonly>
                                    </b-input>
                                    <br>
                                </b-group>
                            </div>
                        </div>
                        <button class="button1" @click="modalShow=!modalShow; fillCredentials() " align="center">Edit Profile</button>

                        <b-modal v-model="modalShow" title="Edit Profile" id="modal-scoped">
                            <b-form ref="form" @submit.stop.prevent="handleSubmit">

                                <b-form-group label="Name" label-for="editName-input" invalid-feedback="Name is required" :state="editNameState">
                                    <b-form-input id="editName" type="text" v-model="editName" name="editName" :value="editName">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group label="Address" label-for="editAddress-input" invalid-feedback="Address is required" :state="editAddressState">
                                    <b-form-input id="editAddress" type="text" v-model="editAddress" name="editAddress" :value="editAddress">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group label="Phone" label-for="editPhone-input" invalid-feedback="Phone is required" :state="editPhoneState">
                                    <b-form-input id="editPhone" v-model="editPhone" type="text" name="editPhone" :value="editPhone">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group label="Password" label-for="editPassword-input" invalid-feedback="Password is required" :state="editPasswordState">
                                    <b-form-input id="editPassword" v-model="editPassword" type="text" name="editPassword" :value="editPassword">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group label="Credit" label-for="editCredit-input" invalid-feedback="Credit is required" :state="editCreditState">
                                    <b-form-input id="editCredit" v-model="editCredit" type="text" name="editCredit" :value="editCredit">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group label="Debit" label-for="editDebit-input" invalid-feedback="Debit is required" :state="editDebitState">
                                    <b-form-input id="editDebit" v-model="editDebit" type="text" name="editDebit" :value="editDebit">
                                    </b-form-input>
                                </b-form-group>

                            </b-form>
                            <template #modal-footer="{Save,Cancel}">
                                <!-- Emulate built in modal footer ok and cancel button actions -->
                                <b-button size="sm" variant="success" @click="editCustomers(editName, editPassword, editPhone, editCredit, editDebit, editAddress); modalShow=!modalShow"> Save </b-button>
                                <b-button size="sm" variant="danger" @click="modalShow =!modalShow">Cancel</b-button>

                            </template>
                        </b-modal>

                    </div>
                </div>
            </div>

            <!-- <div class="container3">

                <button class="button1" @click="editCustomer(oldEmail, newPassword, newPhone, newCredit, newDebit, newAddress)" align = "right">Edit Profile</button>
        </div>-->
        </div>
    </div>

    <div class="col no-gutters">
        <div class="rightside">
            <div class="row no-gutters">
                <div class="top">
                    <center><img src="../../assets/profile-default.png" width="100px" length="100px"></center>
                    <br>
                    <center> <b style="color: rgb(51 41 134); font-size: 20px;"> {{customer.name}}</b> </center>
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

<script src="./CustomerEditProfile.js">

</script>

<style src="vue-date-pick/dist/vueDatePick.css"></style><style scoped>
.profile {
    position: relative;
    top: 20px;
    right: -20px;
    width: 115%;
    height: 550px;
    border-radius: 25px;
    background: white;
    border: 3px solid;
    border-color: #D3D2E1;
    padding: 25px;
}

.name {
    position: absolute;
    width: 600px;
    height: 65px;
    left: 19px;
    top: 9px;
}

.text {
    position: absolute;
    width: 600px;
    height: 38px;
    top: 17px;
    left: 95px;
    font-style: normal;
    font-weight: 900;
    font-size: 26px;
    line-height: 38px;

    color: #37447E;
}

.ellipse {
    border-radius: 50%;
    position: absolute;
    width: 65px;
    height: 65px;
    left: 19px;
    top: 9px;
}

.container {
    position: absolute;
    left: 80px;
    top: 120px;
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 38px;
    color: #37447E;
}

.container2 {
    position: absolute;
    left: 305px;
    top: 120px;
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 38px;
    color: #37447E;
}

.container3 {
    position: absolute;
    left: 500px;
    top: 200px;
    background: rgb(51 41 134);
    color: white;
    padding: 6px;
    border-radius: 8px;
}

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

.button1 {
    background: rgb(51 41 134);
    width: 100px;
    height: 40px;
    color: white;
    border-radius: 8px;
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
}
</style>
