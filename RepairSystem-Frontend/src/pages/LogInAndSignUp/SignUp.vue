<template>
          
    <div class="main">
          <div style = "position: absolute; left: 5px; top: 10px"> &nbsp; <router-link to="/"><img src="../../assets/admin.png" width = "50px" length = "50px"></router-link>
          </div>
       
        <div class="leftCar">
            <img src="../../assets/LogInCarLeft.svg" alt="Left Car" width="600" height="430">
        </div>

        <div class="rightCar">
            <img src="../../assets/LogInCarRight.svg" alt="Right Car" width="500" height="383">
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
          <br>
          <h1>Sign Up </h1>
          <br>
            <form > 
               <label for="email">Email: </label>
                <input type="text" v-model="newEmail" value="" style="transform: translateX(33px); width:250px"><br>
               <label for="password">Password:</label>
                <input type="password" v-model="newPassword" value="" style="transform: translateX(21px); width:250px"><br>
               <label for="repeat-password">Repeat Password:</label>
                <input type="password" v-model="newRepeatPassword" value="" style="width:250px"><br>
               <label for="name">Name:</label>
                <input type="text" v-model="newName" value="" style="transform: translateX(34px); width:250px"><br>
               <label for="number">Phone Number:</label>
                <input type="text" v-model="newNumber" value="" style="transform: translateX(7px); width:250px"><br>
               <label for="address">Address:</label>
                <input type="text" v-model="newAddress" value="" style="transform: translateX(26px); width:250px"><br>
               <label for="credit">Credit:</label>
                <input type="password" v-model="newCredit" value="" style="transform: translateX(32px); width:250px"><br>
               <label for="debit">Debit:</label>
                <input type="password" v-model="newDebit" value="" style="transform: translateX(35px); width:250px"><br>
            </form>
            <br>
             <button class = "button1" @click="createCustomer(newEmail, newPassword, newName, newNumber, newAddress, newCredit, newDebit)">Sign Up</button>
        </div>

        <h2>{{error}}</h2>
    </div>

</template>

<script src="./SignUp.js">
</script>

<style>
.main {
    color: white;
    font-weight: 600;
    height: 100%;
    width: 100%;
}

.container {
  height: 510px;
  width: 450px;
  border-radius: 30px;
  justify-content: center;
  text-align:  center;
  background-color:rgba(51, 41, 134, 0.8);
}

.leftCar {
  position: absolute;
  bottom: 100px;
  left: 20px;
  width: 600px;
  height: 430px;
}

.rightCar {
  position: absolute;
  bottom: 65px;
  right: 20px;
  width: 500px;
  height: 383px;
}

label {
  color: white;
  font-size: 12px;
  padding: 8px;
}

.button1 {
  background: rgb(51 41 134);
  width: 80px;
  height: 30px;
  color: white;
  padding: 2px;
  border-radius: 8px;
}
</style>