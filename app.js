const API_KEY = 'f9df2d7c6e89631c71bb7de05d14b3c8';
const searchBar = document.querySelector('.search_bar')
const searchBarButton = document.querySelector('.search_container > button')
const displayWeatherContainer = document.querySelector('.display_weather_container')
const errorContainer = document.querySelector('.error-container')
let tempFormat = 'celsius'
const url = 'https://api.openweathermap.org/data/2.5/weather?q='

function fixCases(string) {
    return string.split(' ').map((item, index) => item.replace(item.slice(0, 1), item.slice(0, 1).toUpperCase())).join(' ')
}

async function getData(location) {
    try {
        const response = await fetch(`${url}${location}&appid=${API_KEY}`, { mode: "cors" })
        const data = await response.json();
        (response.ok) ? displayWeather(data) : handleError(response.statusText)
    } catch (error) {
        console.log(error)
    }
}

function handleError(response) {
    errorContainer.innerHTML = response
    errorContainer.classList.add('animate')
    setTimeout(() => {
        errorContainer.classList.remove('animate')
    }, 1500)
}

searchBarButton.addEventListener('click', () => (searchBar.value != '') ? getData(searchBar.value) : handleError('Please enter a city/country'))

function displayWeather(data) {
    const weatherContainer = document.querySelector('.display_weather'),
        locationDiv = weatherContainer.querySelector('.display_location'),
        descDiv = weatherContainer.querySelector('.weather_description'),
        tempDiv = weatherContainer.querySelector('.weather_temp'),
        maxTempDiv = weatherContainer.querySelector('.temp_max'),
        minTempDiv = weatherContainer.querySelector('.temp_min'),
        feelsLikeDiv = weatherContainer.querySelector('.feels_like'),
        humidityDiv = weatherContainer.querySelector('.humidity'),
        minTempSpan = document.createElement('span');
    locationDiv.textContent = data.name;
    descDiv.textContent = fixCases(data.weather[0].description)
    tempDiv.textContent = 'Temperature: ' + calcTemp(data.main.temp)
    maxTempDiv.textContent = 'Max Temperature: ' + calcTemp(data.main.temp_max)
    minTempDiv.textContent = 'Min Temperature: ' + calcTemp(data.main.temp_min)
    feelsLikeDiv.textContent = 'Feels Like: ' + calcTemp(data.main.feels_like)
    humidityDiv.textContent = 'Humidity: ' + data.main.humidity + '%'
}

function calcTemp(temp) {
    if (tempFormat === 'celsius') {
        return Math.round((temp - 273.15)) + '°C'
    } else {
        return Math.round(((temp - 273.15 + 32) * 1.8)) + `°F`
    }
}

getData('London')



// function autoDisplayWeather(data) {
//     //Simpler solution:
//     const dataKeys = []
//     const dataValues = []
//     for (const[key, value] of Object.entries(data.main)) {
//         dataKeys.push(key)
//         dataValues.push(value)
//     }
//     dataKeys.forEach((item,index) => {
//         const x = document.createElement('div')
//         x.classList.add(item)
//         x.innerHTML = item +' '+dataValues[index] + ' '
//         displayWeatherContainer.appendChild(x)
//     })
//     // const dataArray = []
//     // for (let x in data.main) {
//     //     if (data.main.hasOwnProperty(x)) {
//     //         let xValue = {};
//     //         xValue[x] = data.main[x]
//     //         dataArray.push(xValue)
//     //     }
//     // }
//     // // console.log(dataArray)
//     // dataArray.forEach(item=> {
//     //     for (const[key, value] of Object.entries(item)) {
//     //         console.log(value)
//     //     }
//     // })
// }



