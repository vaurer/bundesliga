start()
function start(){
let urlLeagues = "https://api.football-data.org/v2/competitions/";

fetch(urlLeagues, {
    method: "GET",
    headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"} 
})
.then(response => response.json())
.then(function(data) {
    console.log(data)
    let leaguesLI=""
    let avaiableLeagueNo = 0;
    data.competitions.forEach(element => {
        if(element.plan=="TIER_ONE" && element.area.countryCode!="INT"&& element.area.countryCode!="EUR"){
            avaiableLeagueNo ++;
            let urlEmblem =""
            if(element.area.ensignUrl !== null){
                urlEmblem = "<img src='"+element.area.ensignUrl+"' style='width:80px'/>" 
            } else {
                urlEmblem = ""
            }
        leaguesLI += "<tr onclick=showLigaStandings("+element.id+")><th scope='row'>"+avaiableLeagueNo+"</th><td>"+element.name+"</td><td>"+urlEmblem+"</td></tr>"
        urlEmblem =""
    }

    });
    let leaguesList = "<table class='table table-striped table-dark'><thead><tr> <th scope='col'>#</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'>Competition</th><td>"+leaguesLI+"</td></tr></tbody></table>"
    document.getElementById("competitions").innerHTML = leaguesList
})
}
function showLigaStandings(LigaNumber){
    let urlLigaStsndings = "https://api.football-data.org/v2/competitions/"+LigaNumber+"/standings?standingType=TOTAL"

    fetch(urlLigaStsndings, {
        method: "GET",
        headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"} 
    })
    .then(response => response.json())
    .then(function (data) {
        let leaguePositionLI=""
        data.standings[0].table.forEach(element => {
            leaguePositionLI += "<tr onclick=showClub("+element.team.id+")><th scope='row'>"+element.position+"</th><td><img src='"+element.team.crestUrl+"' style='width:80px'/></td><td>"+element.team.name+"</td><td>"+element.playedGames+"</td><td>"+element.won+"</td><td>"+element.draw+"</td><td>"+element.lost+"</td><td>"+element.points+"</td><td>"+element.goalsFor+" : "+element.goalsAgainst+"</td><td>"+element.goalDifference+"</td></tr>"
        
        });
        let leaguesStandings = "<table class='table table-striped table-dark'><thead><tr> <th scope='col'>#</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'></th><th scope='row'>Club<th scope='row'>Games</th><th scope='row'>Won</th><th scope='row'>Draw</th><th scope='row'>Lost</th><th scope='row'>Points</th><th scope='row'>Goals</th><th scope='row'>Diff</th></th><td>"+leaguePositionLI+"</td></tr></tbody></table>"
        document.getElementById("competitions").innerHTML = leaguesStandings
    });
}

function showClub(clubIdNumber) {

    let urlClub = "https://api.football-data.org/v2/teams/"+clubIdNumber+"/"
    fetch(urlClub, {
      method: "GET",
    headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
    })
    .then(response => response.json())
    .then(function (data) {
      console.log(data)
        let htmlSquad="";
        let clubName = data.name
        let clubCrest = data.crestUrl
        let clubAddress = data.address
        let clubWeb = data.website
        let clubEmail = data.email
        let clubPhone = data.phone
        let clubFounded = data.founded
        let clubVenue = data.venue
    
        data.squad.forEach(element => {
          let place=1;
          let pos="";
          if(element.position ==null){
          pos = " ";
          } else {
            pos=element.position
          }
          htmlSquad += "<tr onclick='showPlayer("+element.id+")'><td>"+element.name+"</td><td>"+element.role+"</td><td>"+pos+"</td></tr>"
          pos="";
        });
        let firstdiv= "<div><h1>"+clubName+"</h1><img src='"+clubCrest+"' style='width:80px'/></div>"
        let clubMembers=firstdiv+"<table class='table table-striped table-dark'><thead><tr> <th scope='col'>Name</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'>Role</th><td>"+htmlSquad+"</td></tr></tbody></table>"
        document.getElementById("competitions").innerHTML = clubMembers;
        console.log(htmlSquad)
    });
   
  }
  
  function showPlayer(playerID) {
    let urlPlayer = "https://api.football-data.org/v2/players/"+playerID+"/";
    console.log(urlPlayer)
  
    fetch(urlPlayer, {
      method: "GET",
   headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
    })
    .then(response => response.json())
    .then(function (data){
        let id = data.id
        let name = data.name
        let firstName = data.firstName
        let lastName = data.lastName
        let dateOfBirth = data.dateOfBirth
        let countryOfBirth = data.countryOfBirth
        let nationality = data.nationality
        let position = data.position
     
  
      let playerData = "<tr><td>"+name+"</td></tr><tr><td>"+position+"</td></tr><tr><td>"+nationality+"</td></tr><tr><td>"+dateOfBirth+"</td></tr>"
      let playerTable="<table class='table table-striped table-dark'><thead><tr> <th scope='col'>Person info</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'></th><td>"+playerData+"</td></tr></tbody></table>"
      document.getElementById("competitions").innerHTML = playerTable;
    });
  }

  function showTodayMatches() {

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
        let winner ="";
        let homeTeamWinner =element.score.fullTime.homeTeam
        let awayTeamWinner =element.score.fullTime.awayTeam
        let homeTeamName= element.homeTeam.name
        let awayTeamName= element.awayTeam.name
        if(element.score.winner == null){
          var time = new Date(element.utcDate);
          winner = time;
          console.log(winner)
        // } else if(element.score.winner === homeTeamWinner){
        //     winner=homeTeamName
        } else {
            winner=awayTeamName
        }
    
        htmlTodayMatches += "<tr><td id='home'>"+element.homeTeam.name+"</td><td id='away'>"+element.awayTeam.name+"</td><td><h6>"+element.score.fullTime.homeTeam+" : "+element.score.fullTime.awayTeam+"</h6></td></tr>"
        winner="";
    });
    
    let temp4="<table><caption></caption><tr><th>Home Team</th><th>Away Team</th><th>Winner</th></tr>"+htmlTodayMatches+"</table>";
    document.getElementById("competitions").innerHTML = temp4;
});

}

// let urlTeams = "https://api.football-data.org/v2/competitions/2002/teams";
// let urlStandings = "https://api.football-data.org/v2/competitions/2002/standings?standingType=TOTAL";
// // https://api.football-data.org/v2/players/349/
// let clubLinks =[];


// fetch(urlTeams, {
//     method: "GET",
//  headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
// })

// .then(response => response.json())
// .then(function (data) {
//   console.log(data)
//     let temp="";

//     data.teams.forEach(element => {
//       clubLinks.push(element.id)
//        temp += "<tr><td><img id='img' src='"+element.crestUrl+"' onclick='hideTeams(), showClub("+element.id+")' style='width:80px'/></td><td onclick='hideTeams(), showClub("+element.id+")'>"+element.name+"</td></tr>"
//     });
//     let html="<table><caption></caption><tr><th>Crest</th><th>Club</th>"+temp+"</table>";
//     document.getElementById("teams").innerHTML = html;
//     console.log(html)
// for(a=0;a<clubLinks.length;a++){
// }
// });

// fetch(urlStandings, {
//   method: "GET",
// headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
// })
// .then(response => response.json())
// .then(function (data) {
//   console.log(data)
//     let htmlSTandings="";

//     data.standings[0].table.forEach(element => {
//       htmlSTandings += "<tr><td>"+element.position+"</td><td>"+element.team.name+"</td><td>"+element.playedGames+"</td><td>"+element.points+"</td></tr>"
//     });
//     let html2="<table><caption></caption><tr><th>Position</th><th>Fussballverein</th><th>Spielen</th><th>Punkte</th></tr>"+htmlSTandings+"</table>";
//     document.getElementById("standings").innerHTML = html2;
//     console.log(html2)
// });

//   function hideTeams() {
//     document.getElementById("teams").style.display = "none"; 
//   }
//   function showTeams() {
//     document.getElementById("teams").style.display = "flex"; 
//   }

//   function hideStandings() {
//     document.getElementById("standings").style.display = "none"; 
//   }
//   function showStandings() {
//     document.getElementById("standings").style.display = "flex"; 
//   }
//   function hideFirstView() {
//     document.getElementById("fistView").style.display = "none"; 
//   }
//   function showFirstView() {
//     document.getElementById("fistView").style.display = "flex"; 
//   }
//   function hideClub() {
//     document.getElementById("club").style.display = "none"; 
//   }
//   function hideMap() {
//     document.getElementById("mapView").style.display = "none"; 
//   }
//   function showClub(clubIdNumber) {
//     document.getElementById("club").style.display = "flex"; 
//     let urlClub = "https://api.football-data.org/v2/teams/"+clubIdNumber+"/"
//     fetch(urlClub, {
//       method: "GET",
//     headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
//     })
//     .then(response => response.json())
//     .then(function (data) {
//       console.log(data)
//         let htmlSquad="";
    
//         data.squad.forEach(element => {
//           let place=1;
//           let pos="";
//           if(element.position ==null){
//           pos = " ";
//           } else {
//             pos=element.position
//           }
//           htmlSquad += "<tr><td onclick='hideClub(), showPlayer("+element.id+")'>"+element.name+"</td><td>"+element.role+"</td><td>"+pos+"</td></tr>"
//           pos="";
//         });
//         let temp3="<table><caption></caption><tr><th>Name</th><th>Role</th><th>Position</th></tr>"+htmlSquad+"</table>";
//         document.getElementById("club").innerHTML = temp3;
//         console.log(htmlSquad)
//     });
   
//   }
//   function hideTodayMatches() {
//     document.getElementById("todayMatches").style.display = "none"; 
//   }
//   function showTodayMatches() {
//     document.getElementById("todayMatches").style.display = "flex"; 

//     let urlTodayMatches = "https://api.football-data.org/v2/matches/"

//     fetch(urlTodayMatches, {
//       method: "GET",
//       headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"} 
//     })
//     .then(response => response.json())
//     .then(function (data){
//       console.log(data)
//       let htmlTodayMatches ="";

//     data.matches.forEach(element => {
//       if(element.competition.id=="2002"){
//         let winner="";
//         if(element.score.winner ==null){
//           var time = new Date(element.utcDate);
//           winner = time;
//           console.log(winner)
//         } else {
//           winner=element.score.winner
//         }
//         htmlTodayMatches += "<tr><td>"+element.homeTeam.name+"</td><td>"+element.awayTeam.name+"</td><td><h6>"+winner+"</h6></td></tr>"
//         winner="";
//      }
//     });

//       let temp4="<table><caption></caption><tr><th>Home Team</th><th>Away Team</th><th>Winner</th></tr>"+htmlTodayMatches+"</table>";
//         document.getElementById("todayMatches").innerHTML = temp4;
//     });

//   }


//   function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//   return parent.appendChild(el);
// }

// function init() {
//   const initialPosition = { lat: 45.763673, lng: 15.928536 };

//   const map = new google.maps.Map(document.getElementById('map'), {
//     center: initialPosition,
//     zoom: 15
//   });

//   const marker = new google.maps.Marker({ map, position: initialPosition });

//   if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`);

//         marker.setPosition({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });

//         map.panTo({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       },
//       err => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
//     );
//   } else {
//     alert('Geolocation is not supported by your browser.');
//   }
// }
// function hidePlayer() {
//   document.getElementById("player").style.display = "none"; 
// }
// function showPlayer(x) {
//   document.getElementById("player").style.display = "flex"; 
//   let tempPlayer="";
//   let id = ""
//   let name = ""
//   let firstName = ""
//   let lastName = ""
//   let dateOfBirth = ""
//   let countryOfBirth = ""
//   let nationality = ""
//   let position = ""

//   let urlPlayer = "https://api.football-data.org/v2/players/"+x+"/";
//   console.log(urlPlayer)

//   fetch(urlPlayer, {
//     method: "GET",
//  headers : { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf"}  
//   })

//   .then(response => response.json())
//   .then(function (data){
//      id = "<li> ID: "+data.id+"</li>"
//      name = "<li> Name: "+data.name+"</li>"
//      firstName = "<li> First name: "+data.firstName+"</li>"
//      lastName = "<li> Last name: "+data.lastName+"</li>"
//      dateOfBirth = "<li> Date of Birth: "+data.dateOfBirth+"</li>"
//      countryOfBirth = "<li> Country of Birth: "+data.countryOfBirth+"</li>"
//      nationality = "<li> Nationality: "+data.nationality+"</li>"
//      position = "<li> Position: "+data.position+"</li>"
//     tempPlayer="<ol>"+id+name+firstName+lastName+dateOfBirth+countryOfBirth+nationality+position+"</ol>"

//     console.log(tempPlayer)
//     document.getElementById("player").innerHTML = tempPlayer;


//   });
// }