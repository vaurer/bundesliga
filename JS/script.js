let urlTeams = "https://api.football-data.org/v2/competitions/2002/teams";
let urlStandings = "https://api.football-data.org/v2/competitions/2002/standings?standingType=TOTAL";
//let urlTeam = "https://api.football-data.org/v2/teams/721/"
let clubLinks =[];

// fetch(urlBundesliga,{
//   method: "GET",
//   headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
// })
// .then(response => response.json())
// .then(function (data){
//   let temp3 ="";

// });

fetch(urlTeams, {
    method: "GET",
 headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
})

.then(response => response.json())
.then(function (data) {
  console.log(data)
    let temp="";

    data.teams.forEach(element => {https://api.football-data.org/v2/teams/721/
       //html += "<li><img src='"+element.crestUrl+"'/>"+element.name+"</li>"
      // clubLinks += "https://api.football-data.org/v2/teams/"+element.id+"/"
      clubLinks.push(element.id)
       temp += "<tr><td><img src='"+element.crestUrl+"' onclick='hideTeams(), showClub("+element.id+")' style='width:80px'/></a></td><td>"+element.name+"</td></tr>"
    });
    let html="<table><caption></caption>"+temp+"</table>";
    document.getElementById("teams").innerHTML = html;
    console.log(html)
for(a=0;a<clubLinks.length;a++){
  console.log(clubLinks[a])
}
});






fetch(urlStandings, {
  method: "GET",
headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
})
.then(response => response.json())
.then(function (data) {
  console.log(data)
    let htmlSTandings="";

    data.standings[0].table.forEach(element => {
      htmlSTandings += "<tr><td>"+element.position+"</td><td>"+element.team.name+"</td><td>"+element.playedGames+"</td><td>"+element.points+"</td></tr>"
    });
    let html2="<table><caption></caption><tr><th>Position</th><th>Fussballverein</th><th>Spielen</th><th>Punkte</th></tr>"+htmlSTandings+"</table>";
    document.getElementById("standings").innerHTML = html2;
    console.log(html2)
});

  function hideTeams() {
    document.getElementById("teams").style.display = "none"; 
  }
  function showTeams() {
    document.getElementById("teams").style.display = "flex"; 
  }

  function hideStandings() {
    document.getElementById("standings").style.display = "none"; 
  }
  function showStandings() {
    document.getElementById("standings").style.display = "flex"; 
  }
  function hideFirstView() {
    document.getElementById("fistView").style.display = "none"; 
  }
  function showFirstView() {
    document.getElementById("fistView").style.display = "flex"; 
  }

  function hideClub() {
    document.getElementById("club").style.display = "none"; 
  }
  
  function showClub(clubIdNumber) {
    document.getElementById("club").style.display = "flex"; 
    let urlClub = "https://api.football-data.org/v2/teams/"+clubIdNumber+"/"
    fetch(urlClub, {
      method: "GET",
    headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
    })
    .then(response => response.json())
    .then(function (data) {
      console.log(data)
        let htmlSquad="";
    
        data.squad.forEach(element => {
          htmlSquad += "<li>"+element.name+" " +element.role+" " +element.position+"</li>"
        });
        let temp3="<ol>"+htmlSquad+"</ol>";
        document.getElementById("club").innerHTML = temp3;
        console.log(htmlSquad)
    });
   
  }


  function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
