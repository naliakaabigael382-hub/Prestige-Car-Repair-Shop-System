<template>
<div class="adminDashboard">
    <div class="sidebar">
        <div class="title">
            &nbsp; <router-link to="/"><img src="../../assets/admin.png" width="50px" length="50px"></router-link>
        </div>
        <div class="menu-items">
            <router-link :to="'/adminDashboard/Overview/' + this.admin.id" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Overview
                </div>

            </router-link>
            <router-link :to="'/adminDashboard/myAccount/' + this.admin.id" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    My Account
                </div>
            </router-link>
            <router-link :to="'/adminDashboard/TeamMembers/' + this.admin.id" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Mechanics
                </div>
            </router-link>
            <router-link :to="'/adminDashboard/Customers/' + this.admin.id" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Customers
                </div>
            </router-link>
            <router-link :to="'/'" active-class="active" tag="button" exact class="side-btn">
              <div class="link-container">
                   Log Out
               </div>
            </router-link>
        </div>

    </div>
    <div class="content">
        <router-view />
    </div>
</div>
</template>

<script>
import axios from 'axios'
var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost
var AXIOS = axios.create({
    baseURL: backendUrl,
    headers: {
        'Access-Control-Allow-Origin': frontendUrl
    }
})

export default {
    data() {
        return {
            admin: "",
            error: ""
        }
    },
    created: function () {
        var id = this.$route.params.userId
        AXIOS.get('/admin/'.concat(id))
            .then(response => {
                // JSON responses are automatically parsed.
                this.admin = response.data
            })
            .catch(e => {
                this.error = e
                console.log(e)
            })

    }
}
</script>

<style scoped>
.title {
    color: #D3D2E1;
    font-size: 24px;
    margin-top: 10px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 6px;
}

.menu-items>* {
    margin-top: 60px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #D3D2E1;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: #D3D2E1;
    color: rgb(51 41 134);
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before,
.side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: #D3D2E1;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before,
.side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: rgb(51 41 134);
}

.adminDashboard {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: rgb(51 41 134);
    height: 100vh;
    width: 100vw;
}

.content {
    background-color: #D3D2E1;
    border-radius: 10px;
    margin: 6px 6px 6px 0px;
}
</style>
