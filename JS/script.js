let urlTeams = "https://api.football-data.org/v2/competitions/2002/teams";
let urlStandings = "https://api.football-data.org/v2/competitions/2002/standings?standingType=TOTAL";
let clubLinks =[];


fetch(urlTeams, {
    method: "GET",
 headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
})

.then(response => response.json())
.then(function (data) {
  console.log(data)
    let temp="";

    data.teams.forEach(element => {
      clubLinks.push(element.id)
       temp += "<tr><td><img src='"+element.crestUrl+"' onclick='hideTeams(), showClub("+element.id+")' style='width:80px'/></a></td><td>"+element.name+"</td></tr>"
    });
    let html="<table><caption></caption><tr><th>Crest</th><th>Club</th>"+temp+"</table>";
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
  function hideMap() {
    document.getElementById("mapView").style.display = "none"; 
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
          let place=1;
          let pos="";
          if(element.position ==null){
          pos =element.role
          } else {
            pos=element.position
          }
          htmlSquad += "<tr><td>"+element.name+"</td><td>"+element.role+"</td><td>"+pos+"</td></tr>"
          pos="";
        });
        let temp3="<table><caption></caption><tr><th>Name</th><th>Role</th><th>Position</th></tr>"+htmlSquad+"</table>";
        document.getElementById("club").innerHTML = temp3;
        console.log(htmlSquad)
    });
   
  }
  function hideTodayMatches() {
    document.getElementById("todayMatches").style.display = "none"; 
  }
  function showTodayMatches() {
    document.getElementById("todayMatches").style.display = "flex"; 

    let urlTodayMatches = "https://api.football-data.org/v2/matches/"

    fetch(urlTodayMatches, {
      method: "GET",
      headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"} 
    })
    .then(response => response.json())
    .then(function (data){
      console.log(data)
      let htmlTodayMatches ="";

    data.matches.forEach(element => {
      if(element.competition.id=="2002"){
        let winner="";
        if(element.score.winner ==null){
          var time = new Date(element.utcDate);
          winner = time;
          console.log(winner)
        } else {
          winner=element.score.winner
        }
        htmlTodayMatches += "<tr><td>"+element.homeTeam.name+"</td><td>"+element.awayTeam.name+"</td><td><h6>"+winner+"</h6></td></tr>"
        winner="";
     }
    });

      let temp4="<table><caption></caption><tr><th>Home Team</th><th>Away Team</th><th>Winner</th></tr>"+htmlTodayMatches+"</table>";
        document.getElementById("todayMatches").innerHTML = temp4;
    });

  }


  function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function init() {
  const initialPosition = { lat: 45.763673, lng: 15.928536 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: initialPosition,
    zoom: 15
  });

  const marker = new google.maps.Marker({ map, position: initialPosition });

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`);

        marker.setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}