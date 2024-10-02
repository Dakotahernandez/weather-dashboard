const apiKey = '8ff65fc1562af5273faaa8e36966ea2d'; 

// Function to determine which icon to use based on weather condition
function getCustomIcon(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return 'icons/sunny.png';
        case 'clouds':
            return 'icons/cloudy.png';
        case 'rain':
        case 'drizzle':
            return 'icons/rainy.png';
        case 'thunderstorm':
            return 'icons/thunderstorm.png';
        case 'snow':
            return 'icons/snow.png'; 
        case 'mist':
        case 'haze':
        case 'fog':
        case 'smoke':
            return 'icons/haze.png';
        case 'dust':
        case 'sand':
            return 'icons/dust.png'; 
        case 'squall':
        case 'tornado':
            return 'icons/tornado.png'; 
        default:
            return 'icons/default.png';
    }
}

// Function to fetch weather data and update UI
async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    const forecastInfo = document.getElementById('forecast');

    try {
        // Fetch current weather data in Fahrenheit
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
        const data = await response.json();

        // Get custom icon for current weather
        const iconSrc = getCustomIcon(data.weather[0].main);

        // Display current weather with icon
        weatherInfo.innerHTML = `
            <h3>${data.name}</h3>
            <img class="weather-icon" src="${iconSrc}" alt="${data.weather[0].description}" />
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °F</p> <!-- Updated to show Fahrenheit -->
        `;

        // Fetch 5-day forecast data in Fahrenheit
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
        const forecastData = await forecastResponse.json();

        // Display forecast data with weather icons
        forecastInfo.innerHTML = forecastData.list.slice(0, 5).map(item => {
            const forecastIconSrc = getCustomIcon(item.weather[0].main);
            return `
                <div class="forecast-day">
                    <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                    <img class="weather-icon" src="${forecastIconSrc}" alt="${item.weather[0].description}" />
                    <p>${item.weather[0].description}</p>
                    <p>${item.main.temp} °F</p> <!-- Updated to show Fahrenheit -->
                </div>
            `;
        }).join('');

    } catch (error) {
        weatherInfo.innerHTML = '<p>City not found. Please try again.</p>';
    }
}
