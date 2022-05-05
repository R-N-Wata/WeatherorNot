

 const preciper =document.querySelector('.precip')
 const pres =document.querySelector('.pressure')
 const temp =document.querySelector('.temp')
 const uv =document.querySelector('.uv')
 const vis =document.querySelector('.vis')
 const descrip =document.querySelector('.descrip')
 const title = document.querySelector('h1')
 const windspeed = document.querySelector('.windspeed')
 const country = document.querySelector('.country')

 document.querySelector('button').addEventListener('click', weatherReport)


 function weatherReport(){

    let location = document.querySelector('input').value;

    if (location.length == 0){
            title.innerText = 'Current Weather'       
    }else {
          title.innerText = `Weather in ${location.toUpperCase()}`
    }
  

    // document.querySelector('.info').classList.toggle('hidden')

    fetch(`http://api.weatherstack.com/current?access_key=a48bb56dc76537d31e51ed3355de7933&query=${location.toLowerCase()}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)

            preciper.innerText = data.current.precip
            pres.innerText = data.current.pressure
            temp.innerText =`${data.current.temperature}°C`
            uv.innerText = data.current.uv_index
            descrip.innerText = data.current.weather_descriptions[0];

            let icon = data.current.weather_descriptions[0]

            windspeed.innerText =data.current.wind_speed
            country.innerText = data.location.country
            setIcons(icon, document.querySelector('.icon'))
    
    })
        .catch(err => {
            console.log(`error ${err}`)
        });

        function setIcons(icon, iconID){
            const skycons = new Skycons({color: 'black'})
            const currentIcon = icon.replace(/[^A-Z0-9]/gi, ' ').replace(/\s/g, '_').toUpperCase() + '_DAY'

            skycons.play()
            console.log(currentIcon)
            return skycons.set(iconID, Skycons[currentIcon])
        }
 }
 