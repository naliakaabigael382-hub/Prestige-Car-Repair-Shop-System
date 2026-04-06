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
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
          <br>
          <h1>Log In </h1>
          <form>
            <br>
              <label for="email" style="color:white">Email: </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="customerEmail" value="" style="transform: translateX(1px); width:300px"><br>
              <label for="password" style="color:white">Password: </label>
              <input type="password" v-model="customerPassword" value="" style="width:300px"><br>

          </form>
          <br>
          &nbsp;&nbsp; <button class = "button1" @click="logIn(customerEmail, customerPassword)">Log In</button>
        </div>

        <h2>{{error}}</h2>
    </div>

</template>

<script src="./LogIn.js">
</script>

<style>
.main {
    color: white;
    font-weight: 600;
    height: 100%;
    width: 100%;
}

.container {
  height: 260px;
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