// On-load
window.addEventListener('load',()=>{
	let longitude;
	let latitude;
	let tempDescription = document.querySelector(".temperature-description");
	let tempDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let tempSection = document.querySelector(".temperature");
	const tempSpan = document.querySelector(".temperature span");

	// Getting position of location
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;

			const proxy = 'http://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/c9df135483f3f71511ddf718b1fa3cde/${latitude},${longitude}`;

			fetch(api)
			.then(response=>{
				return response.json();
			})
			.then(data=>{
				console.log(data);
				const { temperature, summary, icon} = data.currently;
				tempDegree.textContent = temperature;
				tempDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;

				let celcius = (temperature - 32) * ( 5 / 9 );

				//Icon setting
				setIcon(icon, document.querySelector(".icon"));

				//convert celcius and farenheit
				tempSection.addEventListener("click", () => {
					if (tempSpan.textContent === "F") {
						tempSpan.textContent = "C";
						tempDegree.textContent = Math.floor(celcius);
					}
					else{
						tempDegree.textContent = temperature;
						tempSpan.textContent = "F";
					}
				});
			});
		});
	}
	else{
		h1.textContent ="Weather Out of Track";
	}

	function setIcon(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});