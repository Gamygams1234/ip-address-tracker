var apiKey = "at_3ENWJgS0H76vhb3tfkh2zonTtr10S";
var map = L.map('mapid');


function displayMap(lat, long){

 map.setView([lat, long], 13);

     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([lat, long]).addTo(map)
            .openPopup();
}


fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data =>{ 
    console.log(data.ip);
    findLocationByIp(data.ip);
})

function findLocationByIp(ip){
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_3ENWJgS0H76vhb3tfkh2zonTtr10S&ipAddress=${ip}`)
	.then(response => response.json())
	.then(data => {console.log(data);
        displayMap(data.location.lat, data.location.lng);
        document.getElementById("ip-address").innerHTML = data.ip;
        document.getElementById("isp").innerHTML = data.isp;
        document.getElementById("utc").innerHTML =`UTC ${data.location.timezone}` ;
        document.getElementById("city").innerHTML =`${data.location.city}, ${data.location.region} ${data.location.postalCode}` ;
    })
	.catch(err => console.error(err));
}
function findLocationByWebpage(domain){
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_3ENWJgS0H76vhb3tfkh2zonTtr10S&domain=${domain}`)
	.then(response => response.json())
	.then(data => {console.log(data);
        displayMap(data.location.lat, data.location.lng);
        document.getElementById("ip-address").innerHTML = data.ip;
        document.getElementById("isp").innerHTML = data.isp;
        document.getElementById("utc").innerHTML =`UTC ${data.location.timezone}` ;
        document.getElementById("city").innerHTML =`${data.location.city}, ${data.location.region} ${data.location.postalCode}` ;
    })
	.catch(err => console.error(err));
}
function findLocationByEmail(domain){
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_3ENWJgS0H76vhb3tfkh2zonTtr10S&email=${domain}`)
	.then(response => response.json())
	.then(data => {console.log(data);
        displayMap(data.location.lat, data.location.lng);
        document.getElementById("ip-address").innerHTML = data.ip;
        document.getElementById("isp").innerHTML = data.isp;
        document.getElementById("utc").innerHTML =`UTC ${data.location.timezone}` ;
        document.getElementById("city").innerHTML =`${data.location.city}, ${data.location.region} ${data.location.postalCode}` ;
    })
	.catch(err => console.error(err));
}


document.getElementById("main-form").addEventListener("submit", function(e){
    e.preventDefault();
    let input = document.getElementById("map-input").value;

    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input)){

        findLocationByIp(input);
    }else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)){
       findLocationByEmail(input)
    }else{

        findLocationByWebpage(input);
    }

    console.log(document.getElementById("map-input").value);
}

);