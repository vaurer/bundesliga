let urlTeams = "https://api.football-data.org/v2/competitions/2002/teams";

fetch(urlTeams, {
    method: "GET",

   
 headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
    
})

.then(response => response.json())
    
.then(function (data) {
    let html="";
    data.teams.forEach(element => {
       html += "<li><img src='"+element.crestUrl+"'/>"+element.name+"</li>"
    });
    document.getElementById("teams").innerHTML = html;
});
