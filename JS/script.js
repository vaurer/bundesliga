start();
function start() {
  let urlLeagues = "https://api.football-data.org/v2/competitions/";

  fetch(urlLeagues, {
    method: "GET",
    headers: { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf" },
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      let leaguesLI = "";
      let avaiableLeagueNo = 0;
      data.competitions.forEach((element) => {
        if (
          element.plan == "TIER_ONE" &&
          element.area.countryCode != "INT" &&
          element.area.countryCode != "EUR"
        ) {
          avaiableLeagueNo++;
          let urlEmblem = "";
          if (element.area.ensignUrl !== null) {
            urlEmblem =
              "<img src='" + element.area.ensignUrl + "' style='width:80px'/>";
          } else {
            urlEmblem = "";
          }
          leaguesLI +=
            "<tr onclick=showLigaStandings(" +
            element.id +
            ")><th scope='row'>" +
            avaiableLeagueNo +
            "</th><td>" +
            element.name +
            "</td><td>" +
            urlEmblem +
            "</td></tr>";
          urlEmblem = "";
        }
      });
      let leaguesList =
        "<table class='table table-striped table-dark'><thead><tr> <th scope='col'>#</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'>Competition</th><td>" +
        leaguesLI +
        "</td></tr></tbody></table>";
      document.getElementById("competitions").innerHTML = leaguesList;
    });
}
function showLigaStandings(LigaNumber) {
  let urlLigaStsndings =
    "https://api.football-data.org/v2/competitions/" +
    LigaNumber +
    "/standings?standingType=TOTAL";

  fetch(urlLigaStsndings, {
    method: "GET",
    headers: { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf" },
  })
    .then((response) => response.json())
    .then(function (data) {
      let leaguePositionLI = "";
      data.standings[0].table.forEach((element) => {
        leaguePositionLI +=
          "<tr onclick=showClub(" +
          element.team.id +
          ")><th scope='row'>" +
          element.position +
          "</th><td><img src='" +
          element.team.crestUrl +
          "' style='width:80px'/></td><td>" +
          element.team.name +
          "</td><td>" +
          element.playedGames +
          "</td><td>" +
          element.won +
          "</td><td>" +
          element.draw +
          "</td><td>" +
          element.lost +
          "</td><td>" +
          element.points +
          "</td><td>" +
          element.goalsFor +
          " : " +
          element.goalsAgainst +
          "</td><td>" +
          element.goalDifference +
          "</td></tr>";
      });
      let leaguesStandings =
        "<table class='table table-striped table-dark'><thead><tr> <th scope='col'>#</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'></th><th scope='row'>Club<th scope='row'>Games</th><th scope='row'>Won</th><th scope='row'>Draw</th><th scope='row'>Lost</th><th scope='row'>Points</th><th scope='row'>Goals</th><th scope='row'>Diff</th></th><td>" +
        leaguePositionLI +
        "</td></tr></tbody></table>";
      document.getElementById("competitions").innerHTML = leaguesStandings;
    });
}

function showClub(clubIdNumber) {
  let urlClub = "https://api.football-data.org/v2/teams/" + clubIdNumber + "/";
  fetch(urlClub, {
    method: "GET",
    headers: { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf" },
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      let htmlSquad = "";
      let clubName = data.name;
      let clubCrest = data.crestUrl;
      let clubAddress = data.address;
      let clubWeb = data.website;
      let clubEmail = data.email;
      let clubPhone = data.phone;
      let clubFounded = data.founded;
      let clubVenue = data.venue;

      data.squad.forEach((element) => {
        let place = 1;
        let pos = "";
        if (element.position == null) {
          pos = " ";
        } else {
          pos = element.position;
        }
        htmlSquad +=
          "<tr onclick='showPlayer(" +
          element.id +
          ")'><td>" +
          element.name +
          "</td><td>" +
          element.role +
          "</td><td>" +
          pos +
          "</td></tr>";
        pos = "";
      });
      let firstdiv =
        "<div><h1>" +
        clubName +
        "</h1><img src='" +
        clubCrest +
        "' style='width:80px'/></div>";
      let clubMembers =
        firstdiv +
        "<table class='table table-striped table-dark'><thead><tr> <th scope='col'>Name</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'>Role</th><td>" +
        htmlSquad +
        "</td></tr></tbody></table>";
      document.getElementById("competitions").innerHTML = clubMembers;
      console.log(htmlSquad);
    });
}

function showPlayer(playerID) {
  let urlPlayer = "https://api.football-data.org/v2/players/" + playerID + "/";
  console.log(urlPlayer);

  fetch(urlPlayer, {
    method: "GET",
    headers: { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf" },
  })
    .then((response) => response.json())
    .then(function (data) {
      let id = data.id;
      let name = data.name;
      let firstName = data.firstName;
      let lastName = data.lastName;
      let dateOfBirth = data.dateOfBirth;
      let countryOfBirth = data.countryOfBirth;
      let nationality = data.nationality;
      let position = data.position;

      let playerData =
        "<tr><td>" +
        name +
        "</td></tr><tr><td>" +
        position +
        "</td></tr><tr><td>" +
        nationality +
        "</td></tr><tr><td>" +
        dateOfBirth +
        "</td></tr>";
      let playerTable =
        "<table class='table table-striped table-dark'><thead><tr> <th scope='col'>Person info</th><th scope='col#>Last</th></tr></thead><tbody><tr><th scope='row'></th><td>" +
        playerData +
        "</td></tr></tbody></table>";
      document.getElementById("competitions").innerHTML = playerTable;
    });
}

function showTodaysMatches() {
  var source = document.getElementById("matchesTemplate").innerHTML;
  var template = Handlebars.compile(source);
  console.log(template(source));

  let urlTodaysMatches = "https://api.football-data.org/v2/matches/";

  fetch(urlTodaysMatches, {
    method: "GET",
    headers: { "X-Auth-Token": "c4a83924354d413f9017805ac1cbb5bf" },
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      let htmlTodaysMatches = template(data);

      document.getElementById("competitions").innerHTML = htmlTodaysMatches;
    });
}
