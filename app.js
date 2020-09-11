const api = {
    key: "68661e653aca871e7b8d890d9cc28776",
    url: "https://api.openweathermap.org/data/2.5/"
}
const  submit = document.querySelector(".values");
const input = document.querySelector(".values input");
submit.addEventListener("submit", e => {
    e.preventDefault();
    let myValues = input.value;
    //console.log(myValues);

    fetch(`${api.url}weather?q=${myValues}&units=metric&appid=${api.key}`)
    .then(response => {
        // console.log(res)
        // console.log(data)y
        return response.json()
    })
    .then(data=>
        {
    //function showResults(weather) {
    //console.log(weather)
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;

        let city = document.querySelector(".city");
        city.innerText = `${data.name}, ${data.sys.country}`;
        console.log(city)

        let date = new Date();
        let currentDate = document.querySelector(".date");
        currentDate.innerText = myDate(date);

        let temperature =  document.querySelector(".temp");
        temperature.innerHTML = `${Math.round(data.main.temp)}<span>℃</span>`;

        let icons = document.querySelector(".icons");
        let image = document.createElement("img");
        image.src = icon;
        icons.appendChild(image);
        icons.replaceChild(image, icons.children[0]);

        let describe = document.querySelector(".weather");
        describe.innerText = data.weather[0].description;

        let averageTemp = document.querySelector(".average");
        averageTemp.innerText = `${Math.round(data.main.temp_min)}℃ / ${Math.round(data.main.temp_max)}℃`;
        function myDate(d) {
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let day = weekdays[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day} , ${month}  ${date} ${year}`;
        }
    })
    // localStorage.setItem("storeData", "Oluwadamilola");
    // const myData = localStorage.getItem("storeData")
    // console.log(myData)
    
})
