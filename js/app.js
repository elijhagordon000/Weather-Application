var cityInput = document.querySelector("#city");
var searchBtn = document.querySelector("#searchBtn");
var searchHist = [];
var api = "ae4973b1ba4645ed50039009fec92200";


function citySearch(city){
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api)
    .then(function(res){return res.json()})
    .then(function(data){
        console.log(data);
    
    var lon =data.coord.lon;
    var lat = data.coord.lat;
    
    fetch("http://api.openweathermap.org/data/2.5/onecall?lat="+lat + "&lon=" +lon +"&appid=" + api)
    .then(function(res){return res.json()})
    .then(function(data){
        console.log(data)
    
        var date =new Date(data.current.dt * 1000).toLocaleDateString()
        var future =data.daily.slice(0, 5)
        
    
    document.querySelector("#weather").innerHTML= `
    <h3>  Date: ${date}</h3>
    <img src= 'http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'>
    <h4> Temparature ${data.current.temp} </h4>
    <h4 class = 'uvi'> UVI: ${data.current.uvi} </h4>
    <h4> Wind Speed ${data.current.wind_speed} </h4>`
   

   
    console.log('before'+document.querySelector("#future").childNodes.length);
    //if #future doesn't have child elements add em 
    if (document.querySelector("#future").childNodes.length === 0){
    for(var i=0; i<future.length; i++){
    
        var date =new Date(future[i].dt * 1000).toLocaleDateString();
        
    document.querySelector("#future").innerHTML += 
        `
        <li id ='day${i}' > Date: ${date} </li>
        <li id ='day${i}' > temprature ${future[i].temp.day}</li>
        <li id ='day${i}' class = 'uvi'> uvi ${future[i].uvi}</li>
        <li id ='day${i}' > wind speed ${future[i].wind_speed}</li>
        
        `
        console.log(document.querySelector('#days'+i),'HYEYYY',  document.querySelector(".uvi"));
      
    }
    var uviArr = document.querySelectorAll('.uvi');
    for(var j = 0; j< uviArr.length; j++){
        var uvi = uviArr[j].innerText.split(" ")
        console.log(uvi[1],j);
        if(uvi[1] < 2){
            uviArr[j].style.color = "green";
        }
        else if((3<uvi[1] )&& (uvi[1] < 5)){
            console.log('entered');
            uviArr[j].style.color =  "yellow";
        }
        else if((5<uvi[1])&& (uvi[1] < 8)){
            console.log('entered');
           uviArr[j].style.color =  "orange";
        }
        else{
            console.log('entered');
            uviArr[j].style.color = "red";
        }
    }
}
else{
    

    document.querySelector('#future').innerHTML = '';
    for(var i=0; i<future.length; i++){
    
        var date =new Date(future[i].dt * 1000).toLocaleDateString();
        
        document.querySelector("#future").innerHTML +=  
        `
        <li id ='day${i}' > Date: ${date} </li>
        <li id ='day${i}' > temprature ${future[i].temp.day}</li>
        <li id ='day${i}' class = 'uvi'> uvi ${future[i].uvi}</li>
        <li id ='day${i}' > wind speed ${future[i].wind_speed}</li>
        
        `
  
}




}

    console.log('after'+document.querySelector("#future").childNodes.length);
    
    
    
    })
    })
}


function saveCity(city){
    var newCity = document.createElement('button');
    newCity.style.display = 'block'; 
    newCity.style.background = 'red';
    newCity.innerHTML = city;
    console.log('newCity'+newCity.innerHTML);
    newCity.onclick = function(){
        console.log('clicked');
        citySearch(newCity.innerHTML);
    };
    document.body.appendChild(newCity);
}
searchBtn.onclick = function(e){
    e.preventDefault();
    var city =cityInput.value;
    citySearch(city);
    saveCity(city)
}
    
//saving city to local storage


// searchBtn.addEventListener('click',function(event){
//     searchHist.append(cityInput.value);//maybe
//     var newCity = document.createElement('button');
//     newCity.style.display = 'block'; 
//     newCity.innerText = 'Can you click me?';
//     event.preventDefault();
// })

// searchBtn.onclick = function citySearch(e){
//     e.preventDefault()
//     var city =cityInput.value;
//     fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api)
//     .then(function(res){return res.json()})
//     .then(function(data){console.log(data);
    
//     var lon =data.coord.lon;
//     var lat = data.coord.lat;
    
//     fetch("http://api.openweathermap.org/data/2.5/onecall?lat="+lat + "&lon=" +lon +"&appid=" + api)
//     .then(function(res){return res.json()})
//     .then(function(data){
//         console.log(data)
    
//         var date =new Date(data.current.dt * 1000).toLocaleDateString()
//         var future =data.daily.slice(0, 5)
    
//     document.querySelector("#weather").innerHTML= `
//     <h3>  Date: ${date}</h3>
//     <img src= 'http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'>
//     <h4> Temparature ${data.current.temp} </h4>
//     <h4> UVI: ${data.current.uvi} </h4>
//     <h4> Wind Speed ${data.current.wind_speed} </h4>`
    
    
//     for(var i=0; i<future.length; i++){
    
//         var date =new Date(future[i].dt * 1000).toLocaleDateString()
//     document.querySelector("#future").innerHTML +=
//         `
//         <li> Date: ${date} </li>
//         <li> temprature ${future[i].temp.day}</li>
//         <li> uvi ${future[i].uvi}</li>
//         <li> wind speed ${future[i].wind_speed}</li>
        
//         `
//     }
    
    
    
//     })
//     })
    
    
    