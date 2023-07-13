<template>
  <div
    id="loading"
    wire:loading
    class="fixed top-0 left-0 right-0 overflow-hidden bottom-0 w-full h-screen z-50 overflow-hidden bg-bleck flex flex-col items-center justify-center"
  >
    <div
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
    ></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white my-2">
      This may take a few seconds, please don't close this page.
    </p>
  </div>
  <div id="content" class="bg-bleck pt-8 h-full w-full flex text-white">
    <div class="flex flex-col min-w-[25%] p-4 w-2/6 mx-8">
      <div class="text-white bg-bleck-1 px-8 py-4 rounded-xl">
        <h1 class="">Now</h1>
        <div class="flex items-center justify-between my-4">
          <span class="text-6xl" id="temp">&deg;</span>
          <img :src="src" alt="" class="w-20" id="tdyIcon" />
        </div>
        <span class="text-sm" id="tdyStatus"></span>
        <hr class="style1 mt-2 mb-4" />
        <div class="flex items-center my-2 gap-2">
          <i class="fa-solid fa-calendar-days"></i>
          <span id="tdyDate" class="txt-blk"></span>
        </div>
        <div class="flex items-center my-2 gap-2">
          <i class="fa-solid fa-location-dot"></i>
          <span id="userLoc" class="txt-blk"></span>
        </div>
      </div>
      <h1 class="py-4 text-2xl">9 Days Forecast</h1>
      <div class="flex flex-col bg-bleck-1 p-4 rounded-xl gap-1" id="forecast"></div>
    </div>
    <div class="flex flex-col m-4 mr-8 w-full">
      <div class="flex flex-col bg-bleck-1 rounded-xl">
        <h1 class="m-4">Today's Highlights</h1>
        <div class="flex p-4">
          <div class="flex-col w-3/6 mx-2 bg-bleck rounded-xl flex p-4">
            <h1 class="p-4 txt-blk">Air Quality Index</h1>
            <div class="flex items-center justify-around pb-6 p-4">
              <i class="fa-solid fa-wind fa-3x"></i>
              <div class="flex flex-col gap-2 items-center">
                <span class="txt-blk">WS</span>
                <span id="wSpeed" class="text-5xl"></span>
              </div>
              <div class="flex flex-col gap-2 items-center">
                <span class="txt-blk">WD</span>
                <span id="wDegree" class="text-5xl"></span>
              </div>
              <div class="flex flex-col gap-2 items-center">
                <span class="txt-blk">WD</span>
                <span id="wDirection" class="text-5xl"></span>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-3/6 bg-bleck rounded-xl p-4">
            <h1 class="txt-blk p-4">Sunrise & Sunset</h1>
            <div class="flex items-center justify-around p-4 h-full">
              <i class="fa-regular fa-sun fa-3x"></i>
              <div class="flex flex-col gap-2">
                <span class="txt-blk">Sunrise</span>
                <span id="Sunrise" class="text-3xl"></span>
              </div>
              <i class="fa-regular fa-moon fa-3x"></i>
              <div class="flex flex-col gap-2">
                <span class="txt-blk">Sunset</span>
                <span id="Sunset" class="text-3xl"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-around m-6 mr-5 gap-4">
          <div class="flex bg-bleck rounded-xl p-4 flex-col w-full">
            <h1 class="pb-3 txt-blk">Humidity</h1>
            <div class="flex py-4 items-center justify-between">
              <i class="fa-solid fa-droplet fa-2x"></i>
              <span class="text-4xl" id="humdity"></span>
            </div>
          </div>
          <div class="flex bg-bleck rounded-xl p-4 flex-col w-full">
            <h1 class="pb-3 txt-blk">Pressure</h1>
            <div class="flex py-4 items-center justify-between">
              <i class="fa-solid fa-water fa-2x"></i>
              <span class="text-4xl" id="Pressure"></span>
            </div>
          </div>
          <div class="flex bg-bleck rounded-xl p-4 flex-col w-full">
            <h1 class="pb-3 txt-blk">Visibility</h1>
            <div class="flex py-4 items-center justify-between">
              <i class="fa-regular fa-eye fa-2x"></i>
              <span class="text-4xl" id="Visibility"></span>
            </div>
          </div>
          <div class="flex bg-bleck rounded-xl p-4 flex-col w-full">
            <h1 class="pb-3 txt-blk">Feels Like</h1>
            <div class="flex py-4 items-center justify-between">
              <i class="fa-solid fa-temperature-half fa-2x"></i>
              <span class="text-4xl" id="feelsLike"></span>
            </div>
          </div>
        </div>
      </div>
      <h1 class="text-2xl my-4">Today at</h1>
      <ul id="tempPerH" class="flex gap-3 flex-[1_1_100%] flex-wrap min-w-[110px]"></ul>
    </div>
  </div>
</template>
<script>
$(document).ready(function () {
  $('#loading').show()
  https: $.getJSON('https://api.ipify.org?format=json', function (data) {
    const ipAddress = data.ip
    $('#gfg').html(ipAddress)
    fetch(
      'http://api.weatherapi.com/v1/forecast.json?key=1a203c096ea140559c3144101230907 &q=' +
        ipAddress +
        '&days=10&aqi=no&alerts=no'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        $('#temp').text(data.current.feelslike_c + '℃')
        $('#tdyStatus').text(data.current.condition.text)
        let iconUrl = data.current.condition.icon
        $('#tdyIcon').attr('src', iconUrl)
        $('#tdyDate').text(data.location.localtime)
        $('#userLoc').text(data.location.country + ', ' + data.location.name)
        $('#wSpeed').text(data.current.wind_mph)
        $('#wDegree').text(data.current.wind_degree)
        $('#wDirection').text(data.current.wind_dir)
        $('#humdity').text(data.current.humidity + '%')
        $('#Pressure').text(data.current.pressure_mb + 'hPa')
        $('#Visibility').text(data.current.vis_km + 'km')
        $('#feelsLike').text(data.current.feelslike_c + '℃')
        $('#Sunrise').text(data.forecast.forecastday[0].astro.sunrise)
        $('#Sunset').text(data.forecast.forecastday[0].astro.sunset)
        for (let i = 1; i < 10; i++) {
          let forecastTemp = data.forecast.forecastday[i].day.avgtemp_c
          let forecastTempIcon = data.forecast.forecastday[i].day.condition.icon
          let forecastDate = data.forecast.forecastday[i].date
          $('#forecast').append(
            '<div class="justify-between text-xl my-2 gap-4 flex items-center"><div class="flex items-center"><img src=' +
              forecastTempIcon +
              ' class="w-9" alt="" /><span class="">' +
              forecastTemp +
              '</span></div><span class="">' +
              forecastDate +
              '</span></div>'
          )
        }
        for (let i = 0; i < 24; i++) {
          let hour = data.forecast.forecastday[0].hour[i].time.split(' ')[1]
          let hourTempIcon = data.forecast.forecastday[0].hour[i].condition.icon
          let hourTemp = data.forecast.forecastday[0].hour[i].condition.text.split(' ')[0]
          $('#tempPerH').append(
            '<li class="flex flex-col justify-center items-center bg-bleck-1 p-4 rounded-xl"><span class="">' +
              hour +
              '</span><img src="' +
              hourTempIcon +
              '" alt="" class="w-12"  /><span class="">' +
              hourTemp +
              '</span></li>'
          )
        }
        $('#content').show()
        $('#loading').hide()
      })
  }).catch((error) => {
    console.error('Error:', error)
  })
})
</script>
