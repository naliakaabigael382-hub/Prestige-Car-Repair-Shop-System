
<template>
<div>
	<nav class="navbar navbar-expand-sm navbar-fixed-top">
		<div class="navbar-header">
			<a class="navbar-brand" href="/">
				<img src="../../assets/admin.png" style="max-width:25px; max-height:25px" />
			</a>
		</div>

		<div class="collapse navbar-collapse justify-content-center">
			<ul class="navbar-nav">
   			 	<li class="nav-item">
   			   		<a class="nav-link" href="#">About</a>
   				</li>
   				<li class="nav-item">
      				<a class="nav-link" href="#">Services</a>
    			</li>
    			<li class="nav-item">
     				<a class="nav-link" href="#">Contacts</a>
    			</li>
  			</ul>
		</div>

		<ul class="navbar-nav justify-content-end">
				<li class="nav-item">
					<a class="btn btn-primary nav-btn" href="/login"><b> Log In </b></a>
				</li>
		</ul>

		<ul class="navbar-nav justify-content-end">
				<li class="nav-item">
					&nbsp; &nbsp; <a class="btn btn-secondary nav-btn" href="/signup"><b> Sign Up </b></a>
				</li>
		</ul>


	</nav>


	<!-- Welcome Message -->
	<div>
		<div class="float-left">
			<div class="left-centered">
				<h1 id="title-welcome"> <b>Prestige Repairs </b> </h1>
				<h3 id="body-welcome">
					 When it comes to your car repair requirement our team offers a variety of services that will
					 ensure your vehicle is restored as close as possible to manufacturer standards. Handled by
					 certified technicians.
					 </h3>
			</div>
		</div>
		<div class="float-right">
			<img src="../../assets/landing-hero.png" />
		</div>
	</div>


	<!-- About Us -->
	<div>
		<div class="float-left">
			<img  class="img-about" src="../../assets/paint job 1.jpg"/>
		</div>
		<div class="float-right">
			<div class="right-centered">
			<h1 id="title-about"> <b> About Us </b> </h1>
			<h3 id="body-about">
				For over 40 years, Prestige Repairs has proudly serviced cars in the Greater Montreal region and surrounding
				communities. Our auto repair shop is locally owned and operated, and we are proud of our role in our community.
				Our business was founded on the principle of building up our local neighbordhoods by providing fast,reliable and honest
				vehicle care. Our technicians are always looking for ways to improve our service to make a better experience for you.
				Give us a call today (514)-111-1111 or book online for your next vehicle service!
			</h3>


			</div>
		</div>
	</div>

	<!-- Service -->
	<div>
		<div class="float-right">
			<img class="img-services" src="../../assets/towing.png"/>
		</div>
		<div class="float-left">
			<div class="left-centered-service">
			    <h1 id="title-about"> <b> Services  </b> </h1>
			    <h3 id="body-services">
					 Our ASE Certified mechanics are committed to quality for our community of drivers in Montreal,Quebec. We make sure
					 to continue providing to-quality services by providing biannual trainings. At Prestige, we offer a variety of services:

				</h3>

				<div class="row">
					<div class="col-3">
						<div class="Rectangle">
							<img class="service-images" src="../../assets/landingPage/car-repairService.png"/>
						</div>
						<p class="service-img-title"> Repairs </p>

					</div>
					<div class="col-3">
						<div class="Rectangle">
							<img class="service-images" src="../../assets/landingPage/car-wash.png"/>
						</div>
						<p class="service-img-title"> Car Wash </p>
					</div>
					<div class="col-3">
						<div class = "Rectangle">
							<img class="service-images" src="../../assets/landingPage/inspection.png"/>
						</div>
						<p class="service-img-title"> Inspection </p>
					</div>
					<div class="col-3">
						<div class = "Rectangle">
							<img class="service-images" src="../../assets/landingPage/oil.png"/>
						</div>
						<p class="Oil-title"> Oil Change </p>
					</div>
				</div>
				<div class = "row">
					<div class="col-3">
						<div class = "Rectangle">
							<img class="service-images" src="../../assets/landingPage/roadsideAssistance.png"/>
						</div>
						<p class="Oil-title"> Roadside Assistance </p>
					</div>
					<div class="col-3">
						<div class = "Rectangle">
							<img class="service-images" src="../../assets/landingPage/tire.png"/>
						</div>
						<p class="Oil-title"> Tire Change </p>
					</div>
					<div class="col-3">
						<div class = "Rectangle">
							<img class="service-images" src="../../assets/landingPage/tow-truck.png"/>
						</div>
						<p class="service-img-title"> Towing </p>
					</div>
				</div>
			</div>
		    </div>
		</div>

	<div >
		<div>
			<div class="float-left">
				<img src="../../assets/landingPage/hours.png" class="img-hours"/>
			</div>
			<div class = "float-right">
				<div class = "right-centered-hours">
					<h1 id= "title-about"> <b> Opening Hours </b> </h1>
					<table class = "table  tabled-bordered mydatatable" style="width:500px">
						<thead>

						</thead>
						<tbody style="text-align:center">
							<tr>
								<th scope="row">Monday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
							<tr>
								<th scope="row">Tuesday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
							<tr>
								<th scope="row">Wednesday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
							<tr>
								<th scope="row">Thursday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
							<tr>
								<th scope="row">Friday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
							<tr>
								<th scope="row">Saturday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
							<tr>
								<th scope="row">Sunday</th>
								<td> 9:00AM- 9:00 PM</td>
							</tr>
						</tbody>
						<tfoot>
							<h1 style="color:white"> Footer </h1>
						</tfoot>
					</table>
				</div>
			</div>


			<!-- Contact Us -->
			<div>
				<img  class= "rectangle" src="../../assets/landingPage/Rectangle.png"/>
			</div>
			<div class="footer">
				<div class = "float-right">

				</div>
			</div>

		</div>





	</div>


</div>
</template>


<script src="./Landing.js">
</script>

<style scoped>

	/** NAV- BAR CSS */
	.btn-sucess
	{
		background-color: transparent;

	}
	.btn-primary{
		background-color:rgb(51 41 134) !important;
		border-color: rgb(51 41 134);
		color:white;
		font-size:14px;
		font-family: Roboto;
		text-align:top;

	}
	.btn-secondary{
		background-color:rgb(51 41 134) !important;
		border-color: rgb(51 41 134);
		color:white;
		font-size:14px;
		font-family: Roboto;
		text-align:top;

	}

	.btn btn-primary nav-btn, .btn .btn-sucess nav-btn{
		float:right;
		font-family: Roboto;
		font-size: 14px;
	}
	.btn btn-secondary nav-btn, .btn .btn-sucess nav-btn{
		float:right;
		font-family: Roboto;
		font-size: 14px;
	}
	.nav-link{
		color:rgba(80, 95, 152, 1);
		font-family: Roboto;
		font-size: 14px;
	}

	/* ///////////////////////// */
	/** WELCOME CSS */
	/* ///////////////////////// */
	.welcome{
 	 position: relative;
 	 text-align: center;
	  margin-bottom:20px;
	}
	.left-centered {
		position: absolute;
		float:left;
  		top: 50%;
  		left: 50%;
		transform: translate(-600px, -20px);

	}

	.img-welcome{
		float:right;
		justify-content: end;

	}

	#title-welcome{
		margin-bottom:10px;
		color:rgb(51 41 134);
		font-size:50px;
		font-family:Roboto;
	}

	#body-welcome{
		margin-top:10px;
		text-align:left;
		line-height: 30px;
		max-width:600px;
		font-size:18px;
		color: rgba(80, 95, 152, 1)
	}

	/* ///////////////////////// */
	/** ABOUT US CSS */
	/* ///////////////////////// */
	.img-about{
		margin-top:50px;
		max-height:400px;
		transform: translateY(700px);
	}

	.right-centered
	{
		position: absolute;
		float:right;
  		top: 50%;
  		left: 50%;
		transform: translateY(500px);
		text-align:  center;

	}

	#title-about{
		margin-bottom:10px;
		color:rgb(51 41 134);
		font-size:36px;
		font-family:Roboto;
	}

	#body-about
	{
		margin-top:10px;
		text-align:left;
		line-height: 30px;
		max-width:600px;
		font-size:16px;
		color: rgba(80, 95, 152, 1)
	}

	/* ///////////////////////// */
	/** Service  CSS */
	/* ///////////////////////// */


	.img-services
	{
		margin-top:50px;
		max-height: 400px;
		float:right;
		transform: translate(900px,800px);
	}

	.left-centered-service
	{
		position: absolute;
		float:right;
  		top: 50%;
		left:10%;
		transform: translateY(1000px);
		text-align:  center;

	}

	.Rectangle
	{
		height:60px;
		width:60px;
		border-radius: 20px;
		background-color: #E6E6FA;

	}

	.service-img-title{
		text-align: left;
		color:rgba(80, 95, 152, 1)
	}

	.Oil-title{
		text-align: left;
		color:rgba(80, 95, 152, 1);
		font-size: 14px;
	}
	#body-services
	{
		margin-top:10px;
		text-align:left;
		line-height: 30px;
		max-width:400px;
		font-size:16px;
		color: rgba(80, 95, 152, 1)
	}

	.service-images{
		max-height:30px;
		transform: translateY(10px);
	}


	/* ///////////////////////// */
	/** Opening Hours  CSS */
	/* ///////////////////////// */
	.rectangle{


		width:100%;
		background-repeat: repeat;
		transform:translateY(1000px) ;
		height:600px;
	}
	.img-hours{
		max-height: 500px;
		transform: translate(100px, 900px);
	}

	.right-centered-hours{
		position: absolute;
		float:right;
  		top: 50%;
  		left: 60%;
		transform: translateY(1500px);
		text-align:  center;
	}
	#title-hours{
		margin-bottom:10px;
		color:rgb(51 41 134);
		font-size:36px;
		font-family:Roboto;
	}

	.footer{
		height: 300px;
		background-color: rgb(231,236,255);
		transform:translateY(800px);
	}
</style>
