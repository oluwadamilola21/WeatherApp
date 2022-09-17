const api = {
    key: "c67f72a488c3c396d7bc4067b207bd1d",
    url: "https://api.openweathermap.org/data/2.5/"
}
const  submit = document.querySelector(".values");
const input = document.querySelector(".values input");
submit.addEventListener("submit", e => {
    e.preventDefault();
    let myValues = input.value;

    fetch(`${api.url}weather?q=${myValues}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json()
    })
    .then(data=>
        {
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
        image.alt = ""
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
        
        sendToLocalStorage()
        
    })
    
    function sendToLocalStorage() {
        let setCity = document.querySelector(".city").innerText;
        localStorage.setItem("is-city", setCity);

        let  setDate = document.querySelector(".date").innerText;
        localStorage.setItem("is-Date", setDate)

        let setTemp = document.querySelector(".temp").innerHTML;
        localStorage.setItem("is-temp", setTemp);

       
        let setIcons = document.querySelector("img").src;
        localStorage.setItem("is-icon", setIcons);

        let setDes = document.querySelector(".weather").innerText;
        localStorage.setItem("is-description", setDes);

        let setAverageTemp = document.querySelector(".average").innerText;
        localStorage.setItem("is-average", setAverageTemp);
    }

submit.reset();
input.focus();
})
function getFromLocalStorage(){
    let getCity = localStorage.getItem("is-city");
    document.querySelector(".city").innerText = getCity;


    let  getDate = localStorage.getItem("is-Date",);
    document.querySelector(".date").innerText = getDate;
    

    let getTemp =  localStorage.getItem("is-temp")
    document.querySelector(".temp").innerHTML = getTemp;
    

    let getDes = localStorage.getItem("is-description");
    document.querySelector(".weather").innerText = getDes
    

     let getAverageTemp = localStorage.getItem("is-average");
    document.querySelector(".average").innerText = getAverageTemp
    
}
window.onload = function(){
    getFromLocalStorage();
}

