// Switch statement to help manage button functionality ------------------------

function activateButton() {
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

// Closes the parent of the button which sits in the top corner of any popup box
function closeParent(){
    $(".close-parent-btn").click(function() {
        $(this).parent().fadeOut('fast');
    });
}

// Slides in any messages 
function slideInMessagesBox(){
    if($(".messages-box")){
        $(".messages-box").addClass("slide-in-from-right");
    }
}

// Script 

$(document).ready(function() {

    // activateButton will allow buttons to perform their set funtion 
    // based on their id...
    activateButton();
    closeParent();
    slideInMessagesBox();
    
});