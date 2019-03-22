// Global Vars

let preventClick = false
var ctx = $("#myChart");

// A message function to the user ----------------------------------------------

function displayMessage(message) {

    // Displays a message when called which is built into base.html but initially hidden ...

    $('.message-para').text(message);
    slideInMessagesBox();
    $('html, body').animate({
        scrollTop: ($('.messages-container').offset().top)
    }, 500);
}

// Edit data functions (personal details) --------------------------------------

function createEditProfileDataForm() {

    // This function creates a form for the profile info that the user would like to update

    $("dt").click(function() {
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
                '"><button type="submit" class="update-form-btn">Update</button></form>'
        }

        $('.profile-page').after(updateForm);
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

    // Check is any values are blank or not filled in

    for (i = 0; i < formData.length; i++) {
        if (formData[i].value == "" || formData[i].value == null) {
            displayMessage("Please complete the " + formData[i].name + " box before updating...")
            var error = true
        }
    }

    // If rating a player, ensure values are between 1 and 10

    if (formName == "rate-player-form") {
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
        console.log(formData);
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

    let status = 0

    // Upon click of the users availability box, change the classes and the status

    if (buttonClicked == "i-have-confirmed") {
        $('.' + buttonClicked).removeClass("i-have-confirmed").addClass("i-am-unavailable").text("Unavailable");
        status = 0
        console.log("You were confirmed but you are now unavailable");
    }
    else {
        console.log("You just made yourself available");
        status = 1
        $('.' + buttonClicked).removeClass("i-am-unavailable i-am-unconfirmed").addClass("i-have-confirmed").text("Confirmed");
    }

    // Build new data based on the results collected and return

    let matchID = $("#match-id").text();
    let availTablePk = 0;

    if ($("#avail-table-pk").text() === "") {
        availTablePk = 0;
    }
    else {
        availTablePk = $("#avail-table-pk").text();
    }

    let availabilityData = {};

    availabilityData["matchID"] = matchID;
    availabilityData["availTablePk"] = availTablePk;
    availabilityData["status"] = status;

    return availabilityData;

}

// Team Generation Functions ---------------------------------------------------

function collectTeamSettingsData(type, formName) {
    // Collects any form data ready to be POSTED via ajax

    var formData = $(type + formName); // The serialized new data entered into the form

    let userData = [];

    for (i = 0; i < formData.length; i++) {
        let thisUsersData = [];

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

    return userData;
}

function pickTeams(allPlayerDataAndSettings) {

    let team1 = [];
    let team2 = [];

    playersInTheHat = [];

    /* Confirm which players from the group are available to play or have been 
     given force pick status */

    allPlayerDataAndSettings.forEach(function(player) {
        if (player["force-exclude"] != "true") {
            if (player["available"] === "Yes" || player["force-pick"] === "true") {
                player["avg_tot"] = (parseFloat(player["avg_gk"]) + parseFloat(player["avg_out"])) / 2;
                playersInTheHat.push(player);
            }
        }
    });

    let playersToBeAllocated = [];

    // Assign players to any teams they have been forced pushed to...

    playersInTheHat.forEach(function(player) {
        if (player["force-team"] === "1") {
            team1.push(player);
            player["team"] = 1;
        }
        else if (player["force-team"] === "2") {
            team2.push(player);
            player["team"] = 2;
        }
        else {
            playersToBeAllocated.push(player);
        }
    });

    let team1Keepers = howManyKeepersOnTeam(team1, "force-position");
    let team2Keepers = howManyKeepersOnTeam(team2,  "force-position");

    let playersStillToBeAllocated = [];

    playersToBeAllocated.forEach(function(player) {
        if (player["force-position"] === "GK" && team1Keepers === 0) {
            team1.push(player);
            player["team"] = 1;
        }
        else if (player["force-position"] === "GK" && team2Keepers === 0) {
            team2.push(player);
            player["team"] = 2;
        }
        else {
            playersStillToBeAllocated.push(player);
        }
    });




    // Sort players by average of all scores, best to worst.....
    let playersSortedByAvgScore = sortByKeyDesc(playersStillToBeAllocated, "avg_tot");

    let pickNo = 1;
    let teamNo = createANumber(2);

    /* Select a random team between 1 and 2 and split each pair of players 
    into a team... */

    playersSortedByAvgScore.forEach(function(player) {

        if (team1.length === team2.length) {

            if (pickNo === 1) {

                if (teamNo === 1) {
                    team1.push(player);
                    player["team"] = 1;
                }
                else {
                    team2.push(player);
                    player["team"] = 2;
                }
                pickNo = 2;
            }
            else {
                if (teamNo === 1) {
                    team2.push(player);
                    player["team"] = 2;
                    pickNo = 1;
                    teamNo = createANumber(2)
                }
                else {
                    team1.push(player);
                    player["team"] = 1;
                    pickNo = 1;
                    teamNo = createANumber(2)
                }
            }
        }
        else if (team1.length > team2.length) {
            team2.push(player);
            player["team"] = 2;
        }
        else {
            team1.push(player);
            player["team"] = 1;
        }
    })

    var bothTeamsData = $.merge(team1, team2);

    return bothTeamsData;
}

function assignAMissingKeeper(team) {
    
    var newTeam = team;
    
    let existingKeepers = howManyKeepersOnTeam(newTeam, "picked-position");
    
    if (existingKeepers < 1) {
        
        let sortByGKPref = sortByKeyDesc(newTeam, "gk-pref");
        let maxPref = [];
        let midPref = [];

        sortByGKPref.forEach(function(player) {
            if (player["gk-pref"] == "2") {
                maxPref.push(player);
            }
            else if (player["gk-pref"] == "1") {
                midPref.push(player);
            }

            if (maxPref.length != 0) {
                let newKeeper = maxPref[createANumber(maxPref.length - 1)];
                newTeam.forEach(function(player){
                    if(player["users-name"] === newKeeper["users-name"]){
                        player["picked-position"] = "gk";
                        
                    }
                })
            }
            else if (midPref.length != 0) {
                let newKeeper = midPref[createANumber(maxPref.length - 1)];
                newTeam.forEach(function(player){
                    if(player["users-name"] === newKeeper["users-name"]){
                        player["picked-position"] = "gk";
                        
                    }
                })
            }
            else {
                let newKeeper = newTeam[createANumber(maxPref.length - 1)];
                newTeam.forEach(function(player){
                    if(player["users-name"] === newKeeper["users-name"]){
                        player["picked-position"] = "gk";
                        
                    }
                })
            }

        });

        return newTeam;
    }
}

function assignPlayingPositions(teamData) {
    let team1 = [];
    let team2 = [];

    // Seperate players back into 2 teams...

    teamData.forEach(function(player) {


        if (player["team"] === 1) {
            team1.push(player);
        }
        else if (player["team"] === 2) {
            team2.push(player);
        }
    });

    let goalkeepers = 0

    team1.forEach(function(player) {
        if (player["force-position"] === "gk") {
            goalkeepers += 1;
        }
    })

    team1.forEach(function(player) {
        player["picked-position"] = positionAllocation(player, goalkeepers, createANumber(4), 1);
        if (player["picked-position"] === "gk") {
            goalkeepers += 1;
        }
        else if (player["picked-position"] === undefined) {
            player["picked-position"] === "def"
        }
    });


    goalkeepers = 0

    team2.forEach(function(player) {
        if (player["force-position"] === "gk") {
            goalkeepers += 1;
        }
    })

    team2.forEach(function(player) {
        player["picked-position"] = positionAllocation(player, goalkeepers, createANumber(4), 1);
        if (player["picked-position"] === "gk") {
            goalkeepers += 1;
        }
        else if (player["picked-position"] === undefined) {
            player["picked-position"] === "def"
        }
    });

    var bothTeamsData = $.merge(team1, team2);

    return bothTeamsData;
}

function howManyKeepersOnTeam(team, attr) {
    
    var keepers = 0;

    team.forEach(function(player) {
        if(attr === "force-position"){
            console.log("Matched force");     
            console.log(player);
            
            if (player["force-position"] === "GK"){
                keepers += 1;
                console.log("Finally");
            }
        } else if(attr === "picked-position"){
            console.log(player);
            console.log("Matched picked");     
            
            if (player["picked-position"] === "gk") {
               keepers += 1;
               console.log("Finally");   
            } else {
                console.log(player["picked-position"]);
            }
        }
    });
    
    return keepers;
}

function positionAllocation(thisPlayer, gk, randomNo, numberOfTries) {

    if (thisPlayer["force-position"] != "") {
        return thisPlayer["force-position"].toLowerCase();
    }
    else {
        if (numberOfTries === 10) {
            if (gk != 0) {
                let positions = ["def", "mid", "att"];
                return positions[createANumber(3) - 1];
            }
            else {
                let positions = ["gk", "def", "mid", "att"];
                return positions[createANumber(4) - 1];
            }
        }
        else {
            if (randomNo === 1) {
                if (gk < 1 && parseInt(thisPlayer["gk-pref"], 10) > 0) {
                    return "gk";
                }
                else {
                    numberOfTries += 1;
                    return positionAllocation(thisPlayer, gk, createANumber(4), numberOfTries);
                }
            }
            else if (randomNo === 2) {
                if (parseInt(thisPlayer["def-pref"], 10) > 0) {
                    return "def";
                }
                else {
                    numberOfTries += 1;
                    return positionAllocation(thisPlayer, gk, createANumber(4), numberOfTries);
                }
            }
            else if (randomNo === 3) {
                if (parseInt(thisPlayer["mid-pref"], 10) > 0) {
                    return "mid";
                }
                else {
                    numberOfTries += 1;
                    return positionAllocation(thisPlayer, gk, createANumber(4), numberOfTries);
                }
            }
            else {
                if (parseInt(thisPlayer["att-pref"], 10) > 0) {
                    return "att";
                }
                else {
                    numberOfTries += 1;
                    return positionAllocation(thisPlayer, gk, createANumber(4), numberOfTries);
                }
            }
        }
    }
}

function calculateTeamsAverageScore(team, attribute) {
    let scores = [];

    team.forEach(function(player) {
        if (player["picked-position"] === "gk") {
            scores.push(parseFloat(player["avg_gk"]));
        }
        else {
            scores.push(parseFloat(player[attribute]));
        }
    })

    const teamScore = scores.reduce((total, amount) => total + amount);
    const avgScore = teamScore / scores.length;
    return avgScore;
}

function addPlayersToPitch(teamSelection) {
    teamSelection.forEach(function(player) {
        if (player["team"] === 1) {
            var thisPlayer = '<div class="team-1-player"><p>' +
                player["full-username"] + '</p></div>';

            let rowToAppend = '.' + player["picked-position"] + "-row-team1";

            $(rowToAppend).append(thisPlayer);
        }
        else {
            thisPlayer = '<div class="team-2-player"><p>' +
                player["full-username"] + '</p></div>';

            let rowToAppend = '.' + player["picked-position"] + "-row-team2";

            $(rowToAppend).append(thisPlayer);
        }
    });
}

// Enables post of data to database --------------------------------------------

function postData(type, data) {

    // Sends new data to the database via ajax request

    if (type === "user-personal-details") {
        let newFormData = prepareNewProfileData(data);
        console.log(newFormData)
        let profileURL = "../update_profile_data/";
        let profileID = $('#profile-id').text(); // the ID of the profile that needs to be updated
        console.log(profileID)
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
        preventClick = true
        let availabilityData = data;
        let matchesURL = "../../update_availability_status/";
        let customRoute = availabilityData["matchID"] + "/" + availabilityData["availTablePk"];
        postToDatabase(matchesURL, availabilityData, customRoute);
    }
};


function postToDatabase(url, data, route) {

    //  ajax function will now take this data and post it accordingly via our python view

    $.ajax({
        url: url + route, // the endpoint
        type: "POST", // http method
        data: data,

        // handle a successful response
        success: function(json) {
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check

            $('#update-form').remove();

            if (url === "../../update_availability_status/") {

                // For use on updating availability status only if instance has just been created, the pk of the instance needs to be updated to avoid creating multiple instances

                $("#avail-table-pk").text(json["instanceID"]);
                preventClick = false

            }
            else if (url != "../update_position_pref/") {
                if (json["result"] == 'Update successful!') {
                    displayMessage("GOAL!  Details updated...");

                }
                else {
                    displayMessage("Hmmm, we're not sure that worked, please try later...");
                }
            }

            // This code will replace data on profile section with new data
            if (url.indexOf("update_profile_data") != -1) {
                replaceOldValuesInRealtime(data);
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
                console.log("clicked")
                break;
            case "open-sign-up-btn":
                $('.sign-up-form').show();
                break;
            case "open-create-group-form-icon":
                $('.create-group-form').show();
                break;
            case "pick-teams-btn":
                $('.team-1-player, .team-2-player').remove(); // Remove exisitng team generation
                var teamData = pickTeams(collectTeamSettingsData(".", "player-data-row")); // Allocate teams
                var pickedTeamsAndPositions = assignPlayingPositions(teamData);
                addPlayersToPitch(pickedTeamsAndPositions); // Render in html template
                $(".user-playing-positions-section").removeClass("start-off-screen");
                $(".user-playing-positions-section").addClass('slide-in-from-right');
                break;
            case "regen-btn":
                $('.team-1-player, .team-2-player').remove(); // Remove exisitng team generation
                var teamData = pickTeams(collectTeamSettingsData(".", "player-data-row")); // Allocate teams
                var pickedTeamsAndPositions = assignPlayingPositions(teamData);
                addPlayersToPitch(pickedTeamsAndPositions); // Render in html template
                break;
            case "back-to-settings-btn":
                $(".user-playing-positions-section").removeClass("slide-in-from-right");
                $(".user-playing-positions-section").addClass('start-off-screen');
                break;
            default:
                console.log('No action Available');
                console.log(this.id);
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
    if ($('.gk-rate').text() === "") {
        let gkRating = parseInt($('.gk-rate').val());
        let defRating = parseInt($('.def-rate').val());
        let moveRating = parseInt($('.move-rate').val());
        let passRating = parseInt($('.pass-rate').val());
        let finRating = parseInt($('.fin-rate').val());

        let ratingsList = [gkRating, defRating, moveRating, passRating, finRating];
        return ratingsList
    }
    else {
        let gkRating = $('.gk-rate').text();
        let defRating = parseInt($('.def-rate').text());
        let moveRating = parseInt($('.move-rate').text());
        let passRating = parseInt($('.pass-rate').text());
        let finRating = parseInt($('.fin-rate').text());

        let ratingsList = [gkRating, defRating, moveRating, passRating, finRating];
        return ratingsList
    }
}

// Script ----------------------------------------------------------------------

$(document).ready(function() {

    // activateButton will allow buttons to perform their set funtion based on their id...

    activateButton();

    // Helper functions
    closeParent();
    removeParent();
    slideInMessagesBox();
    unhideABox("show-create-new-group-form", "create-group-form");
    unhideABox("show-join-group-form", "join-group-form");
    unhideABox("edit-match-btn", "match-form");

    createEditProfileDataForm();
    preparePositionPrefData();

    // Updates profile database with new user info when submitted ------------------

    $('body').on("click", ".update-form-btn", function(e) {
        e.preventDefault();
        console.log("form submitted!");
        let data = returnExistingProfileData();
        postData("user-personal-details", data);
    });

    // Updates profile database with new position prefs info when submitted ------------------

    $(".attack, .midfield, .defense, .goalkeeper").click(function() {

        let elementClicked = this.id;
        let data = preparePositionPrefData(elementClicked);
        postData("user-position-prefs", data);

    });

    // Updates AttributeRating database with new or edited rating when submitted ----

    $('body').on("click", ".update-player-attributes-btn", function(e) {
        e.preventDefault();
        console.log("form submitted!");
        let data = collectFormData("#", "rate-player-form");
        if (data != null) {
            postData("attribute-rating", data);
        }
    });

    // Updates player match availability status when submitted ------------------

    $(".i-am-unconfirmed, .i-have-confirmed, .i-am-unavailable").click(function() {
        if (preventClick === false) {
            let data = updateMatchAvailability(this.className);
            postData("update-match-availability-status", data);
        }
    });

    curvePlayerNames();


    // Chart.js Radar chart

    var myRadarChart = new Chart(ctx, {

        type: 'radar',
        data: {
            labels: ['Goalkeeping', 'Defending', 'Movement', 'Passing', 'Finishing'],
            datasets: [{
                data: prepareChartData(),
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

});
