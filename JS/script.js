let urlTeams = "https://api.football-data.org/v2/competitions/2002/teams";

fetch(urlTeams, {
    method: "GET",
 headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
})

.then(response => response.json())
.then(function (data) {
    let temp="";

    data.teams.forEach(element => {
       //html += "<li><img src='"+element.crestUrl+"'/>"+element.name+"</li>"
       temp += "<tr><td><img src='"+element.crestUrl+"' style='width:80px'/></td><td>"+element.name+"</td></tr>"
    });
    let html="<table><caption></caption>"+temp+"</table>";
    document.getElementById("teams").innerHTML = html;
    console.log(html)
});

// function hideShow() {
//     var x = document.getElementById("teams");
//     if (x.style === "visibility: hidden") {
//       x.style = "visibility: visible";
//     } else {
//       x.style = "visibility: hidden";
//     }
//   }

  function hideTeams() {
    document.getElementById("teams").style.visibility = "hidden"; 
  }
  
  function showTeams() {
    document.getElementById("teams").style.visibility = "visible"; 
  }