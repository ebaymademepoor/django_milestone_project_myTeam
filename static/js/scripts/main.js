// Global Vars

let preventClick = false;
let preventClickForReminder = false;
var ctx = $("#myChart");
let currentGeneratedTeam;
let currentSavedTeams;

// Function to initialise Jasmine testing to ensure it is running okay ---------

function onePlusOne(){
    return 2;
}

// A message function to the user ----------------------------------------------

function scrollTo(classOrId){
    $('html, body').animate({
        scrollTop: ($(classOrId).offset().top)
    }, 500);
    
    $(".site-container").scrollTop(0);
}

function displayMessage(message) {

    // Displays a message when called which is built into base.html but initially hidden ...

    $('.message-para').text(message);
    slideInMessagesBox();
}

// Edit data functions (personal details) --------------------------------------

function createEditProfileDataForm() {
    
    // This function creates a form for the profile info that the user would like to update

    $("dt").click(function() {
        
        // First remove any exisiting form that has been generated already...
        
        $('#update-form').remove();
        
        //  Then create a new form...
        
        var field = this.className;
        var profileID = $('#profile-id').text();

        if (field === "date_of_birth") {
            var type = "date"
        }
        else {
            var type = "text"
        }

        if (field != "") {
            var updateForm = '<form id="update-form" method="POST" action="edit_profile/' +
                profileID +
                '"><div class="remove-parent-btn">x</div><label>' +
                field + '</label><input type="' + type + '" name="' + field +
                '" id="' + field +
                '"><button type="submit" class="update-form-btn hover-effect-gold click-shrink">Update</button></form>'
        }

        $('.profile-page').append(updateForm);
    })
}

function returnExistingProfileData() {

    // Stores any existing profile data the user has ready for editing pre POST

    var firstName = $('.first_name').next().text();
    var surname = $('.surname').next().text();
    var nickname = $('.nickname').next().text();
    var dob = $('.date_of_birth').next().text();

    let profileData = { "first_name": firstName, "surname": surname, "nickname": nickname, "date_of_birth": dob };
    return profileData;
}

function collectFormData(type, formName) {
    // Collects any form data ready to be POSTED via ajax

    var formData = $(type + formName).serializeArray(); // The serialized new data entered into the form
    var error = false
    // Check is any values are blank or not filled in

    for (i = 0; i < formData.length; i++) {
        if (formData[i].value == "" || formData[i].value == null) {
            displayMessage("Please complete the " + formData[i].name + " box before updating...")
            error = true
        }
    }

    // If rating a player, ensure values are between 1 and 10

    if (formName == "rate-player-form" && error == false) {
        for (i = 0; i < formData.length; i++) {
            if (formData[i].value < 1 || formData[i].value > 10) {
                displayMessage("Your ratings must be between 1 & 10, please adjust accordingly...")
                var error = true
            }

            // Value must be an interger
            formData[i].value = Math.round(formData[i].value);
        }
    }

    if (error != true) {
        return formData;
    }
}

function prepareNewProfileData(oldData) {

    // Combines the newly entered user data with the existing data ready to be POSTED

    var formData = $("#update-form").serializeArray(); // The serialized new data entered into the form

    // This holds the information to be posted
    let newFormData = {};

    // If DOB is being changed, only DOB will be posted
    if (formData[0].name === "date_of_birth") {
        newFormData["date_of_birth"] = formData[0].value;
    }
    else {

        // Else firstname, surname and nickname will be posted

        Object.entries(oldData).forEach(([key, value]) => {

            if (key != "date_of_birth") {

                if (formData[0].name === key) {
                    newFormData[key] = formData[0].value;
                }
                else {
                    newFormData[key] = value;
                }
            }
        });
    }

    return newFormData;
}

function replaceOldValuesInRealtime(data) {

    // Used on the profile page, will update data in real time

    Object.entries(data).forEach(([key, value]) => {
        $('.' + key).next().text(value);
    });
}

// Edit data functions (position preferences) ----------------------------------

function preparePositionPrefData(element) {

    // When a button is clicked, the value for that position should change to reflect new preference set

    let newFormData = {}

    if ($('#' + element).hasClass("preferred-box")) {
        newFormData[element] = 0;
        $('#' + element).removeClass("preferred-box");
    }
    else if ($('#' + element).hasClass("can-play-box")) {
        newFormData[element] = 2;
        $('#' + element).removeClass("can-play-box").addClass("preferred-box")
    }
    else {
        newFormData[element] = 1;
        $('#' + element).addClass("can-play-box")
    }

    return newFormData;
}

function updateMatchAvailability(buttonClicked) {
    
    let status = 0;
    
    // Upon click of the users availability box, change the classes and the status

    if (buttonClicked.className === "i-have-confirmed") {
        $('.' + buttonClicked.className).removeClass("i-have-confirmed").addClass("i-am-unavailable").text("Unavailable");
        status = 0;
        
    } else if (buttonClicked.className === "i-am-unavailable" || buttonClicked.className === "i-am-unconfirmed"){
        
        status = 1;
        $('.' + buttonClicked.className).removeClass("i-am-unavailable i-am-unconfirmed").addClass("i-have-confirmed").text("Confirmed");
    }

    // Build new data based on the results collected and return

    let availTablePk = buttonClicked.id;
    
    if(availTablePk === ""){
        availTablePk = 0;
    }
    
    let matchID = $("#match-id").text();

    let availabilityData = {};
    
    availabilityData["matchID"] = matchID;
    availabilityData["availTablePk"] = availTablePk;
    availabilityData["status"] = status;

    return availabilityData;

}

// Team Generation Functions ---------------------------------------------------

function collectTeamSettingsData(type, formName) {
    // Collects any form data ready to be POSTED via ajax

    return new Promise((resolve, reject) => {

        var formData = $(type + formName); // The serialized new data entered into the form

        let userData = [];


        for (i = 0; i < formData.length; i++) {
            let thisUsersData = {};

            for (ii = 0; ii < formData[i].length; ii++) {
                if (formData[i][ii].name === "force-pick") {
                    if (formData[i][ii].checked === true) {
                        thisUsersData[formData[i][ii].name] = "true";
                    }
                    else {
                        thisUsersData[formData[i][ii].name] = "false";
                    }
                }
                else if (formData[i][ii].name === "force-exclude") {
                    if (formData[i][ii].checked === true) {
                        thisUsersData[formData[i][ii].name] = "true";
                    }
                    else {
                        thisUsersData[formData[i][ii].name] = "false";
                    }
                }
                else {
                    thisUsersData[formData[i][ii].name] = formData[i][ii].value;
                }
            }

            userData.push(thisUsersData);
        }
        
        resolve(userData);
    });

}

function playersToChooseTeamsFrom(playerData) {

    let playersInTheHat = [];

    playerData.forEach(function(player) {
        if (player["force-exclude"] != "true") {
            if (player["available"] === "Yes" || player["force-pick"] === "true") {
                player["avg_tot"] = (parseFloat(player["avg_gk"]) + parseFloat(player["avg_out"])) / 2;
                playersInTheHat.push(player);
            }
        }
    });

    return playersInTheHat;
}

function attachPlayerToForcedTeam(teamData){
    teamData.forEach(function(player) {
        if (parseInt(player["force-team"]) === 1) {
            player["team"] = 1;
            
            if (player["force-position"] === "GK") {
                player["picked-position"] = "gk";
            }    
        } else if (parseInt(player["force-team"]) === 2) {
            player["team"] = 2;

            if (player["force-position"] === "GK") {
                player["picked-position"] = "gk";
            }
        }
    });
    
    return teamData;
}

function moreThanOneKeeperCheck(teamData){
    
    var team1Keepers = 0;
    var team2Keepers = 0;
    let allKeepers = 0;

    teamData.forEach(function(player) {
        if (player["force-position"] === "GK" || player["picked-position"] === "gk") {
            allKeepers += 1;
            
            if (parseInt(player["team"]) === 1) {
                team1Keepers += 1;
            } else if (parseInt(player["team"]) === 2) {
                team2Keepers += 1;
            }
        }
    });

    if (team1Keepers > 1 || team2Keepers > 1 || allKeepers > 2) {
        displayMessage("Too many Keepers Selected");
    } else {
        return teamData;
    }
}

function separatePlayersByAllocatedUnallocated(teamData){
    // Confirm players allocated to a team and those to be allocated...

            let playersInATeam = [];
            let playerstoBeAllocated = [];

            teamData.forEach(function(player) {
                if (player["team"] != undefined) {
                    playersInATeam.push(player);
                }
                else {
                    playerstoBeAllocated.push(player);
                }
            });
            
            return [playersInATeam, playerstoBeAllocated];
}

function checkTeamScores(teamData){
    // Determine how many players are in each team and their team score so far...

    let teamsSummary = [
        {"team" : 1, "Score": 0, "Players": 0 },
        {"team" : 2, "Score": 0, "Players": 0 }
    ];

    teamData[0].forEach(function(player) {
        
        if(player["avg_gk"]){
            if (parseInt(player["team"]) === 1) {
                teamsSummary[0]["Players"] += 1;
                
                if(player["force-position"] === "GK"){
                    teamsSummary[0]["Score"] += parseFloat(player["avg_gk"]);    
                } else {
                    teamsSummary[0]["Score"] += parseFloat(player["avg_out"]);
                }
            } else if (parseInt(player["team"]) === 2) {
                teamsSummary[1]["Players"] += 1;
                
                if(player["force-position"] === "GK"){
                    teamsSummary[1]["Score"] += parseFloat(player["avg_gk"]);    
                } else {
                    teamsSummary[1]["Score"] += parseFloat(player["avg_out"]);
                }
            }        
        } else {
            if (parseInt(player["team"]) === 1) {
                teamsSummary[0]["Players"] += 1;
                teamsSummary[0]["Score"] += 5;    
            } else if (parseInt(player["team"]) === 2) {
                teamsSummary[1]["Players"] += 1;
                teamsSummary[1]["Score"] += 5;    
            }
        }
    }); 
    
    for(i = 0; i < teamsSummary.length; i++){
        if(teamsSummary[i]["Players"] === 0){
            teamsSummary[i]["avg-score"] = 0;
        } else {
            teamsSummary[i]["avg-score"] = teamsSummary[i]["Score"] / teamsSummary[i]["Players"];        
        }
    }
    
    return [teamData, teamsSummary];
}

function allocateGoalkeepers(teamData){

    let playersToBeAllocated = teamData[0][1];
    let playersAllocated = teamData[0][0];
    
    // Sort players by average of all scores, best to worst.....
    let playersSortedByAvgScore = sortByKeyDesc(playersToBeAllocated, "avg_out");
    let team1Data = teamData[1][0];
    let team2Data = teamData[1][1];
    let keepers = [0,0];
    
    playersAllocated.forEach(function(player){
        
        if(player["force-position"] === "GK"){
           let index = player["team"] - 1; 
           keepers[index] +=1
        }
    })
    
    /* Allocate a team number to any players yet to be allocated 
    to a team... */

    playersSortedByAvgScore.forEach(function(player) {
        
        if (player["force-position"] === "GK"){
            if(keepers[0] === 0){
                player["team"] = 1;
                team1Data["Players"] += 1;
                team1Data["Score"] += parseFloat(player["avg_gk"]);
                keepers[0] += 1;
            } else {
                player["team"] = 2;
                team2Data["Players"] += 1;
                team2Data["Score"] += parseFloat(player["avg_gk"]);    
            }
        } else if (team1Data["Players"] > team2Data["Players"]) {
            player["team"] = 2;
            team2Data["Players"] += 1;
            team2Data["Score"] += parseFloat(player["avg_out"]);

        } else if (team1Data["Players"] < team2Data["Players"]) {
            player["team"] = 1;
            team1Data["Players"] += 1;
            team1Data["Score"] += parseFloat(player["avg_out"]);
        } else {
            let teamNo = createANumber(2);
            player["team"] = teamNo;

            if (teamNo === 1) {
                team1Data["Players"] += 1;
                team1Data["Score"] += parseFloat(player["avg_out"]);
            }
            else if (teamNo === 2) {
                team2Data["Players"] += 1;
                team2Data["Score"] += parseFloat(player["avg_out"]);
            }
        }
    });
    
    team1Data["avg-score"] = 
        team1Data["Score"] / team1Data["Players"];
    
    team2Data["avg-score"] = 
        team2Data["Score"] / team2Data["Players"];
    
    
    
    let allPlayers = $.merge(playersAllocated, playersSortedByAvgScore);
    
    let finalTeamSelectionData = [allPlayers, [team1Data, team2Data]];

    return finalTeamSelectionData;
}

function assignForcedPositions(teamsData) {

    teamsData[0].forEach(function(thisPlayer) {
        if (thisPlayer["force-position"] != "") {
            thisPlayer["picked-position"] = thisPlayer["force-position"].toLowerCase();
        }
    })

    return teamsData;
}

function setupTeams(teamData){
    
    /* Starts to organise current teamData to help with further team set up.  
    Creates a list of already assigned players, unassigned players, and how
    many players are in each team and what playing position they've been allocated
    to */
        
        let assignedPlayers = [[],[]];
        
        let unassignedPlayers = [[],[]];
    
        let positionsOfPlayers = [
            { "team": 1, "gk": 0, "def": 0, "mid": 0, "att": 0 },
            { "team": 2, "gk": 0, "def": 0, "mid": 0, "att": 0 }
        ];

        teamData[0].forEach(function(player) {
            
            if (player["picked-position"] === undefined) {
                let team = player["team"] -1;
                unassignedPlayers[team].push(player);
            } else {
                let team = player["team"] -1;
                assignedPlayers[team].push(player);
                
                let index = parseInt(player["team"]) - 1;
                let playerPosition = player["picked-position"];
                positionsOfPlayers[index][playerPosition] += 1;
            }
        })    
        
        return {"assignedPlayers" : assignedPlayers, "unassignedPlayers" : unassignedPlayers, "positionsOfPlayers" : positionsOfPlayers};
}

function assignPositionsForRemainingPlayers(teamData) {

        let assignedPlayers = teamData["assignedPlayers"];
        let unassignedPlayers = teamData["unassignedPlayers"];
        let positionsOfPlayers = teamData["positionsOfPlayers"]
        
        let potentialPositions = ["gk", "def", "mid", "att"];

        let positionLoop = 0;
        let minPlayersInPosition = 0;
        let thisPosition = potentialPositions[positionLoop];

        for(var i = 0; i < positionsOfPlayers.length; i++){
            
            let positionLoop = 0;
            let minPlayersInPosition = 0;
            let thisPosition = potentialPositions[positionLoop];

            while(unassignedPlayers[i].length > 0){
        
                if (positionsOfPlayers[i][thisPosition] === minPlayersInPosition) {

                    let preferredPlayers = [];
                    let canPlayPlayers = [];
                    let cannotPlayPlayers = [];
                    let pickedPlayer;
                
                    unassignedPlayers[i].forEach(function(player){
        
                        if (player[thisPosition + "-pref"] == 2) {
                            preferredPlayers.push(player);
                        } else if (player[thisPosition + "-pref"] == 1) {
                            canPlayPlayers.push(player);
                        } else {
                            cannotPlayPlayers.push(player);
                        }
                    })
    
                    let random = 0
    
                    if (preferredPlayers.length === 1) {
                        pickedPlayer = preferredPlayers[0];
                    } else if (preferredPlayers.length > 1) {
                        random = Math.floor(Math.random() * preferredPlayers.length);
                        pickedPlayer = preferredPlayers[random];
                    } else if (canPlayPlayers.length === 1) {
                        pickedPlayer = canPlayPlayers[0];
                    } else if (canPlayPlayers.length > 1) {
                        random = Math.floor(Math.random() * canPlayPlayers.length);
                        pickedPlayer = canPlayPlayers[random];
                    } else {
                        random = Math.floor(Math.random() * cannotPlayPlayers.length);
                        pickedPlayer = cannotPlayPlayers[random];
                    }
                    
                    var index = unassignedPlayers[i].findIndex(player => player["full-username"] === pickedPlayer["full-username"]);
                    
                    unassignedPlayers[i][index]["picked-position"] = thisPosition;
                    
                    if (index > -1) {
                        assignedPlayers[i].push(unassignedPlayers[i][index]);
                        unassignedPlayers[i].splice(index, 1);
                    }
                   
                    positionsOfPlayers[i][thisPosition] += 1;    
                    
                    if (positionLoop === 3) {
                        positionLoop = 1;
                        minPlayersInPosition += 1;
                        thisPosition = potentialPositions[positionLoop];
                    } else {
                        positionLoop += 1;
                        thisPosition = potentialPositions[positionLoop];
                    }
                    
                } else {
                    if (positionLoop === 3) {
                        positionLoop = 1;
                        minPlayersInPosition += 1;
                        thisPosition = potentialPositions[positionLoop];
                    } else {
                        positionLoop += 1;
                        thisPosition = potentialPositions[positionLoop];
                    }
                }
            }   
        }
    
    let mergedTeams = $.merge(assignedPlayers[0], assignedPlayers[1]);

    return mergedTeams;
}

function getSavedTeamData(){
    return new Promise((resolve, reject) => {
        let savedTeams = $(".saved-team-data").text();
        
        if(savedTeams != ""){
            teams = JSON.parse(savedTeams);    
        } else {
            teams = JSON.parse(currentSavedTeams);
        }
        
        resolve(teams);
    });
}

function addPlayersToPitch(teamSelection) {
    teamSelection.forEach(function(player) {

        let name = "";
        
        if(player["nickname"]){
            name = player["nickname"];
        } else {
            name = player["full-username"];
        }

        if (player["team"] === 1) {
            var thisPlayer = '<div class="team-1-player"><p>' +
                name + '</p></div>';

            let rowToAppend = '.' + player["picked-position"] + "-row-team1";

            $(rowToAppend).append(thisPlayer);
        }
        else {
            thisPlayer = '<div class="team-2-player"><p>' +
                name + '</p></div>';

            let rowToAppend = '.' + player["picked-position"] + "-row-team2";

            $(rowToAppend).append(thisPlayer);
        }
    });
}

function addStatstoPitch(teamData){
    
    let i = 0;
    
    teamData[1].forEach(function(team) {
            
            var thisTeamsScore = '<div class="team-' + team["team"] + '-score">' 
            + '<p>' + 'Team - ' + team["team"] + '</p>'
            + '<p>' + 'Score: ' + (Math.round(team["Score"] * 100) / 100) + '</p>' 
            + '</div>';

            let rowToAppend = '.half-pitch';

            $($(rowToAppend)[i]).append(thisTeamsScore);
            
            i++;
    });
}

function runTeamGenerationPromises(){
    $('.team-1-player, .team-2-player').remove(); // Remove exisitng team generation
    collectTeamSettingsData(".", "player-data-row")
        .then((result) => {
            
            // Result = Array of objects containing player data pulls through
            return playersToChooseTeamsFrom(result);
        }).then((result) => {
            
            // Result = Only available players are provided
            return attachPlayerToForcedTeam(result);
        }).then((result) => {
                        
            // Result = Console suggests all players allocated to a team 
            return moreThanOneKeeperCheck(result);
        }).then((result) => {
                
            // Result = Keepers are recognised correctly and raise error if too many
            return separatePlayersByAllocatedUnallocated(result);
        }).then((result) => {    
                
            // Result = Players seperated successfully into allocated / unallocated
                        
            return checkTeamScores(result);
        }).then((result) => {        
                        
            // Result = Teams are passed through along with summary of teams picked so far    
            return allocateGoalkeepers(result);
        }).then((result) => {
                        
            // Result = Players are passed through with team numbers an the second array entry holds team player and avg stats
            //  This can be distorted slightly if 2 keepers have not been picked as avg_out is counted if gk not specified
            return assignForcedPositions(result);
                        
        }).then((result) => {
                        
            // Result = Players are allocated any forced positions
                    
            return setupTeams(result);
        }).then((result) => {
                        
            // Result = object of Assigned and unassigned players, along with team / player position summary
                        
            return assignPositionsForRemainingPlayers(result);
        }).then((result) => {
            $('.team-1-score, .team-2-score').remove(); // Remove exisitng team generation
            addPlayersToPitch(result); // Render in html template
            currentGeneratedTeam = result;
            let teamsArray = [];
            teamsArray.push(currentGeneratedTeam);
            let stats = checkTeamScores(teamsArray);
            addStatstoPitch(stats);
            $(".user-playing-positions-section").removeClass("start-off-screen");
            $(".user-playing-positions-section").addClass('slide-in-from-right');
        })
}


// Enables post of data to database --------------------------------------------

function preparePostData(type, data) {

    // Sends new data to the database via ajax request

    if (type === "user-personal-details") {
        let newFormData = prepareNewProfileData(data);
        let profileURL = "../update_profile_data/";
        let profileID = $('#profile-id').text(); // the ID of the profile that needs to be updated
        postToDatabase(profileURL, newFormData, profileID);
    }
    else if (type === "user-position-prefs") {
        let newPref = data;
        let profileURL = "../update_position_pref/";
        let profileID = $('#profile-id').text(); // the ID of the profile that needs to be updated
        postToDatabase(profileURL, newPref, profileID);
    }
    else if (type === "attribute-rating") {
        let ratingData = data;
        let profileURL = "../../rate_player/";
        let playerRated = $('#profile-id').text(); // the ID of the player being rated
        postToDatabase(profileURL, ratingData, playerRated);
    }
    else if (type == "update-match-availability-status") {
        let availabilityData = data;
        let matchesURL = "../../update_availability_status/";
        let customRoute = availabilityData["matchID"] + "/" + availabilityData["availTablePk"];
        postToDatabase(matchesURL, availabilityData, customRoute);
    } else if (type == "save-team"){
        let teamData = data["team"];
        let stringData = stringify(teamData);
        let savedTeam = {};
        savedTeam["saved_team"] = stringData;
        let saveTeamURL = "../../match/save_a_generated_team/";
        let customRoute = data["group"] + "/" + data["match"];
        
        postToDatabase(saveTeamURL, savedTeam, customRoute);    
    } else if (type === "submit-performance-ratings"){
        let performanceRatings;
        let customRoute;
        
        if(data.length === 0){
            customRoute = 0;
            performanceRatings = "No data";
        } else {
            performanceRatings = data;
            customRoute = performanceRatings[0]["matchid"];    
        }
        
        let ratingsURL = "../add_ratings_to_db/";
        let stringData = stringify(performanceRatings);
        let ratingsData = {};
        ratingsData["ratings"] = stringData;
        $(".please-wait").removeClass("start-off-screen");
        $(".please-wait").addClass('slide-in-from-right');
        postToDatabase(ratingsURL, ratingsData, customRoute);    
    } else if (type === "email-availability-reminder"){
        let matchid = data;
        let emailUrl = "../../email_availability_reminder/";
        postToDatabase(emailUrl, "n/a", matchid)
    }
};

function stringify(jsonItem){
    let stringData = JSON.stringify(jsonItem);
        
    return stringData
}

function postToDatabase(url, data, route) {
    
    //  ajax function will now take this data and post it accordingly via our python view

    $.ajax({
        url: url + route, // the endpoint
        type: "POST", // http method
        data: data,
        
        // handle a successful response
        success: function(json) {
            
            $('#update-form').remove();

            if (url === "../../update_availability_status/") {

                // For use on updating availability status only if instance has just been created, the pk of the instance needs to be updated to avoid creating multiple instances

                if(data["availTablePk"] === 0){
                    $(".i-have-confirmed").attr( 'id', json["instanceID"] );
                }

                preventClick = false;
            } else if (url === "../update_profile_data/") {
                if (json["result"] == 'Update successful!') {
                    displayMessage("GOAL!  Details updated...");
                    
                    // This code will replace data on profile section with new data
                    replaceOldValuesInRealtime(data);
                    
                    $('.username').empty().text(data["nickname"]); 
                    curvePlayerNames();
                    
                } else {
                    displayMessage("Sorry, that didn't work. " + json["errors"]);
                }
            } else if (url === "../../match/save_a_generated_team/") {
                if (json["result"] == 'Update successful!') {
                    displayMessage("GREAT SAVE! Your teams have been stored.");
                    $('#view-saved-teams-btn').show();
                    currentSavedTeams = json["selected_team"]
                    preventClick = false;
                } else {
                    displayMessage("Hmmm, we're not sure that worked, please try later...");
                }
            } else if (url === "../../email_availability_reminder/") {
                $(".ani-holder").fadeOut(500);
                
                if (json["result"] == 'Update successful!') {
                    if(json["emails-sent"] === "One"){
                        displayMessage("Emails sent!  You still have 1 reminder remaining for this match.");    
                    } else if (json["emails-sent"] === "Two"){
                        displayMessage("Emails sent!  You have now sent both of your reminder emails.");    
                    }
                    
                } else if (json["result"] == 'All reminders sent'){
                    displayMessage("I'm sorry but you have already sent out all of your reminder emails for this match!");    
                } else {
                    displayMessage("Hmmm, we're not sure that worked, please try later...");
                }
            } else if(url === "../add_ratings_to_db/"){
                if (json["result"] == 'Update successful!') {
                    $('.please-wait .container > p').text("Ratings submitted!");
                    window.location.href = json["root-url"] + '/group/group_home/' + json["groupid"];
                } else if (json["result"] === 'No ratings provided...'){
                    $('.please-wait .container > i').remove();
                    $('.please-wait .container > p').text("All players skipped!");
                    window.location.href = json["root-url"] + '/group/group_select/';
                } else {
                    $('.please-wait .container > i').remove();
                    $('.please-wait .container > p').text("Therer was an error, please try later");
                }
            } else if (url === "../../rate_player/")    {
                if (json["result"] == 'Update successful!') {
                    createRadarChart();
                    displayMessage("Ratings submitted!");    
                } else {
                    displayMessage("Hmmm, we're not sure that worked, please try later...");
                }
            } else {
                if (json["result"] == 'Update successful!') {
                    if(url !== "../update_position_pref/"){
                        displayMessage("GOAL!  Details updated...");    
                    }
                } else {
                    displayMessage("Hmmm, we're not sure that worked, please try later...");
                }
            }
        },

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console

            displayMessage("An error has occured, please try later");

        }
    });
}

// Helper functions ------------------------------------------------------------

function sortByKeyDesc(array, key) {
    return array.sort(function(a, b) {

        var x = a[key];
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function sortByKeyAsc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function createANumber(highestNum) {
    var randomNumber = Math.floor(Math.random() * highestNum) + 1;
    return randomNumber;
}

function activateButton() {

    // Switch statement to help manage button functionality ------------------------

    $("button").click(function() {
        switch (this.id) {
            case "open-sign-in-btn":
                $('.login-form').show();
                break;
            case "open-sign-up-btn":
                $('.sign-up-form').show();
                break;
            case "open-create-group-form-icon":
                $('.create-group-form').show();
                break;
            case "pick-teams-btn":
                runTeamGenerationPromises();
                scrollTo("nav");
                break;
            case "regen-btn":
                runTeamGenerationPromises();
                break;
            case "back-to-settings-btn":
                $(".user-playing-positions-section").removeClass("slide-in-from-right");
                $(".user-playing-positions-section").addClass('start-off-screen');
                break;
            case "view-saved-teams-btn":
                getSavedTeamData().then((teams) => {
                    $('.team-1-player, .team-2-player, .team-1-score, .team-2-score').remove(); // Remove exisitng team generation
                    addPlayersToPitch(teams);
                    let teamsArray = [];
                    teamsArray.push(teams);
                    let stats = checkTeamScores(teamsArray);
                    addStatstoPitch(stats);
                    scrollTo("nav");
                    $(".user-playing-positions-section").removeClass("start-off-screen");
                    $(".user-playing-positions-section").addClass('slide-in-from-right');
                });
                break;
            case "show-password":
                if($(this).text() === "Show Password"){
                    $(this).text("Hide Password");
                    $('#group-pwd').show("fast");
                } else {
                    $('#group-pwd').hide("fast");
                    $(this).text("Show Password");
                }
                break;
            default:
                
        }
    });
}

function closeParent() {

    // Closes the parent of the button which sits in the top corner of any popup box

    $(".close-parent-btn").click(function() {
        $(this).parent().fadeOut('fast');
    });
}

function removeParent() {

    // Removes the parent of the button which sits in the top corner of any popup box

    $("body").on("click", ".remove-parent-btn", function(e) {
        $(this).parent().remove();
    });
}

function slideInMessagesBox() {

    // Slides in any messages
    $(".messages-box").removeClass("slide-in-from-right");
    $(".messages-box").addClass('start-off-screen');

    if ($(".message-para").text() != "") {
        $(".messages-box").show();
        $(".messages-box").addClass("slide-in-from-right");
    }
}

function unhideABox(buttonClickedClass, classToUnhide) {

    $("." + buttonClickedClass).click(function() {

        $('.' + classToUnhide).show();
    });
}

function curvePlayerNames() {

    let playersOnPage = $('.username');
        
    for (i = 0; i < playersOnPage.length; i++) {
        const circleType = new CircleType(document.getElementById(playersOnPage[i].id));
        circleType.radius(50);
    }    
}

// Prepares chart data for radar chart

function prepareChartData() {
    return new Promise((resolve, reject) => {
        
        let ratingsList = [];
        
        if ($('.gk-rate').text() === "") {
            let gkRating = parseInt($('.gk-rate').val());
            let defRating = parseInt($('.def-rate').val());
            let moveRating = parseInt($('.move-rate').val());
            let passRating = parseInt($('.pass-rate').val());
            let finRating = parseInt($('.fin-rate').val());
    
            ratingsList = [gkRating, defRating, moveRating, passRating, finRating];
        }
        else {
            let gkRating = $('.gk-rate').text();
            let defRating = parseInt($('.def-rate').text());
            let moveRating = parseInt($('.move-rate').text());
            let passRating = parseInt($('.pass-rate').text());
            let finRating = parseInt($('.fin-rate').text());
    
            ratingsList = [gkRating, defRating, moveRating, passRating, finRating];
        }
        
        resolve(ratingsList);
    });
}
    

// Player performance rating functions -----------------------------------------

function collectAndSubmitPerformanceRatings(){
    
    let ratingsList = [];
    
    $(".good, .average, .poor, .skip").click(function() {
        
        let thisPlayer = {};
        let playerData = $(this).closest('div[class^="player"]');
        let add
            
        if(this.className === "good click-shrink hover-effect-green"){
            rating = 5;
            add = true
        } else if (this.className === "average click-shrink hover-effect-amber"){
            rating = 3;
            add = true
        } else if (this.className === "poor click-shrink hover-effect-red"){
            rating = 1;
            add = true
        } else if (this.className === "skip click-shrink hover-effect-blue"){
            add = false
            playerData.remove();
        }
        
        if(add){
            thisPlayer["username"] = playerData.children(".player-username").text();
            thisPlayer["rating"] = rating;
            thisPlayer["matchid"] = $('#match-id').text();
            thisPlayer["date-of-match"] = $('#date-of-match').text();
            
            ratingsList.push(thisPlayer);
            
            playerData.remove();
        }
    });
    
    $(".submit-perform-ratings").click(function() {
        preventClick = true;
        preparePostData("submit-performance-ratings", ratingsList);
    });

}

// Create radar charts function ------------------------------------------------

function createRadarChart(){
    // Chart.js Radar chart
    if(ctx.length > 0){
        prepareChartData().then((chartData)=> {
        
        
        var myRadarChart = new Chart(ctx, {

            type: 'radar',
            data: {
                labels: ['Goalkeeping', 'Defending', 'Movement', 'Passing', 'Finishing'],
                datasets: [{
                    data: chartData,
                    backgroundColor: 'rgba(35, 230, 35, 0.3)',
                    borderColor: 'rgba(35, 230, 35, 0.9)'
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        stepSize: 2,
                        display: false
                    }
                }
            }
        });    
    })    
    }
}


//  CSRF Token function --------------------------------------------------------

function prepareCSRFToken(){
    // This code retrieves our form csrf token to enable safe ajax requests --------

    $(function() {

        // This function gets cookie with a given name
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        var csrftoken = getCookie('csrftoken');

        /*
        The functions below will create a header with csrftoken
        */

        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        function sameOrigin(url) {
            // test that a given url is a same-origin URL
            // url could be relative or scheme relative or absolute
            var host = document.location.host; // host + port
            var protocol = document.location.protocol;
            var sr_origin = '//' + host;
            var origin = protocol + sr_origin;
            // Allow absolute or scheme relative URLs to same origin
            return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
                (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
                // or any other URL that isn't scheme relative or absolute i.e relative.
                !(/^(\/\/|http:|https:).*/.test(url));
        }

        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                    // Send the token to same-origin, relative URLs only.
                    // Send the token only if the method warrants CSRF protection
                    // Using the CSRFToken value acquired earlier
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

    });

}

// Script ----------------------------------------------------------------------

$(document).ready(function() {
    
    prepareCSRFToken();
    
    // activateButton will allow buttons to perform their set funtion based on their id...

    activateButton();

    // Helper functions
    closeParent();
    removeParent();
    unhideABox("show-create-new-group-form", "create-group-form");
    unhideABox("show-join-group-form", "join-group-form");
    unhideABox("edit-match-btn", "match-form");

    createEditProfileDataForm();
    preparePositionPrefData();
    collectAndSubmitPerformanceRatings();
    
    // Updates profile database with new user info when submitted ------------------

    $('body').on("click", ".update-form-btn", function(e) {
        e.preventDefault();
        let data = returnExistingProfileData();
        preparePostData("user-personal-details", data);
    });

    // Updates profile database with new position prefs info when submitted ------------------

    $(".attack, .midfield, .defense, .goalkeeper").click(function() {

        let elementClicked = this.id;
        let data = preparePositionPrefData(elementClicked);
        preparePostData("user-position-prefs", data);

    });

    // Updates AttributeRating database with new or edited rating when submitted ----

    $('body').on("click", ".update-player-attributes-btn", function(e) {
        e.preventDefault();
        let data = collectFormData("#", "rate-player-form");
        if (data != null) {
            preparePostData("attribute-rating", data);
        }
    });

    // Updates player match availability status when submitted ------------------

    $(".i-am-unconfirmed, .i-have-confirmed, .i-am-unavailable").click(function() {
        if (preventClick === false) {
            preventClick = true;

            let data = updateMatchAvailability(this);
            preparePostData("update-match-availability-status", data);
        }

    });
    
    // Saves a generated team when submitted -----------------------------------

    $("#save-teams-btn").click(function() {
        $(".saved-team-data").text("");
        let data = currentGeneratedTeam;
        
        if(data === undefined){
            displayMessage("There is currently no team generated");
        } else if (preventClick === false) {
            preventClick = true;
            
            let fullData = {};
            
            let groupid = $('#group-id').text()
            let matchid = $('#match-id').text()
            
            fullData["team"] = currentGeneratedTeam;
            fullData["group"] = parseInt(groupid);
            fullData["match"] = parseInt(matchid);
            
            preparePostData("save-team", fullData);
        }

    });
    
    // Emails a reminder to any user within a group that has not advised of availability for any given match
    
    $("#email-availability-reminder-btn").click(function() {
        if(preventClickForReminder === false){
            preventClickForReminder = true;
            $(".ani-holder").fadeIn(500);
            let matchid = $('#match-id').text();
            preparePostData("email-availability-reminder", matchid)    ;
        }
    });
    
    // Curves any text on a shirt...
    
    if($(".team-gen-pg").length != 1){
        curvePlayerNames();
    }
    
    // Radar Chart creation..
    
    createRadarChart();
    
    setTimeout(function(){
        $(".loading-screen").slideUp(1000);    
        slideInMessagesBox();
    }, 1000)
    
        
});
