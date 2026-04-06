import axios from 'axios'
var config = require('../../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = config.dev.backendHost

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

export default {
  name: "Landing",
  data () {
    return {
	  error: ""
    }
  },
  created: function () {
    // Initializing persons from backend
	AXIOS.get('/admins')
    .then(response => {
	  // JSON responses are automatically parsed.
		if(response.data.length == 0){
			AXIOS.post('/admin/'.concat("admin"), {}, 
	  		{params: {
				password: "admin",
				phone: "1234567",
				email: "admin@gmail.com"}})
			.then(response => {

				AXIOS.post('/services/'.concat("CarRepair?price=200"), {}, {})
				.then(response => {

					AXIOS.post('/services/'.concat("OilChange?price=100"), {}, {})
					.then(response => {

						AXIOS.post('/services/'.concat("RegularCheckup?price=120"), {}, {})
						.then(response => {

							AXIOS.post('/services/'.concat("CarWash?price=50"), {}, {})
							.then(response => {

								AXIOS.post('/services/'.concat("TireChange?price=150"), {}, {})
								.then(response => {

									AXIOS.post('/services/'.concat("RoadsideAssistance?price=200"), {}, {})
									.then(response => {

										AXIOS.post('/services/'.concat("Towing?price=160"), {}, {})
										.then(response => {

											AXIOS.post('/services/'.concat("CarInspection?price=50"), {}, {})
											.then(response => {

												AXIOS.post('/services/'.concat("Other?price=1000"), {}, {})
												.then(response => {

													console.log("all done")
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

			})
    		.catch(e => {
      			this.error = e
			})
	  	}
	})
    .catch(e => {
      this.error = e
    })
    }
}
