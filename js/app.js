const api = {
    key: "68661e653aca871e7b8d890d9cc28776",
    url: "https://api.openweathermap.org/data/2.5/"
}
const  submit = document.querySelector(".values");
const input = document.querySelector(".values input");
submit.addEventListener("submit", e => {
    e.preventDefault();
    let myValues = input.value;
    console.log(myValues);

    fetch(`${api.url}weather?q=${myValues}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json()
    })
    .then(showResults)
    function showResults(weather) {
    //console.log(weather)
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather.weather[0].icon}.svg`;

        let city = document.querySelector(".city");
        city.innerText = `${weather.name}, ${weather.sys.country}`;
        console.log(city)

        let date = new Date();
        let currentDate = document.querySelector(".date");
        currentDate.innerText = myDate(date);

        let temperature =  document.querySelector(".temp");
        temperature.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;

        let icons = document.querySelector(".icons");
        let image = document.createElement("img");
        image.src = icon;
        icons.appendChild(image);
        icons.replaceChild(image, icons.children[0]);

        let describe = document.querySelector(".weather");
        describe.innerText = weather.weather[0].description.toString();

        let averageTemp = document.querySelector(".average");
        averageTemp.innerText = `${Math.round(weather.main.temp_min)}℃ / ${Math.round(weather.main.temp_max)}℃`;
        function myDate(d) {
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let day = weekdays[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day} , ${month}  ${date} ${year}`;
        }
    }

});


//New York68661e653aca871e7b8d890d9cc28776`;

// fetch(url
// .then(res => {
// return res.json()
// })
// .then(data => console.log(data.weather)
// )
// .catch(error => console.log("Error"))

// // function multiply (a,b){
// //     return a*b
// // }
// const arr = [10,20,30,40];
// console.log(arr.findIndex(v=>(v % 3)===0));