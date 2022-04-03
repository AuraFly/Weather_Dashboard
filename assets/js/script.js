// Global Variables
var cityBtn = document.querySelector('.cityBtn');
var citForm = document.querySelector('.cityForm');
var cityName;
var date = moment().format('l');
var datep1 = moment().add(1, 'days').format('MM/DD/YYYY');
var datep2 = moment().add(2, 'days').format('MM/DD/YYYY');
var datep3 = moment().add(3, 'days').format('MM/DD/YYYY');
var datep4 = moment().add(4, 'days').format('MM/DD/YYYY');
var datep5 = moment().add(5, 'days').format('MM/DD/YYYY');
var cityMem = [];
var his1;
var num = -1;

// Main api function
function getApi() {
    var cityName = document.querySelector('.cityForm').value;
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + 
    cityName + 
    '&appid=ce88f5a80328d0480f9f9290aa8d00ac';

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

//stores city name and lat and long coords for later use
      cityMem.push(cityName);
      localStorage.setItem('lat', data.coord.lat)
      localStorage.setItem('lon', data.coord.lon)

// Populates the main card with api response data
      let city = document.querySelector('.cityHeader');
      let temp = document.querySelector('.tempData');
      let wind = document.querySelector('.windData');
      let humid = document.querySelector('.humData');
      let tempMath = parseInt(((data.main.temp-273.15)*1.8)+32);

      city.textContent = ' ' + cityName.toUpperCase() + ' (' + date + ')';
      temp.textContent = ' ' + tempMath + 'F°';
      wind.textContent = ' ' + data.wind.speed + ' MPH';
      humid.textContent = ' ' + data.main.humidity + '%';
      }
    );

//Second api being setup for uv index and also using lat and long stored earlier
    let latI = localStorage.getItem('lat');
    let lonG = localStorage.getItem('lon');

    var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + 
    latI + 
    '&lon=' + 
    lonG + 
    '&exclude=hourly,daily&appid=ce88f5a80328d0480f9f9290aa8d00ac';

    fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

//populating the uv info and controls the color change if uv is in certain ranges
      let uvP = document.querySelector('.uvData');
      let uvDat = document.querySelector('.uvData');

      uvDat.textContent = ' ' + data.current.uvi;

      if (data.current.uvi <= 2) {
        uvP.style.backgroundColor = "green";
      } else if (data.current.uvi <= 7) {
        uvP.style.backgroundColor = "orange";
      } else if (data.current.uvi > 8) {
        uvP.style.backgroundColor = "red";
      }
      });


//setting up next api call for 5 day forcast
      var requestUrl3 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + 
      latI + 
      '&lon=' + 
      lonG + 
      '&appid=ce88f5a80328d0480f9f9290aa8d00ac';
  
      fetch(requestUrl3)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

// setting up to populate 5 day forcast cards
        let d1Date = document.querySelector('.day1Date');
        let d1Cloud = document.querySelector('.day1Cloud');
        let d1Temp = document.querySelector('.day1Temp');
        let d1Wind = document.querySelector('.day1Wind');
        let d1Hum = document.querySelector('.day1Humid');

        let d2Date = document.querySelector('.day2Date');
        let d2Cloud = document.querySelector('.day2Cloud');
        let d2Temp = document.querySelector('.day2Temp');
        let d2Wind = document.querySelector('.day2Wind');
        let d2Hum = document.querySelector('.day2Humid');

        let d3Date = document.querySelector('.day3Date');
        let d3Cloud = document.querySelector('.day3Cloud');
        let d3Temp = document.querySelector('.day3Temp');
        let d3Wind = document.querySelector('.day3Wind');
        let d3Hum = document.querySelector('.day3Humid');

        let d4Date = document.querySelector('.day4Date');
        let d4Cloud = document.querySelector('.day4Cloud');
        let d4Temp = document.querySelector('.day4Temp');
        let d4Wind = document.querySelector('.day4Wind');
        let d4Hum = document.querySelector('.day4Humid');

        let d5Date = document.querySelector('.day5Date');
        let d5Cloud = document.querySelector('.day5Cloud');
        let d5Temp = document.querySelector('.day5Temp');
        let d5Wind = document.querySelector('.day5Wind');
        let d5Hum = document.querySelector('.day5Humid');

      d1Date.textContent = datep1;
      d1Cloud.textContent = 'Clouds: ' + data.list[0].clouds.all + '%';
      d1Temp.textContent = 'Temp: ' + parseInt(((data.list[0].main.temp-273.15)*1.8)+32) + 'F°';
      d1Wind.textContent = 'Wind: ' + data.list[0].wind.speed + 'MPH';
      d1Hum.textContent = 'Humidity: ' + data.list[0].main.humidity + '';

      d2Date.textContent = datep2;
      d2Cloud.textContent = 'Clouds: ' + data.list[8].clouds.all + '%';
      d2Temp.textContent = 'Temp: ' + parseInt(((data.list[8].main.temp-273.15)*1.8)+32) + 'F°';
      d2Wind.textContent = 'Wind: ' + data.list[8].wind.speed + 'MPH';
      d2Hum.textContent = 'Humidity: ' + data.list[8].main.humidity + '';

      d3Date.textContent = datep3;
      d3Cloud.textContent = 'Clouds: ' + data.list[16].clouds.all + '%';
      d3Temp.textContent = 'Temp: ' + parseInt(((data.list[16].main.temp-273.15)*1.8)+32) + 'F°';
      d3Wind.textContent = 'Wind: ' + data.list[16].wind.speed + 'MPH';
      d3Hum.textContent = 'Humidity: ' + data.list[16].main.humidity + '';

      d4Date.textContent = datep4;
      d4Cloud.textContent = 'Clouds: ' + data.list[24].clouds.all + '%';
      d4Temp.textContent = 'Temp: ' + parseInt(((data.list[24].main.temp-273.15)*1.8)+32) + 'F°';
      d4Wind.textContent = 'Wind: ' + data.list[24].wind.speed + 'MPH';
      d4Hum.textContent = 'Humidity: ' + data.list[24].main.humidity + '';

      d5Date.textContent = datep5;
      d5Cloud.textContent = 'Clouds: ' + data.list[32].clouds.all + '%';
      d5Temp.textContent = 'Temp: ' + parseInt(((data.list[32].main.temp-273.15)*1.8)+32) + 'F°';
      d5Wind.textContent = 'Wind: ' + data.list[32].wind.speed + 'MPH';
      d5Hum.textContent = 'Humidity: ' + data.list[32].main.humidity + '';

// creates the list item for every time a city is searched and applies an ID +1 every time the api is ran
num++;

      var historyUl = document.querySelector('.historyUl');
      var historyLi = document.createElement('li');
      historyLi.setAttribute('id', 'list' + num)
      historyLi.appendChild(document.createTextNode(cityName));
      historyUl.appendChild(historyLi);
        });
}

//creating listeners for items that havent been made yet, I feel I could
//have dont this better, but ran out of time to complete.
//will come back to this.

$('body').on('click', '#list0', function () {
  citForm.value = cityMem[0];
  getApi();
})

$('body').on('click', '#list1', function () {
  citForm.value = cityMem[1];
  getApi();
})

$('body').on('click', '#list2', function () {
  citForm.value = cityMem[2];
  getApi();
})

$('body').on('click', '#list3', function () {
  citForm.value = cityMem[3];
  getApi();
})

$('body').on('click', '#list4', function () {
  citForm.value = cityMem[4];
  getApi();
})

$('body').on('click', '#list5', function () {
  citForm.value = cityMem[5];
  getApi();
})

$('body').on('click', '#list6', function () {
  citForm.value = cityMem[6];
  getApi();
})

$('body').on('click', '#list7', function () {
  citForm.value = cityMem[7];
  getApi();
})

$('body').on('click', '#list8', function () {
  citForm.value = cityMem[8];
  getApi();
})

$('body').on('click', '#list8', function () {
  citForm.value = cityMem[8];
  getApi();
})

$('body').on('click', '#list9', function () {
  citForm.value = cityMem[9];
  getApi();
})

$('body').on('click', '#list10', function () {
  citForm.value = cityMem[10];
  getApi();
})

$('body').on('click', '#list11', function () {
  citForm.value = cityMem[11];
  getApi();
})

$('body').on('click', '#list12', function () {
  citForm.value = cityMem[12];
  getApi();
})

$('body').on('click', '#list13', function () {
  citForm.value = cityMem[13];
  getApi();
})

$('body').on('click', '#list14', function () {
  citForm.value = cityMem[14];
  getApi();
})

$('body').on('click', '#list15', function () {
  citForm.value = cityMem[15];
  getApi();
})

$('body').on('click', '#list16', function () {
  citForm.value = cityMem[16];
  getApi();
})

$('body').on('click', '#list17', function () {
  citForm.value = cityMem[17];
  getApi();
})

$('body').on('click', '#list18', function () {
  citForm.value = cityMem[18];
  getApi();
})

$('body').on('click', '#list19', function () {
  citForm.value = cityMem[19];
  getApi();
})

//main listener for search button
cityBtn.addEventListener('click', getApi);

