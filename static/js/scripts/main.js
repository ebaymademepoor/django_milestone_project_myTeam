// A message function to the user ----------------------------------------------

function displayMessage(message) {
    
    // Displays a message when called which is built into base.html but initially hidden ...
    
    $('.message-para').text(message);
    slideInMessagesBox();
    $('html, body').animate({
            scrollTop: ($('.messages-container').offset().top)
    },500);    
}

// Edit data functions (personal details) --------------------------------------

function createEditProfileDataForm(){
    
    // This function creates a form for the profile info that the user would like to update
    
    $("dt").click(function() {
        var field = this.className;
        var profileID = $('#profile-id').text();
        
        if (field === "date_of_birth"){
            var type = "date"
        } else {
            var type = "text"
        }
        
        if(field != ""){
            var updateForm = '<form id="update-form" method="POST" action="edit_profile/' 
            + profileID +
            '"><div class="remove-parent-btn">x</div><label>' 
            + field + '</label><input type="' + type + '" name="' + field +
            '" id="' + field
            + '"><button type="submit" class="update-form-btn">Update</button></form>'
        }
        
        $('.profile-page').after(updateForm);
    })
}

function returnExistingProfileData(){
    
    // Stores any existing profile data the user has ready for editing pre POST
    
    var firstName = $('.first_name').next().text();
    var surname = $('.surname').next().text();
    var nickname = $('.nickname').next().text();
    var dob = $('.date_of_birth').next().text();
    
    let profileData = {"first_name" : firstName, "surname" : surname, "nickname" : nickname, "date_of_birth" : dob};
    return profileData;
}

function prepareNewProfileData(oldData){
    
    // Combinds the newly entered user data with the existing data ready to be POSTED
    
    var formData = $("#update-form").serializeArray(); // The serialized new data entered into the form

    // This holds the information to be posted
    let newFormData = {};
    
    // If DOB is being changed, only DOB will be posted
    if(formData[0].name === "date_of_birth"){
        newFormData["date_of_birth"] = formData[0].value;    
    } else {
        
    // Else firstname, surname and nickname will be posted
        
        Object.entries(oldData).forEach(([key, value]) => {
        
            if(key != "date_of_birth"){
                
                if(formData[0].name === key){
                    newFormData[key] = formData[0].value;
                } else {
                    newFormData[key] = value;
                }
            }
        });    
    }
    
    return newFormData;
}

function replaceOldValuesInRealtime(data){
    
    // Used on the profile page, will update data in real time
    
    Object.entries(data).forEach(([key, value]) => {
        $('.' + key).next().text(value);
    });    
}

// Edit data functions (position preferences) ----------------------------------

function preparePositionPrefData(element){
    
    // When a button is clicked, the value for that position should change to reflect new preference set
    
    let newFormData = {}
        
        if($('#' + element).hasClass("preferred-box")){
            newFormData[element] = 0;
            $('#' + element).removeClass("preferred-box");
        } else if ($('#' + element).hasClass("can-play-box")){
            newFormData[element] = 2;
            $('#' + element).removeClass("can-play-box").addClass("preferred-box")
        } else {
            newFormData[element] = 1;
            $('#' + element).addClass("can-play-box")
        }
        
        return newFormData;
}

// Enables post of data to database --------------------------------------------

function postData(type, data) {
    
    // Sends new data to the database via ajax request
    
    if(type === "user-personal-details"){
        let newFormData = prepareNewProfileData(data);
        let profileURL= "../update_profile_data/";
        postToDatabase(profileURL, newFormData);
    } else if (type === "user-position-prefs"){
        let newPref = data;
        let profileURL= "../update_position_pref/";
        postToDatabase(profileURL, newPref);
    }
};


function postToDatabase(url, data){
    
    let profileID = $('#profile-id').text(); // the ID of the profile that needs to be updated
    
    //  ajax function will now take this data and post it accordingly via our python view
    
    $.ajax({
        url : url + profileID, // the endpoint
        type : "POST", // http method
        data : data,

        // handle a successful response
        success : function(json) {
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
            
            $('#update-form').remove();
            
            
            // This code will replace data on profile section with new data
            if(url.indexOf("update_profile_data") != -1){
                replaceOldValuesInRealtime(data);
            }
            
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            
            displayMessage("An error has occured, please try later");
            
        }
    });
}

// Helper functions ------------------------------------------------------------

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
            default:
                console.log('No action Available');
                console.log(this.id);
        }
    });
};

function closeParent(){
    
    // Closes the parent of the button which sits in the top corner of any popup box
    
    $(".close-parent-btn").click(function() {
        $(this).parent().fadeOut('fast');
    });
}

function removeParent(){
    
    // Removes the parent of the button which sits in the top corner of any popup box
    
    $("body").on("click", ".remove-parent-btn", function(e) {
        $(this).parent().remove();
    });
}

function slideInMessagesBox(){
    
    // Slides in any messages 
    
    if($(".messages-box")){
        $(".messages-box").addClass("slide-in-from-right");
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