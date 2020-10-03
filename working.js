// On-load
window.addEventListener('load', () => {
	let longitude;
	let latitude;
	let tempDescription = document.querySelector(".temperature-description");
	let tempDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let tempSection = document.querySelector(".temperature");
	let dayMood = document.querySelector(".temperature-description-mood");
	const tempSpan = document.querySelector(".temperature span");


	function setWeatherDetails(position) {
		longitude = position.coords.longitude;
		latitude = position.coords.latitude;

		const proxy = 'http://cors-anywhere.herokuapp.com/';
		const api = `${proxy}https://api.darksky.net/forecast/c9df135483f3f71511ddf718b1fa3cde/${latitude},${longitude}`;

		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				const { time, temperature, summary, icon } = data.currently;
				tempDegree.textContent = temperature;
				tempDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				let dayTime = 'day';

				if ((new Date(time).getHours() + data.offset) < 12) {
					dayMood.textContent = 'Good Morning';
				} else if ((new Date(time).getHours() + data.offset) < 18) {
					dayMood.textContent = 'Good Evening';
				} else if ((new Date(time).getHours() + data.offset) > 18) {
					dayMood.textContent = 'Good Night';
					dayTime = 'night';

				}

				let celcius = (temperature - 32) * (5 / 9);

				//Icon setting
				setIcon(icon, dayTime);

				//convert celcius and farenheit
				tempSection.addEventListener("click", () => {
					if (tempSpan.textContent === "F") {
						tempSpan.textContent = "C";
						tempDegree.textContent = Math.floor(celcius);
					}
					else {
						tempDegree.textContent = temperature;
						tempSpan.textContent = "F";
					}
				});
			});
	}

	const position = {
		coords: {
			longitude: 0,
			latitude: 0,
		}
	}
	setWeatherDetails(position);
	// Getting position of location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			setWeatherDetails(position);
		});
	}
	else {
		h1.textContent = "Weather Out of Track";
	}

	function setIcon(icon, dayTime) {
		const baseURL = './assets/images/animated/';
		if (icon.includes('cloud') || icon.includes('fog')) {
			if (icon.includes('day') || dayTime == 'day') {
				document.getElementById('weatherIcon').src = baseURL + 'cloudy.svg';
			} if (icon.includes('night') || dayTime == 'night') {
				document.getElementById('weatherIcon').src = baseURL + 'cloudy-night-1.svg';
			}
		} else if (icon.includes('wind')) {
			document.getElementById('weatherIcon').src = baseURL + 'cloudy-day-1.svg';
		} else if (icon.includes('clear')) {
			if (icon.includes('day' || dayTime === 'day')) {
				document.getElementById('weatherIcon').src = baseURL + 'day.svg';
			} if (icon.includes('night' || dayTime === 'night')) {
				document.getElementById('weatherIcon').src = baseURL + 'night.svg';
			}
		} else if (icon.includes('snow')) {
			document.getElementById('weatherIcon').src = baseURL + 'snow-mid.svg';
		} else if (icon.includes('rain')) {
			document.getElementById('weatherIcon').src = baseURL + 'rainy-mid.svg';
		} else if (dayTime === 'day') {
			document.getElementById('weatherIcon').src = baseURL + 'day.svg';
		} else if (dayTime === 'night') {
			document.getElementById('weatherIcon').src = baseURL + 'night.svg';
		}
	}
});