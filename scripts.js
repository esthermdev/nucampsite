const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Portland";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("There was an error!", error);
    }
}

fetchWeather();

function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDescription = document.getElementById('weather-description');

    const image = document.createElement('img');
    const icon = data.weather[0].icon;
    image.src = `https://openweathermap.org/img/w/${icon}.png`
    image.alt = "An icon of the current weather."
    weatherIcon.appendChild(image);

    const temperature = document.createElement('p');
    temperature.textContent = data.main.temp + '\u00B0'
    weatherTemp.appendChild(temperature);

    const description = document.createElement('p');
    description.textContent = data.weather[0].description;
    weatherDescription.appendChild(description);
}