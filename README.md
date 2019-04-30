[![Build Status](https://travis-ci.org/ebaymademepoor/django_milestone_project_myTeam.svg?branch=master)](https://travis-ci.org/ebaymademepoor/django_milestone_project_myTeam)

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

The wireframes (found in the wireframes_and_design_notes folder) provide a good early 
indication of how I wanted the site to look and feel.  The final site has stayed very 
close to this original design but has been modified to try and make it more user 
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
brand colours, which includes the images which have been monotoned to each section
colour using https://manytools.org/image/colorize-filter/

Each section contains a brief description of the features of the site followed
by a responsive get started link button.

There is also a user video that gives any new user a glance of what the site can do
before registering.

A footer resides at the bottom of the page containing links to the about us, get
in touch, and donate pages.

#### PAGES 2 & 3 - ABOUT US & GET STARTED PAGES (located in root templates folder)

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
Each user will get a full license for 30 days upon registration.  Once this expires 
they will no longer be able to view their or any of their peers form section unless 
they renew their license.  This is the only feature currently affected by the license
so a user can still use the site perfectly well even without a license.

Next is the user playing positions section.  The user can click each of the attack, 
midfield, defence and goalkeeper positions on the pitch to select their playing
preferences between preferred, can play and can't play.  This will then be stored 
in the database and taken into consideration when teams are selected via team 
generation.

The user attributes section will show the user how their attributes have been 
rated on average by their peers in the areas of goalkeeping, passing, defending, finishing 
and movement, the latter four of which aggregate to their overall outfield score.
The section also shows how many users have voted them and displays a chart.js 
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

Groups can be created by a user or a user can join an existing group.
The group links to both users and matches and is the hub of the entire site,
using information from all other apps.

Initially the user can click the create a group button and start a brand new group,
or join an existng one as long as they have the group id and password.  Either 
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

Next is the matches section which shows any matches that have been organised.  Up to
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
will detect that no existng data is available and that this is a new match booking.
Therefore a form will be provided where the user can populate all of the relevant details 
to create the match.  Once created the user is redirected to group home where the 
match will now appear in the matches row.

2)  Available match data (pre-match) - If a player clicks on an existing match on the group home
page and the date and time of the match have not passed, this page will load with 
the details of this match in the first section.

Underneath an edit match button is displayed, on click a section will open the same
as if the match was to be created but prepopulated with the current data.  The user
can update these details as they see fit and submit for the match to be updated.

There are two buttons also available.  The first email reminders button will send
an email to all of the players within the group that are yet to confirm their availability
for the match.  The email has a link that, providing the user is logged in on their device,
will take them straight to the match page in question. An email can only be sent twice per 
match so that the rest of the users aren't bombarded with request emails.

The generate teams button will take the player to the team generation page.

The final section entitled player availability, lists each group member and their 
current availability for that game.  The logged in user appears at the top of the list.
If they have not yet confirmed their availability, their button will be grey and
titled with 'available?'', upon clicking this but it will change to 'available' and
then 'unavailable' respectively.

Each of the other group members are listed below with an icon that reflects their 
current availability dependant on their input.

2)  Available match data (post-match) - Once the date and time of the match has past,
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
option.  This could be useful if there are too many players available for example.

The final two options allow a user to select what team or position they would like to 
allocate a player to if they have specific preferences.  So if one player can only ever play
in one position, or if there are two players you always want to separate, it can be
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

Here each of the players that are saved in the teams (excluding the current user),
will appear on the screen with the option to choose where the player performed
good, average or poor.

Once a selection has been made for each player, if the user submits their ratings they
will be saved to the database, and an average of everybody's ratings for each 
player will appear in the form section of the profile pages.

#### PAGE 12 & 13 - SUBSCRIPTION & DONATE PAGES (checkout.html - located in subscriptions/templates)

The donate & subscription pages use stripe to accept credit card payments from the 
user should they wish to donate to the enhancement of the website or extend their
full license.

Any donations create a record in the database via the subscriptions app so it is 
clear which user donated, when the donation was made and the value.  The same occurs 
when a user subscribes but their license date also gets updated so that they can 
view form data once more.

The donation page can be accessed via the footer, where as the link to the subscriptions
page only appears when a users license has expired within the player form section
of the profile pages.

#### Misc

1) Each page has a loading screen that covers the template for a few seconds while 
loading built into base.html.  This just helps for the images to load fully before 
the users see the content.  It is not fool proof and there are other ways this could 
be implemented, but the setTimeout function that removes the screen is the last 
piece of code that runs when loading the page so would hopefully have a fairly 
high success rate in most cases.

2) A message box has also been built into base.html which hides off screen to the
right of the template.  This will appear if any messages are pushed via the backend 
and if called via javascript as and when required.  These are used to provide 
feedback to the user when necessary.

3) Password pages - These are held in the root templates/registration folder and
follow the standard method for resetting passwords using the django framework.

### FUTURE FEATURES:

#### Admin users
Currently any member of a group can email reminders, generate and save teams,
view the current password for each group etc.  I plan to introduce admin users 
(initially the group creator), who can allocate other admin users.  These users 
would then be more in control of some of the features for their groups.

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

REASON - Circle type is a js library that can curve words contained within the
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

#### 9: NAME - Amazon Web Services 

I am using an AWS S3 bucket to store all static and user generated media files.

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
some views receive data via a javascript ajax POST function to ensure that the 
user gets the best possible experience when using the site and to ensure that
unnecessary page refreshes are kept to a minimum and do not interrupt their experience.

There is often quite a lot of data passed into the templates which can sometimes
require a moderate amount of template logic to ensure the right data is shown and 
in the intended fashion.  Some of this might have been better served in the 
backend and this is something for me to consider going forward.

### MAIN.JS

There are many simplistic helper functions held within the main js file but there 
are also a few more substantial ones that require further explanation.  Here is 
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
in the most even way possible (with an element of random behaviour that allows the 
teams to be regenerated with a different result, even though the same criteria
maybe reused). Finally, the created teams are then appended to the relevant places 
on template within the pitch to show the user the resulting teams.

The overall process works really well but could be improved upon to take into 
account more factors such as fairer uneven teams.

2)  AJAX FUNCTIONS - preparePostData(type, data) & postToDatabase(url, data, route)

There are a number if instances where I wanted the user to be able to make a choice
that saved information to the database without them being interrputed by having to reload 
the page (such as playing position preferences and match availability).  Therefore 
I created these two functions to enable me to do this in the best way possible.

preparePostData() gets data ready and in the correct format with the required 
accompanying information to make sure it is posted to the database correctly. Once 
it has been used to successfully manage the data and the route information, it is then
passed to the postToDatabase() function for processing.  The relevant django view 
will then handle the data and once information is passed back from the backend,
this function will handle feedback to the user or the required subsequent actions 
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
and get fellow users to confirm their availability, so this is a definite pass!

Story 2: As a footballer, I'd like to know what my fellow peers think of my skills
and performance to help guide me where I need to improve

REFLECTION - Both attributes and performance can be rated for each player and 
viewed via the profile screens, this use will be very happy I'm sure!

Story 3:  As a regular football player, I want to remove the hassle of having to pick 
even teams for each game and want to reduce the time lost at the start of each match
selecting teams

REFLECTION - The team generation feature has this need covered and provides
plenty of options for the user to tweak their team selections as desired.

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

**Test 2** - On home page, clicked get started, redirected accordingly - SUCCESS

**Test 3** - On home page, clicked get started btn, redirected accordingly - SUCCESS

**Test 4** - On footer, clicked about us btn, redirected accordingly - SUCCESS

**Test 5** - On footer, clicked get in touch btn, redirected accordingly - SUCCESS

**Test 6** - On footer, clicked get donate btn while logged in, redirected accordingly - SUCCESS

**Test 7** - On get started page, clicked sign in, form appeared and could log in - SUCCESS

**Test 8** - On get started page, clicked sign in and forgot password text, redirected accordingly - SUCCESS

**Test 9** - On get started page, clicked sign up, form appeared and could register - SUCCESS

**Test 10** - On profile page, clicked choose from btn, selected photo and update btn, picture displays instead of shirt - SUCCESS

**Test 11** - On profile page, clicked each data btn to update personal details, details updated and confirmation message displays - SUCCESS

**Test 12** - On profile page, clicked each playing position, details updated and confirmation message displays - SUCCESS

**Test 13** - On profile page, when a players license is out of date, I can click a renew btn to redirect to checkout page and pay for an extension - SUCCESS

**Test 14** - On group-select page, clicked create new group btn, form displays and creates group - SUCCESS

**Test 15** - On group-select page, clicked join group btn, form displays and player joins group - SUCCESS

**Test 16** - On group-select page, any groups joined display in groups section with relevant details - SUCCESS

**Test 17** - On group-home page, clicking show password button displays then hides the password - SUCCESS

**Test 18** - On group-home page, clicking plus btn in matches section takes you to create a match page - SUCCESS

**Test 19** - On group-home page, clicking on a created match takes you to match page - SUCCESS

**Test 20** - On group-home page, clicking on another users shirt takes you to their profile page - SUCCESS

**Test 21** - On player profile page, I can update that users attributes and see their form - SUCCESS

**Test 22** - On matches page, I can click to update my availability between available and unavailable - SUCCESS

**Test 23** - On matches page, I can click email reminders btn to send an email - SUCCESS

**Test 24** - On matches page, I can click edit match which reveals the existing match details that I can update - SUCCESS

**Test 25** - On matches page, I can click generate teams btn to be redirected to team gen page - SUCCESS

**Test 26** - On team gen page, I can generate a team by selecting relevant parameters and clicking pick teams btn - SUCCESS

**Test 27** - On team gen page, I can generate save a team by clicking the save btn and view it using the saved teams btn - SUCCESS

**Test 28** - On matches page, when a game is completed and a team was saved, I can click the rate players btn to be redirected accordingly - SUCCESS

**Test 29** - On rate players page, I can rate each player and submit my ratings which save - SUCCESS

These tests have also been performed in different orders to ensure the result 
and the way the game is displayed is always as intended and no errors have been 
found.  My football group has also tested the entire app over a number of weeks
and any issues identified have been addressed.

#### DEVICES

Using Google Chromes toggle device toolbar, I have extensively viewed the page 
on each of the following devices to ensure that the website looks as it was intended 
at each media size.  I have also tested the website on some live devices via the 
published heroku link.  The following table signifies which tests have been carried 
out on each device and the status of each based on how the site looks visually:

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
|iPhone 5            |Virtual(chrome)                 |about_us.html            |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |about_us.html            |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |about_us.html            |Renders as intended
|iPhone X            |Virtual(chrome)                 |about_us.html            |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |about_us.html            |Renders as intended
|Galaxy S9           |Actual device                   |about_us.html            |Renders as intended
|Pixel 2             |Virtual(chrome)                 |about_us.html            |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |about_us.html            |Renders as intended
|iPhone X            |Virtual(chrome)                 |about_us.html            |Renders as intended
|iPad                |Actual device                   |about_us.html            |Renders as intended
|iPad Pro            |Virtual(chrome)                 |about_us.html            |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |about_us.html            |Renders as intended
|Desktop (24 inch)   |Actual device                   |about_us.html            |Renders as intended
|iPhone 5            |Virtual(chrome)                 |contact_us.html          |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |contact_us.html          |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |contact_us.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |contact_us.html          |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |contact_us.html          |Renders as intended
|Galaxy S9           |Actual device                   |contact_us.html          |Renders as intended
|Pixel 2             |Virtual(chrome)                 |contact_us.html          |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |contact_us.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |contact_us.html          |Renders as intended
|iPad                |Actual device                   |contact_us.html          |Renders as intended
|iPad Pro            |Virtual(chrome)                 |contact_us.html          |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |contact_us.html          |Renders as intended
|Desktop (24 inch)   |Actual device                   |contact_us.html          |Renders as intended
|iPhone 5            |Virtual(chrome)                 |get_started.html         |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |get_started.html         |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |get_started.html         |Renders as intended
|iPhone X            |Virtual(chrome)                 |get_started.html         |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |get_started.html         |Renders as intended
|Galaxy S9           |Actual device                   |get_started.html         |Renders as intended
|Pixel 2             |Virtual(chrome)                 |get_started.html         |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |get_started.html         |Renders as intended
|iPhone X            |Virtual(chrome)                 |get_started.html         |Renders as intended
|iPad                |Actual device                   |get_started.html         |Renders as intended
|iPad Pro            |Virtual(chrome)                 |get_started.html         |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |get_started.html         |Renders as intended
|Desktop (24 inch)   |Actual device                   |get_started.html         |Renders as intended
|iPhone 5            |Virtual(chrome)                 |group-select.html        |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |group-select.html        |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |group-select.html        |Renders as intended
|iPhone X            |Virtual(chrome)                 |group-select.html        |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |group-select.html        |Renders as intended
|Galaxy S9           |Actual device                   |group-select.html        |Renders as intended
|Pixel 2             |Virtual(chrome)                 |group-select.html        |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |group-select.html        |Renders as intended
|iPhone X            |Virtual(chrome)                 |group-select.html        |Renders as intended
|iPad                |Actual device                   |group-select.html        |Renders as intended
|iPad Pro            |Virtual(chrome)                 |group-select.html        |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |group-select.html        |Renders as intended
|Desktop (24 inch)   |Actual device                   |group-select.html        |Renders as intended
|iPhone 5            |Virtual(chrome)                 |group-home.html          |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |group-home.html          |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |group-home.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |group-home.html          |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |group-home.html          |Renders as intended
|Galaxy S9           |Actual device                   |group-home.html          |Renders as intended
|Pixel 2             |Virtual(chrome)                 |group-home.html          |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |group-home.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |group-home.html          |Renders as intended
|iPad                |Actual device                   |group-home.html          |Renders as intended
|iPad Pro            |Virtual(chrome)                 |group-home.html          |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |group-home.html          |Renders as intended
|Desktop (24 inch)   |Actual device                   |group-home.html          |Renders as intended
|iPhone 5            |Virtual(chrome)                 |match_page.html          |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |match_page.html          |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |match_page.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |match_page.html          |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |match_page.html          |Renders as intended
|Galaxy S9           |Actual device                   |match_page.html          |Renders as intended
|Pixel 2             |Virtual(chrome)                 |match_page.html          |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |match_page.html          |Renders as intended
|iPhone X            |Virtual(chrome)                 |match_page.html          |Renders as intended
|iPad                |Actual device                   |match_page.html          |Renders as intended
|iPad Pro            |Virtual(chrome)                 |match_page.html          |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |match_page.html          |Renders as intended
|Desktop (24 inch)   |Actual device                   |match_page.html          |Renders as intended
|iPhone 5            |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|iPhone X            |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|Galaxy S9           |Actual device                   |rate_performance.html    |Renders as intended
|Pixel 2             |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|iPhone X            |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|iPad                |Actual device                   |rate_performance.html    |Renders as intended
|iPad Pro            |Virtual(chrome)                 |rate_performance.html    |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |rate_performance.html    |Renders as intended
|Desktop (24 inch)   |Actual device                   |rate_performance.html    |Renders as intended
|iPhone 5            |Virtual(chrome)                 |player-profile.html      |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |player-profile.html      |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |player-profile.html      |Renders as intended
|iPhone X            |Virtual(chrome)                 |player-profile.html      |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |player-profile.html      |Renders as intended
|Galaxy S9           |Actual device                   |player-profile.html      |Renders as intended
|Pixel 2             |Virtual(chrome)                 |player-profile.html      |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |player-profile.html      |Renders as intended
|iPhone X            |Virtual(chrome)                 |player-profile.html      |Renders as intended
|iPad                |Actual device                   |player-profile.html      |Renders as intended
|iPad Pro            |Virtual(chrome)                 |player-profile.html      |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |player-profile.html      |Renders as intended
|Desktop (24 inch)   |Actual device                   |player-profile.html      |Renders as intended
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
|iPhone 5            |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|iPhone X            |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|Galaxy S9           |Actual device                   |gen_settings.html        |Renders as intended
|Pixel 2             |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|iPhone X            |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|iPad                |Actual device                   |gen_settings.html        |Renders as intended
|iPad Pro            |Virtual(chrome)                 |gen_settings.html        |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |gen_settings.html        |Renders as intended
|Desktop (24 inch)   |Actual device                   |gen_settings.html        |Renders as intended
|iPhone 5            |Virtual(chrome)                 |checkout.html            |Renders as intended
|iPhone 6/7/8        |Virtual(chrome)                 |checkout.html            |Renders as intended
|iPhone 6/7/8 Plus   |Virtual(chrome)                 |checkout.html            |Renders as intended
|iPhone X            |Virtual(chrome)                 |checkout.html            |Renders as intended
|Galaxy S5           |Virtual(chrome)                 |checkout.html            |Renders as intended
|Galaxy S9           |Actual device                   |checkout.html            |Renders as intended
|Pixel 2             |Virtual(chrome)                 |checkout.html            |Renders as intended
|Pixel 2 XL          |Virtual(chrome)                 |checkout.html            |Renders as intended
|iPhone X            |Virtual(chrome)                 |checkout.html            |Renders as intended
|iPad                |Actual device                   |checkout.html            |Renders as intended
|iPad Pro            |Virtual(chrome)                 |checkout.html            |Renders as intended
|Laptop (15.4 inch)  |Actual device                   |checkout.html            |Renders as intended
|Desktop (24 inch)   |Actual device                   |checkout.html            |Renders as intended

The wide range of devices tested showed no visual concerns and should prove a 
good platform to ensure that it displays well on all devices.

### AUTOMATED TESTING:

I have used a number of jasmine tests to check some of my more complex javascript
code is working and the django testing suite along with coverage to ensure my
django forms, views and models are working as expected.  Here is a brief run 
down of these...

1)  Django tests:

It took me some time to fully understand the tests I could complete using the django 
testing suite and spent much time testing both the accounts and groups apps.

I have managed to get both of these apps close to 100% tested but I had to do a lot
of research to get these to work, mainly due to the @login_decorator or logged in
status that the testing suite interprets while the tests are being run.  

I firmly believe that all of the group tests show that I have successfully 
understood the tests and overcome any issues I was having with some of the accounts
test that were throwing errors.  Due to lack of time I have been unable to go back
and fix these or create the same tests for the other apps, however I intend to do this
at a later date and have comprehensively tested the app in practice to ensure
the functions are behaving correctly.

2)  mainSpec.js test:

I have written 8 jasmine tests to try and ensure my team generation functions are 
behaving correctly.  Although these are again not conclusive as they only check a 
percentage of the functions being used here, it demonstrates my ability to undertake
these tests and each function has been practically tested extensively.  I plan
to also complete these tests at a later date to ensure that when I come to make 
changes to the logic, I have a testing suite I can fall back on to ensure they are
producing the expected results.

#### BUGS

1)  One of the biggest bugs I encountered on this project was to do with user photos
that could be saved and displayed via the profile.html page.

When using an existing photo on a mobile device or when taking a new photo, the 
orientation of the photo would almost always be incorrect, displaying upside 
down or on it's side.  After doing a lot of research I discovered this was a known 
issue and there were a few suggested fixes, however none of these were being 
implemented in the way I wanted the fix to be implemented.

Therefore in helpers.py, I created a helper function that is a combination
of fixes and actually killed two birds in one stone.  This is because, as users 
would be uploading their own images, I also needed a way to make sure the images 
were compressed to ensure they didn't take a long time to load and so that they 
didn't take up all of my AWS bucket storage space!

My function, optimise_image(photo, new_quality_value_max_100), is invoked on the 
uploaded file via the profile_and_stats view and can do a number of useful things 
before saving the users image.  Firstly, it will ensure that the correct 
orientation of the photo is implemented, and secondly, you can add an argument
to compress the photo to a percentage of its original size before it's saved.  I 
found that a compressing the image to 30% of its original size worked well,
this tends to maintain a quality suitable for web viewing and nicely reduces
the size and time the image takes to load.  

The function can also resize the image but I have disabled this option as I don't 
need it in this instance.

Caution - I have had a report that uploading a photo on a Mac appeared to cause
issues and will need further investigation.  However photos have and continue to
be uploaded successfully via windows pc, ipads and mobile phones.


## DEPLOYMENT:

My code has simply been deployed via heroku pages at the following link - https://my-team-utility.herokuapp.com/

In order to do this I created a new app on the heroku site and linked to the app via the cloud9 terminal.  

I created a Procfile and requirements.txt file which I then pushed to heroku with the main files.  
These tell heroku that this is a web application and what tools in needs to load for the app to run correctly.

All commits have been made to the same master git branch.  

A number of config vars are required as follows...

HOSTNAME - The web address of the site - django uses this as a security measure 
to ensure the page is authorised to be accessed

DATABASE_URL - This is the address of the production postgres database, mine is 
a heroku addon postgres database

AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY - As my static and media files are set up to 
be held in an S3 bucket, both of these are required.

DISABLE_COLLECTSTATIC - This should be set to 1 to prevent any static and media files
being uploaded to heroku on each git push as they are hosted on AWS

EMAIL_ADDRESS & EMAIL_PASSWORD - As emails are sent via the site, a gmail address
and password is required with less secure apps access

SECRET_KEY - This is the key that django uses to verify the site

STRIPE_PUBLISHABLE_KEY & STRIPE_SECRET_KEY - These are required by stripe for a
user to make payments via checkout.html

Other notes:

1) Newly created super users must create a profile in django admin after 
being added via terminal or profile page will not display, a profile per user is 
required...

Upon creating a user, the site will create a profile for that user via the 
UserProfileData model within the profile_and_stats app.  However, when initially 
creating a superuser for django, a profile will not be created.  Therefore, in order
for the site to work for a superuser, they must manually add a profile via the django 
admin page and link it to their account using the many to many field.  If this
is not completed, the superuser will not be able to access their profile page 
as the record will not be found.

2)  I have added version numbers to the css and js tags within base.html.  These
must be updated before every commit to ensure users get the most up to date 
styling and js logic files on their next visit.

In addition, I have added notes to a setting in settings.py to enable a developer
to refresh there css and js files without having to collect static on every occasion
to see any changes.  

If a developer wants to push their static and media files to AWS, they must run the
collectstatic command in the terminal with the following setting...

<!--# if development == False:    -->
STATICFILES_STORAGE = 'custom_storages.StaticStorage'

However, if you wish to refresh your development site without having to collectstatic,
the settings should be as follows...

if development == False:    
    STATICFILES_STORAGE = 'custom_storages.StaticStorage'
    
Collecting static with these settings will result in a folder being created in the 
root directory containing all of those files.  Should this happen, the stray folder 
can be deleted without consequence.
    

## CREDITS:

Content - 

All content on the site is original material I created.

Media - 

All photos are ones I have taken with friends at matches we have played in with
the exception of stadium.png which was taken by myself at a professional football 
match I attended.  The favicon image and shirt images were ones I created via 
ms paint.

## AREAS FOR IMPROVEMENT:

I have spent a lot of time and learned a huge amount while putting together this site.  
In order to complete the course within the timescales I decided to draw a line under what 
I had already produced but I know there are areas that could have been improved upon.  
Here are a few areas that I know could be improved:

1) Testing - As indicated above, the automated testing for this site is incomplete.
However, I do feel I have have demonstrated a lot of knowledge in these areas and 
feel very confident in automated testing, particularly using the django testing 
framework and the coverage tools.

2) Styling - A lot of work has gone into the features of this site but it still 
doesn't look as professional as I would like it too.  I could spend another 3 months 
on the styling of this project alone and probably will post project!



Thank you for reviewing my website!  I hope you liked it as much as I did creating 
it!  :)