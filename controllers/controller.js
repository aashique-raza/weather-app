import fetch from 'node-fetch';




const homePage = async (req, res) => {
    const city_name = req.query.city
    if (city_name) {
        // console.log(req.query)
        // console.log(req.query.city)

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.API_KEY}`);
        // console.log(response)
        const data = await response.json();
        // console.log(data.cod)
        // console.log(data)
        if (data.cod == 404) {
            res.render('home', { weather: null, message: data.message })
        } else {
            // console.log(data.main.temp)
            const celcius_temp = Math.round(data.main.temp - 273.15)
            // console.log(celcius_temp)
            const weatherIcon = data.weather[0].icon;
            const alldata = {
                icon: data.weather[0].icon,
                desc: data.weather[0].description,
                temp: celcius_temp,
                country: data.sys.country,
                city: data.name,
                weatherIconURL: `https://openweathermap.org/img/wn/${weatherIcon}.png`

            }
            console.log(data.weather[0].icon, data.weather[0].description)
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const d = new Date();
            const m = months[d.getMonth()]
            const day = days[d.getDay()]
            let hour = d.getHours();
            let minute = d.getMinutes()

            if (hour > 12) {
                hour = hour - 12;
            }
            if (hour < 10) {
                hour = "0" + hour
            }
            if (minute < 10) {
                minute = "0" + minute
            }

            // console.log(d.getDate())
            const DATE = {
                month: m,
                day: day,
                date: d.getDate(),
                h: hour,
                m: minute
            }
            res.render('home', { weather: alldata, time: DATE })
        }

    }
    else {
        res.render('home', { weather: null, message: 'please enter city name' })
    }

}





export { homePage }