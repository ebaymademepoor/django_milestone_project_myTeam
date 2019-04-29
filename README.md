
[![Build Status](https://travis-ci.org/ebaymademepoor/django_milestone_project_myTeam.svg?branch=master)](https://travis-ci.org/ebaymademepoor/django_milestone_project_myTeam)

Collect static - version numbers




NOTE - Newly created super user must create a profile in django admin after being added via terminal or profile page will not display, a profile per user is required

Bugs - photo orientation / compression

commercial opportunity

# FULL STACK FRAMEWORKS WITH DJANGO PROJECT NAME: MY TEAM
## NAME:  GIANCARLO FIORLETTA


## INTRODUCTION:

In this project, I have created an app style website that enables users to 
organise their regular football matches with friends.  I have used several
technologies to demonstrate my abilities as a full stack developer, and in
particular my proficiency in utilising the django framework.

From a user perspective the website should allow them to create a playing profile,
create or join a group of fellow users, create matches, confirm their availability
for each match, rate their peers from both a playing attributes and player 
performance perspective and finally, users can generate teams determined by their
stats ensuring even matches.

## UX

### AIMS:

The main aims of the project are as follows...

1)  To allow the user to register and create their own user profile
2)  To allow the user to create or join a group for their fellow team members
3)  To allow the user to create matches allowing them and their peers to confirm availability
4)  To allow users to generate teams which are determined by how each user is rated
5)  To allow a user to rate each of their peers performance and see their form / stats

The website should also be responsive so that it works across all devices and media sizes.  
It should be intuitive and easy for the user to use.

### USER STORIES:

To understand why people might choose to use this site and therefore provide direction 
on its creation, I created a number of user stories as follows...

Story 1:  As a regular football player, I want to easily organise our matches with friends

Story 2: As a footballer, I'd like to know what my fellow peers think of my skills and performance
to help guide me where I need to improve

Story 3:  As a regular football player, I want to remove the hassle of having to pick 
even teams for each game and want to reduce the time lost at the start of each match
selecting teams

Story 4:  As a regular footballer who often players with new players, I'd like to 
know more about my team mates before playing so I know what they look like and 
what to call them

Although a big undertaking, the website will provide a complete solution for these
users and is inspired by real life issues myself and my fellow group members
experience on a weekly basis when organising our football matches.

### WIREFRAMES:

The wirefames (found in the wireframes_and_design_notes folder) provide a good early 
indication of how I wanted the site to look and feel.  The final site has stayed very 
close to this orioginal design but has been modified to try and make it more user 
friendly.

After consideration of names, approach and colour schemes I decided to use a green,
yellow, blue and black scheme (the green would work well for the football pitches)
and I selected the name myTeam after consultation with a number of people in
my football group.

The concept of what the site wants to achieve is sound but could become complicated 
for a user to get used to, therefore at times I broke away from the original 
wireframe to try and make the operation of the site as user friendly as possible,
keeping the UX in mind at all times.

My website will is divided into 6 apps, accounts, groups, matches, profile_and_stats,
subscriptions and team_gen.

## FEATURES

### EXISTING FEATURES:

#### PAGE 1 - HOME PAGE (index.html - located in root templates folder):

The site could be viewed as quite complex in principle so the home page has been 
kept very simple.  If logged out the nav bar which is fixed to the top of the screen 
simply shows the myTeam logo and a link to the get started registration / login 
page.  If logged in the user has links to their profile and the groups select page,
as well as having the option to log out.

This is followed by three sections, all of which have been styled based on the sites
brand colors, which includes the images which have been monotoned to each section
colour using https://manytools.org/image/colorize-filter/

Each section contains a brief description of the features of the site followed
by a responsive get started link button.

There is also a user video that gives any new user a glance of what the site can do
before registering.

A footer resides at the bottom of the page containing links to the about us, get
in touch, and donate pages.

### PAGES 2 & 3 - ABOUT US & GET STARTED PAGES (located in root templates folder)

The about us and get started pages are just here to give the user a little bit of 
additional information about the site and a contact email address should they 
wish to get in touch.

#### PAGE 4 - GET STARTED (get_started.html - located in root templates folder):

The get started page has been split into a top and bottom half to represent a 
football pitch of sorts.  Each half contains a form, one for existing users to
log in and one for new users to sign up.  The sign in form also contains a 
link for any users that have forgotten their passwords which will take them
through the standard django reset passwords method.

Upon registering, each new user will get an email confirming their chosen username 
and welcoming them to the site.

Upon registering / sign in, the user will be taken to their profile page.

#### PAGES 5, 6 - PROFILE PAGES (profile.html, player-profile.html - located in profile_and_stats/templates):

The profile pages use much the same design with a few subtle differences.

Profile.html is designed for a player to see their own profile and make amendments
to it for personalisation.

The first section contains all of the players details.  They may choose a photo
to use so that other group members can see what they look like, or alternatively
a shirt image will be displayed with their username on the back, or nickname
if one has been entered.  Their details are then displayed and these can be updated 
by clicking the appropriate heading.  The updateable headings have an inner shadow
to make them look a little raised like a button.  

Their registration date and license expiry date are shown at the bottom of the list.  
Each user will get a full lisence for 30 days upon registration.  Once this expires 
they will no longer be able to view their or any of their peers form section unless 
they renew their license.  This is the only feature currently affected by the license
so a user can still use the site perfectly well even without a license.

Next is the user playing positions section.  The user can click each of the attack, 
midfield, defense and goalkeeper positions on the pitch to select their playing
preferences between preferred, can play and can't play.  This will then be stored 
in the database and taken into consideration when teams are selected via team 
generation.

The user attributes section will show the user how their attributes have been 
rated on average by their peers in the areas of goalkeeping, passing, defending, finishing 
and movement, the latter four of which aggregate to their overall outfield score.
The section also show how many users have voted them and displays a chart.js 
radar graph underneath which gives them a visual representation of their skills.

Finally their form section.  If the users license is in date, their average all time
performance rating which is made up of every rating their peers have ever given for 
their performance, followed by how they've been rated on average for the last 5 matches 
that they've played in.  These 5 sets of average scores make up their overall form rating.

If the license has expired, the user will get a message to advise accordingly and
a button to take them to the license renewal page.

Player-profile.html is accessed via the group home page and contains most of the 
above with a few differences.  

As the page is another users profile, the date of birth is converted to age for
information security.  The user playing positions are read only and cannot be 
changed. The attributes section for the player now has a number of input boxes
allowing you to rate the players attributes on your own personal opinion or 
displays how you've rated them previously.  This can be updated at any point.

Other than that both pages are very similar!


#### PAGE 7 - GROUP SELECT (group-select.html - located in groups/templates):

Groups can be created by a user or a user can join an exisiting group.
The group links to both users and matches and is the hub of the entire site,
using information from all other apps.

Initially the user can click the create a group button and start a brand new group,
or join an exisitng one as long as they have the group id and password.  Either 
option will bring up the appropriate form to complete.

For any groups that the user is a member of, these will appear on the page displaying
how many members are in the group, the groups name and creator, and when the 
next scheduled match is if one has been created.

Clicking on a group will take the user to that groups home page.

#### PAGE 8 - GROUP HOME (group-select.html - located in groups/templates):

The group home page allows the user to undertake several actions in relation to their
group.

The top section displays some basic details about the group similar to the group 
select page.  The following row displays the group ID number and an option to 
display the groups password, these details can be passed on to other users to allow
friends to join the group.  

Next is the matches section which shows any matches that have been organised.  Upto
8 matches will be displayed in this row.  The first will be the match arranged for no
more than 7 days previous and then the proceeding 7 matches from that date.  So even
if a team has a game each day, they will still be able to access the next upcoming 
game to confirm their availability (groups cannot have more than 1 match organised
per day).  The row can be dragged on a mobile device to reveal future matches.

Each of the matches show some basic information about the game and its 
status.  In order to create a match, the user can click on the responsive
plus button to be taken to the create match page.

Below the matches section is the group members section.  Each member is represented 
by a shirt.  The logged in user will see their shirt in the head of this section,
clicking on the shirt will take them to a version of their profile.

Any other member in the group appears below with a shirt of their own.  If the logged 
in user has already rated a players attributes, a summary of those ratings will
be displayed next to each player, as well as then last time they were rated so 
that a user can keep those ratings up to date if required.  If the logged in
user has not rated a player, a message will appear asking them to complete a rating.

#### PAGE 9 - MATCH PAGE (match_page.html - located in matches/templates)

There are several versions of the matches page that will display dependant on the 
circumstances of the match.

1) No match data - If a player clicks to create a match on the group home page, this page
will detect that no exisitng data is available and that this is a new match booking.
Therefore a form will be provided where the user can populate all of the relevant details 
to create the match.  Once created the user is redirected to group home where the 
match will now appear in the matches row.

2)  Available match data (prematch) - If a player clicks on an existing match on the group home
page and the date and time of the match have not passed, this page will load with 
the details of this match in the first section.

Underneath an edit match button is displayed, on click a section will open the same
as if the match was to be created but prepopulated with the current data.  The user
can update these details as they see fit and submit for the match to be updated.

There are two buttons also available.  The first email reminders button will send
an email to all of the players within the group that are yet to confirm their availability
for the match.  The email has a link that, providing the user is logged in on their device,
will take them straight to the match page in question. An email can only be sent twice per 
match so that the rest of the users aren't bombared with request emails.

The generate teams button will take the player to the team generation page.

The final section entitled player availability, lists each group member and their 
current availability for that game.  The logged in user appears at the top of the list.
If they have not yet confirmed their availability, their button will be grey and
titled with 'available?'', upon clicking this but it will change to 'available' and
then 'unavailable' respectively.

Each of the other group members are listed below with an icon that reflects their 
current availability dependant on their input.

2)  Available match data (postmatch) - Once the date and time of the match has past,
the edit match, email reminders and team generation buttons will be removed and 
as long as the match wasn't listed as cancelled, they will be replaced with a rate 
performances button which will take the user to the rate performance page.

There will also be an additional column in the player availability section, which 
will contain a thumbs up for any user that has submitted ratings, and a thumbs 
down for those that are yet to record their performance ratings.

#### PAGE 10 - TEAM GENERATION PAGE (gen_settings.html - located in team_gen/templates)

On this page, the user is greeted with another list of each group member.  Each members 
row contains a summary of that player, including their player preferences, average 
rated attributed in goal and outfield, and their availability as it currently stands.

Next to these are a series of inputs labelled, force include, force exclude, 
force team and force position.  These are all options that can be selected that will
overwrite the existing availability and player position preferences when generating teams.

If any player is marked as unavailable or with availability unknown, clicking
the force include button on that user will ensure that they are still selected within
a team.  This is useful because if a player can't get online to confirm their 
availability, the user generating teams can include them in the team selection 
anyway.

Likewise, if a player has confirmed their availability the team generator will automatically
select them, so if a player wants to discount them they can click the force exclude 
option.  Thsi could be useful if there are too many players available for example.

The final two options allow a user to select what team or position they would like to 
allocate a player to if they have specific preferences.  So if one player can only ever play
in one position, or is there are two players you always want to seperate it can be
done here.

Clicking the pick teams button underneath the list will slide in a football pitch 
with teams listed to take into account any settings the user has forced.  A team score
will also be displayed to show how the teams compared based on attribute ratings for 
each member.  

The settings button takes the player back to the settings to be
amended if necessary.  The regen button allows the teams to be reselected as many
times a user wishes until they are happy with the balance of the teams.

Finally, there is a save button which will add the teams to the database.  Once a team
is saved, a button will appear next to the pick teams button to recover the saved teams.
Those teams are then used for the performance rating page after the match.

#### PAGE 11 - RATE PERFORMANCE PAGE (rate_performance.html - located in matches/templates)

Once the data and time of any given match has past, providing the game wasn't cancelled
and generated teams had been saved, and providing the user hasn't already saved their ratings
for the match, the rate performances page will appear via the associated match page.  

Here each of the player that saved saved in the teams (excluding the current user),
will appear on the screen with the option to choose where the player performed
good, average or poor.

Once a selection has been made for each player, if the user submits their ratings they
will be saved to the database, and an average of everybody's ratings for each 
player will appear in the form section of the profile pages.

#### PAGE 12 & 13 - SUBSCRIPTION & DONATE PAGES (checkout.html - located in subscriptions/templates)

The donate & subscription pages use stripe to accept credit card payments from the 
user should they wish to donate to the enhancement of the website or extend their
full license.

Any donations create a record in the database via the subscripions app so it is 
clear which user donated, when the donation was made and the value.  The same occurs 
when a user subscribes but their license date also gets updated so that they can 
view form data once more.

The donation page can be accessed via the footer, where as the link to the subscription 
page only appears when a users license has expired within the player form section
of the profile pages.

#### Misc

1) Each page has a loading screen that covers the template for a few seconds while 
loading built into base.html.  This just helps for the images to load fully before 
the users see the content.  It is not foolproof and there are other ways this could 
be implemented, but the setTimeout function that removes the screen is the last 
piece of code that runs when loading the page so would hopefully have a fairly 
high success rate in most cases.

2) A message box has also been built into base.html which hides off screen to the
right of the template.  This will appear if any messages are pushed via the backend 
and if called via javascript as and when required.  These are used to provide 
feedback to the user when necessary.

3) Password pages - These are held in the root templates/registartion folder and
follow the standard method for reseting passwords using the django framework.

### FUTURE FEATURES:

#### Admin users
Currently any member of a group can email reminders, generate and save teams,
view the current password for each group etc.  I plan to introduce admin users 
(initially the group creator), who can allocated other admin users who are 
more in control of some of the features.

#### More email updates
There needs to be a balance of emailed updates but I'm considering the possibility
of emailing saved teams and possibly created matches too.

#### Additional team generation options
I still need to build form into team generation and plan to use form to increase 
or decrease a players attribute values by 10% dependent on whether their form is
good, average or poor.  I also intend to introduce other options like a formation to
choose for each team and a maximum players per team option to name but a few. 

## TECHNOLOGIES USED:

#### 1:  NAME - JQuery

LINK - https://jquery.com/

REASON - Jquery has been used as it provides some very useful methods when working 
with javascript and these have often been utilised in my javascript code.

#### 2: NAME - Google Fonts

LINK - https://fonts.google.com/

REASON - Used to style the three types of fonts incorporated into the style of the site.

#### 3: NAME - Font Awesome

LINK - https://fontawesome.com/

REASON - Font awesome has been used to incorporate its icons onto the site as it 
has multiple options to ensure that the icon used is relevant to the content 
it is being used for, in this case they are mainly used in the nav-bar against 
each navigation option.

#### 4: NAME - SASS

LINK - https://sass-lang.com/

REASON - Sass has really helped me to organise my css code and has some really 
useful features such as the way it handles media queries which makes this part 
of styling much less painful.  It also helps the site to load faster through the 
use of placeholders which are only used when called upon.

#### 5: NAME - chart.js

LINK - https://www.chartjs.org/docs/latest/

REASON - Chart js is used on the site to create a radar chart which is a visual
representation of a players attribute ratings.  I found chart js very easy to 
use and it does exactly what I wanted to achieve when designing the website.

#### 6: NAME - Circletype js

Link https://circletype.labwire.ca/

REASON - Circle type is a js library that can cureve words contained with the
template.  I used this to curve the names on the back of the shirts that represent 
each user to give the shirts a more authentic look.

#### 7: NAME - Stripe

Link - https://stripe.com/gb/

Stripe allows me to take credit card payments through my website though behind
the scenes javascript code.  This is necessary on my site to ensure users can
renew their licences or make donations.

#### 8: NAME - Django 

Link - https://www.djangoproject.com/

Django is the framework I have used to create my site.  By using a combination
of views, urls, forms and models, the site is very easy to work on and has 
many built in features as standard that makes the whole process of building the 
site better and faster.

## WEBSITE WORKINGS:

### Django

My site has been broken down into 6 main apps, these are ACCOUNTS, GROUPS,
MATCHES, PROFILE_AND_STATS, SUBSCRIPTIONS and TEAM_GEN.  Each plays a specific role 
for the site and have been described within the features section.

I use a number of one to one, one to many and many to many relationships between 
the models located within each of the apps to ensure that data is linked and 
behaves in the way I have designed it to.  

The views for these pages often receive post requests with data that is then manipulated
in some way to ensure the intended data is correctly saved to the database.  However
some views recieve data via a javascript ajax POST function to ensure that the 
user gets the best possible experience when using the site and to ensure that
unnecessary page refreshes are kept to a miunimum and do not interupt their experience.

Their is often quite a lot of data passed into the templates which can sometimes
require a moderate amount of template logic to ensure the right data is shown and 
in the intended fashion.  Some of this might have been better served in the 
backend and this is something for me to consider going forward.

### MAIN.JS

There are many simplistic helper functions held within the main js file but there 
are also a few more substantial ones that require futher explanation.  Here is 
a quick run down of the more complex inner workings...

1) TEAM GENERATION - runTeamGenerationPromises()

When invoked, this function activates a series of functions managed via promises
to ensure that a) the code that creates the generated teams is compartmentalised
and easier to follow, and b) to ensure that the data is successfully updated from
one stage to the next to ensure the intended end result.

To summarise the process here, the first function is a promise that takes all 
of the data necessary to create teams from the template which had been loaded in
from the database when calling the page, including any parameters the user has
set by clicking the option buttons or choosing specific team and playing positions.

This data is then past function to function via the promises sequence and updated
to produce a final list of players with allocated playing positions and team numbers
in the most even way possible (with an element of random behavour that allows the 
teams to be regenerated with a different result, even though the same criteria
maybe reused). Finally, the created teams are then appended to the relevant places 
on template within the pitch to show the user the resulting teams.

The overall process works really well but could be improved upon to take into 
account more factors such as fairer uneven teams.

2)  AJAX FUNCTIONS - preparePostData(type, data) & postToDatabase(url, data, route)

There are a number if instances where I wanted the user to be able to make a choice
that saved information to the database without them being interputed by having to reload 
the page (such as playing position preferences and match availability).  Therefore 
I created these two functions to enable me to do this in the best way possible.

preparePostData() gets data ready and in the correct format with the required 
accompanying information to make sure it is posted to the database correctly. Once 
it has been used to successfully manage the data and the route information, it is then
passed to the postToDatabase() function for processing.  The relevant django view 
will then handle the data and once information is passed back from the backend,
this fuction will handle feedback to the user or the required subsequent actions 
accordingly, dependant on the type of request and the outcome of it.

This all helps keep the code tidy and working together with the sole reason
of providing the user with the best and smoothest experience when using the site.

CSRF tokens are also required for django to process the data received from the ajax
POST, the prepareCSRFToken() function handles this and was taken from the following
article in order to achieve the required result...

https://realpython.com/django-and-ajax-form-submissions/

## WEBSITE TESTING:

#### UX

Story 1:  As a regular football player, I want to easily organise our matches with friends

REFLECTION - After create a group and getting other people to join it, it's really
easy to create matches with relevant details, send email reminders with links
and get fellow users to confirm their availability, so this is a definate pass!

Story 2: As a footballer, I'd like to know what my fellow peers think of my skills
and performance to help guide me where I need to improve

REFLECTION - Both attributes and performance can be rated for each player and 
viewed via the profile screens, this use will be very happy I'm sure!

Story 3:  As a regular football player, I want to remove the hassle of having to pick 
even teams for each game and want to reduce the time lost at the start of each match
selecting teams

REFLECTION - THe team generation feature has this need covered and provides
pleanty of options for the user to tweek their team selections as desired.

Story 4:  As a regular footballer who often players with new players, I'd like to 
know more about my team mates before playing so I know what they look like and 
what to call them

REFLECTION - Provide users update their details, it's really easy to click on a 
team mates profile and view more information about them before the match, even
if you didn't know them before the game.

The site has been used by my group for a number of weeks now and I've received 
some good feedback.  I'm very confident that all of the above users will be 
accounted for.

#### STYLING / FUNCTIONALITY

Each element on the site has been manually tested to ensure it functions as intended as follows:

**Test 1** - On home page, logo is clicked - reloads home page - SUCCESS

**Test 2** - On home page, welcome message fades in - SUCCESS

**Test 3** - On home page, all nav icons increase in size when hovered - SUCCESS

**Test 4** - On home page, sign up button turns red when hovered and loads sign up page - SUCCESS

**Test 5** - On home page, try a recipe now text underlines when hovered and loads recipes page - SUCCESS

**Test 6** - On home page, see ingredients list now text underlines when hovered and loads ingredients page - SUCCESS

**Test 7** - On home page, leaderboard icon zooms in background picture when hovered and head chefs page - SUCCESS

**Test 8** - On home page, food wall displays expected site recipe stats - SUCCESS

**Test 9** - On sign up page, sign up form files in half from the left and half from the right - SUCCESS

**Test 10** - On sign up page, submit button turns red and background image is zoomed when hovered - SUCCESS

**Test 11** - On sign up page, on attempt to sign in as existing user, error message is displayed to user - SUCCESS

**Test 12** - On sign up page, on attempt to sign in as a new user, user is redirected to home page with a welcome message - SUCCESS

**Test 13** - On home page, user clicks the logout nav icon and is signed out and redirected to the home page with appropriate message - SUCCESS

**Test 14** - On log in page, submit button turns red and background image is zoomed when hovered - SUCCESS

**Test 15** - On log in page, user is able to log in with correct username and password and is redirected to recipes page with welcome back message - SUCCESS

**Test 16** - On log in page, user is presented with appropriate message when trying to log in with an incorrect password - SUCCESS

**Test 17** - On profile page, user personalised photo instructions appear when ? icon is hovered - SUCCESS

**Test 18** - On profile page, go back button turns red on hover and takes the user back to the recipes page on click - SUCCESS

**Test 19** - On profile page, submit button turns red on hover and updates any amended user details within the database on click with an appropriate message - SUCCESS

**Test 20** - On recipes page, add recipe button turns red on hover and tells unregistered user they are unable to add a recipe - SUCCESS

**Test 21** - On recipes page, add recipe button turns red on hover and takes registered user to add a recipe step 1 page - SUCCESS

**Test 22** - On recipes page, the user is able to use filters to manage the category they would like to view  - SUCCESS

**Test 23** - On recipes page, the user is able to use sort to manage the order of the recipes filtered  - SUCCESS

**Test 24** - On recipes page, the user is able to select how many reviews to view at once via the view x recipes buttons  - SUCCESS

**Test 25** - On recipes page, a hovered recipes background colour changes and the user is taken to view recipe page when clicked  - SUCCESS

**Test 26** - On recipes page, while logged in, any recipes I have added have a delete and edit but that turn red on hover  - SUCCESS

**Test 27** - On recipes page, while logged in, when deleting my recipe a confirm box appears and disappears if cancel is pressed - SUCCESS

**Test 28** - On recipes page, while logged in, when deleting my recipe a confirm box appears and the recipe is deleted if confirm is pressed - SUCCESS

**Test 28** - On recipes page, while logged in, the edit button turns red on hover and takes me to edit page for that specific recipe on click - SUCCESS

**Test 29** - On view recipe page, a please wait box shows while recipe data is received, and the recipe data is loaded in upon receipt - SUCCESS

**Test 30** - On view recipe page, I can add a review if I am logged in and I have not already reviewed a recipe - SUCCESS

**Test 31** - On add recipe page, I can add a new recipe to the database when completing cuisine type and recipe name - SUCCESS

**Test 32** - On edit recipe page, update recipe button turns red and updates recipe name, photo image address and cuisine type on click - SUCCESS

**Test 33** - On edit recipe page, on click of minus icon, I can remove a step from the instructions list and the list refreshes- SUCCESS

**Test 34** - On edit recipe page, on click of plus icon, I can add a step to the instructions list and the list refreshes- SUCCESS

**Test 35** - On edit recipe page, on click of plus icon, I get a message to include an instruction step number if it has been omitted from the form- SUCCESS

**Test 36** - On edit recipe page, on click of plus icon, I can add an ingredient and quantity to the ingredients list and the list refreshes- SUCCESS

**Test 37** - On edit recipe page, on click of plus icon, I get a message to include an ingredient quantity if it has been omitted from the form- SUCCESS

**Test 38** - On edit recipe page, add ingredient button turns red and takes me to add an ingredient page when clicked, clicking cancel on the loaded page takes me back to the recipe - SUCCESS

**Test 39** - On ingredients page, add ingredient button turns red and takes me to add an ingredient page when clicked, clicking cancel on the loaded page takes me back to the ingredients page - SUCCESS

**Test 40** - On ingredients page, each ingredients edit icon turns red on hover and takes me to edit ingredient page on click - SUCCESS

**Test 41** - On add ingredient page, an ingredient is saved to the database when relevant details are added - SUCCESS

**Test 42** - On edit ingredient page, the name of the ingredient cannot be amended but the image address and allergens switch are functional and update the database accordingly on submit - SUCCESS

**Test 43** - On head chefs page, a list of the top rated users is displayed in order with the number of recipes submitted and the average scores- SUCCESS

These tests have also been performed in different orders to ensure the result and the way the game is displayed is always as intended and no errors have been found.

#### DEVICES

Using Google Chromes toggle device toolbar, I have extensively viewed the page on each of the following devices to ensure that the website looks as it was intended at each media size.  I have also 
tested the website on some live devices via the published heroku link.  The following table signifies which tests have been carried out on each device and the status of each based on 
how the site looks visually:

|DEVICE NAME         |VIRTUAL/DEVICE TESTED           |PAGE VISITED             |STATUS
|--------------------|--------------------------------|-------------------------|-------------------
|iPhone 5            |Virtual(chrome)                 |index.html               |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |index.html               |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |index.html               |Renders as intended
|iPhone X            |Virtual(chrome)                 |index.html               |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |index.html               |Renders as intended
|Galaxy S9           |Actual device                   |index.html               |Renders as intended
|Pixel 2             |Virtual(chrome)                 |index.html               |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |index.html               |Renders as intended
|iPhone X            |Virtual(chrome)                 |index.html               |Renders as intended
|iPad                |Actual device                   |index.html               |Renders as intended
|iPad Pro            |Virtual(chrome)                 |index.html               |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |index.html               |Renders as intended
|Desktop (24 inch)   |Actual device                   |index.html               |Renders as intended
|iPhone 5            |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|iPhone X            |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|Galaxy S9           |Actual device                   |add_ingredient.html      |Renders as intended
|Pixel 2             |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|iPhone X            |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|iPad                |Actual device                   |add_ingredient.html      |Renders as intended
|iPad Pro            |Virtual(chrome)                 |add_ingredient.html      |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |add_ingredient.html      |Renders as intended
|Desktop (24 inch)   |Actual device                   |add_ingredient.html      |Renders as intended
|iPhone 5            |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|Galaxy S9           |Actual device                   |add_recipe.html          |Renders as intended
|Pixel 2             |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|iPad                |Actual device                   |add_recipe.html          |Renders as intended
|iPad Pro            |Virtual(chrome)                 |add_recipe.html          |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |add_recipe.html          |Renders as intended
|Desktop (24 inch)   |Actual device                   |add_recipe.html          |Renders as intended
|iPhone 5            |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|iPhone X            |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|Galaxy S9           |Actual device                   |edit_ingredient.html     |Renders as intended
|Pixel 2             |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|iPhone X            |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|iPad                |Actual device                   |edit_ingredient.html     |Renders as intended
|iPad Pro            |Virtual(chrome)                 |edit_ingredient.html     |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |edit_ingredient.html     |Renders as intended
|Desktop (24 inch)   |Actual device                   |edit_ingredient.html     |Renders as intended
|iPhone 5            |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|Galaxy S9           |Actual device                   |head_chefs.html          |Renders as intended
|Pixel 2             |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|iPad                |Actual device                   |head_chefs.html          |Renders as intended
|iPad Pro            |Virtual(chrome)                 |head_chefs.html          |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |head_chefs.html          |Renders as intended
|Desktop (24 inch)   |Actual device                   |head_chefs.html          |Renders as intended
|iPhone 5            |Virtual(chrome)                 |ingredients.html         |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |ingredients.html         |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |ingredients.html         |Renders as intended
|iPhone X            |Virtual(chrome)                 |ingredients.html         |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |ingredients.html         |Renders as intended
|Galaxy S9           |Actual device                   |ingredients.html         |Renders as intended
|Pixel 2             |Virtual(chrome)                 |ingredients.html         |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |ingredients.html         |Renders as intended
|iPhone X            |Virtual(chrome)                 |ingredients.html         |Renders as intended
|iPad                |Actual device                   |ingredients.html         |Renders as intended
|iPad Pro            |Virtual(chrome)                 |ingredients.html         |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |ingredients.html         |Renders as intended
|Desktop (24 inch)   |Actual device                   |ingredients.html         |Renders as intended
|iPhone 5            |Virtual(chrome)                 |log_in.html              |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |log_in.html              |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |log_in.html              |Renders as intended
|iPhone X            |Virtual(chrome)                 |log_in.html              |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |log_in.html              |Renders as intended
|Galaxy S9           |Actual device                   |log_in.html              |Renders as intended
|Pixel 2             |Virtual(chrome)                 |log_in.html              |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |log_in.html              |Renders as intended
|iPhone X            |Virtual(chrome)                 |log_in.html              |Renders as intended
|iPad                |Actual device                   |log_in.html              |Renders as intended
|iPad Pro            |Virtual(chrome)                 |log_in.html              |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |log_in.html              |Renders as intended
|Desktop (24 inch)   |Actual device                   |log_in.html              |Renders as intended
|iPhone 5            |Virtual(chrome)                 |profile.html             |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |profile.html             |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |profile.html             |Renders as intended
|iPhone X            |Virtual(chrome)                 |profile.html             |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |profile.html             |Renders as intended
|Galaxy S9           |Actual device                   |profile.html             |Renders as intended
|Pixel 2             |Virtual(chrome)                 |profile.html             |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |profile.html             |Renders as intended
|iPhone X            |Virtual(chrome)                 |profile.html             |Renders as intended
|iPad                |Actual device                   |profile.html             |Renders as intended
|iPad Pro            |Virtual(chrome)                 |profile.html             |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |profile.html             |Renders as intended
|Desktop (24 inch)   |Actual device                   |profile.html             |Renders as intended
|iPhone 5            |Virtual(chrome)                 |recipes.html             |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |recipes.html             |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |recipes.html             |Renders as intended
|iPhone X            |Virtual(chrome)                 |recipes.html             |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |recipes.html             |Renders as intended
|Galaxy S9           |Actual device                   |recipes.html             |Renders as intended
|Pixel 2             |Virtual(chrome)                 |recipes.html             |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |recipes.html             |Renders as intended
|iPhone X            |Virtual(chrome)                 |recipes.html             |Renders as intended
|iPad                |Actual device                   |recipes.html             |Renders as intended
|iPad Pro            |Virtual(chrome)                 |recipes.html             |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |recipes.html             |Renders as intended
|Desktop (24 inch)   |Actual device                   |recipes.html             |Renders as intended
|iPhone 5            |Virtual(chrome)                 |signup.html              |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |signup.html              |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |signup.html              |Renders as intended
|iPhone X            |Virtual(chrome)                 |signup.html              |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |signup.html              |Renders as intended
|Galaxy S9           |Actual device                   |signup.html              |Renders as intended
|Pixel 2             |Virtual(chrome)                 |signup.html              |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |signup.html              |Renders as intended
|iPhone X            |Virtual(chrome)                 |signup.html              |Renders as intended
|iPad                |Actual device                   |signup.html              |Renders as intended
|iPad Pro            |Virtual(chrome)                 |signup.html              |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |signup.html              |Renders as intended
|Desktop (24 inch)   |Actual device                   |signup.html              |Renders as intended
|iPhone 5            |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|iPhone X            |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|Galaxy S9           |Actual device                   |view_recipe.html         |Renders as intended
|Pixel 2             |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|iPhone X            |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|iPad                |Actual device                   |view_recipe.html         |Renders as intended
|iPad Pro            |Virtual(chrome)                 |view_recipe.html         |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |view_recipe.html         |Renders as intended
|Desktop (24 inch)   |Actual device                   |view_recipe.html         |Renders as intended

The wide range of devices tested showed no visual concerns and should prove a good platform to ensure that it displays well on all devices.

### AUTOMATED TESTING:

I have found automated testing difficult in this project but have set up some sample test to check on the output of specific return functions.  A lot of the code within this project is CRUD and database related, making it difficult to 
apply the types of tests that have been taught up to this point.  However there are a few functions that I have tested, one in app.py and one via jasmine.

1)  App.py test:

In the function tests section of app.py, I have tested the website recipe data function to ensure that the stats that are being return are what I would expect to see from the database.  Therefore I have set up a test_are_equal test from
byotests.py and used a dummy mini database to make sure I got the results I was expecting.

2)  mainSpec.js test:

My automated javascript test uses jasmine to ensure I get the average score I'm expecting for a recipe using the calRecipeScore function.  I have created another dummy database like the one that would be fed through from mlabs to ensure that 
the correct average score matches the one returned by the function checking the scores in the database.

#### BUGS

There were two bugs I experienced when creating this site:

1)  One of the features of this site is the ability to add your own user or recipe photos using an image url from the web.  If a user enters the correct url, their image will display or alternatively if they leave it blank, a default 
image will appear.  However, if the user enters a broken link, then a broken link image will appear which doesn't look too perfect on the site.  Having looked into this on different forums, it appears that there isn't an easy solution to this
and a fix will need to be reviewed at a later date.

2)  Less of a bug but worth mentioning is the fact that when using a mongo database you cannot use the BSON ID to link collections and instead you have to have matching foreign keys built into each collection to link on instead.  This caused a few
issues for me when I was at the later stages of my project and prevented me from doing some of the joining that I would have liked (for example, if the recipes could indicate they had allergens that would be a plus).  However, due to 
the time it would take to rework a lot of my code I decided that any affected features should be built in at a later date.


## DEPLOYMENT:

My code has simply been deployed via heroku pages at the following link - https://flame-and-sizzle.herokuapp.com/

In order to do this I created a new app on the heroku site and linked to the app via the cloud9 terminal.  

I created a Procfile and requirements.txt file which I then pushed to heroku with the main files.  These tell heroku that this is a web application and what tools in needs to load for the app to run correctly.

On Heroku I have set the config vars to 0.0.0.0 for the IP address and 5000 for the PORT to enable the site to work.

Heroku will also need config vars for the database name (MONGO_DBNAME) and database uri (MONGO_URI) in order to access and save data.

All commits have been made to the same master git branch.  

There is also some code at the beginning of app.py that changes the debug mode back to false when running from heroku if a local env.py file cannot be found. Env.py is a file that has been added to .gitignore, so if it isn't there 
when the site is run, the app knows that it must be the live version of the site.


## CREDITS:

Content - 

All content on the site is original material I created.

Media - 

All photos are ones I have taken with friends at matches we have played in with
the exception of stadium.png which was taken by myself at a professional football 
match I attended.  The favicon image and shirt images were ones I created via 
ms paint.

## AREAS FOR IMPROVEMENT:

I have spent a lot of time and learned a huge amount while putting together this site.  In order to complete the course within the timescales I decided to draw a line under what I had already produced but I know there are
areas that could have been improved upon.  Here are a few areas that I know could be improved:

1) Testing - As indicated above, the automated testing for this site is somewhat limited but that is partly down to my lack of knowledge on how to test CRUD operations.  It is also down to my inexperience in writing some of 
the functions for the site, not too many functions actually return anything which feels pretty essential when thinking about automated tests.  This is something I will have to consider going into my final project.

2) DRY coding - I know there are some areas of my code that could have been much dryer in hindsight.  In particular, the code that creates the filters and sort methods within the recipes view in apps.py could have been compacted a lot.  Also,
createThisRecipeData within main.js repeats and the same result could have been achieved in a more consolidated way.  If I had more time then these would have been two areas that I would have refactored to get the same result but with 
better code.

Thank you for reviewing my website!  I hope you liked it as much as I did creating it!  :)