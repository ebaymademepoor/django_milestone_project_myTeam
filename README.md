# Django myTeam Milestone Project

An app to help organise weekly football matches

[![Build Status](https://travis-ci.org/ebaymademepoor/django_milestone_project_myTeam.svg?branch=master)](https://travis-ci.org/ebaymademepoor/django_milestone_project_myTeam)




https://realpython.com/django-and-ajax-form-submissions/ = django ajax

Circletype for player names

Chart.js for radar chart

NOTE - Newly created super user must create a profile in django admin after being added via terminal or profile page will not display, a profile per user is required

Raised button - https://codepen.io/finnhvman/pen/MQyJxV


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

1)  To allow the user to add recipes and ingredients to the site
1)  To allow the user to review recipes based on their experience
2)  To allow the user to climb the leaderboard if they receive good reviews
3)  To allow users to view recipes and filter them based on their requirements

The website should also be responsive so that it works across all devices and media sizes.  It should be intuitive and easy for the user to use.

### USER STORIES:

To understand why people might choose to use this site and therefore provide direction on its creation, I created a number of user stories as follows...

Story 1:  As a foodie, I want to view many different recipes and try some that I like.

Story 2: As a cook, I want to share my recipes with other people.

Story 3:  As a cook, I want to get feedback on my recipes from other people.

Story 4:  As a student, I need inspiration on what easy / nice meals to eat!

The website should fit the stories of these potential users perfectly as it will contain all of the features that they desire
as part of the vanilla offering.  As well as being able to see recipes other users have added, there will be an opportunity for 
feedback and recognition via a reviews feature which will also help the user to filter the recipes and find the ones people like best
so that they can prioritise their cooking.

### WIREFRAMES:

I have chosen the name of Flame and Sizzle for the website as I feel it links beautifully to images of delicious food.  

The principle of adding recipes and ingredients to the website could mean that the usability of the site could become quite complicated, so it's important in the design phase that the operation of adding 
and editing recipes is kept as user friendly as possible.

My website will be divided into 12 pages.  The home page which will feature a welcome message and links to the main features of the site which are recipes, ingredients and the head chefs league table.  
There will be a sign up and login page as standard as well as a profile page for registered users.  An add and edit page will be incorporated for both recipes and ingredients, however recipes will have an addition view
page so that users get a clean view of each individual recipe and add reviews.

I have created some basic wireframes to show how these pages will be laid out in general.  Each page will have specially selected pictures of food to compliment the theme of the site. 

**Please see the Wireframes folder for the designs.**

## FEATURES

### EXISTING FEATURES:

#### PAGE 1 - HOME PAGE (index.html):

The home page has a welcome header followed by an introduction for the recipes, ingredients and leaderboard features of the site.  I have also added a quote which I liked around cooking to help inspire users and
wet their appetite!

At the bottom of the page there is a summary of the number of the recipes and their cusine types so that users can get a feel for what they might expect to find.

The nav-bar is fixed to the top of the screen to give the user easy access no matter where they are in the page, on mobile this changes to a standard drop down list so that the users view is never unintentionally obscured.
At the bottom of the page is a footer that just contains some example information linked to the website for demonstration purposes.

#### PAGES 2,3,4, - USER PAGES (log_in.html, signup.html & profile.html):

The user pages are an important feature of this website, allowing the user to register and thereby giving them the opportunity for their name to be shown on the leaderboard if they receive good recipe scores.  The login page has 
a nice animation that brings in the sign up form into view in two halves and the log in page has a fun gif that repeats.  Upon hover of the pages buttons, the background pictures zoom in to give some exciting visual feedback to the
user.

When signing up or signing in, the Python script completes a number of checks to ensure that the same user can't sign up twice, to make sure passwords match and to redirect the user in each situation.  

The profile page allows the user to update their details and add an image that will show up on any recipes that get added whenever viewed by another user.

#### PAGE 5 - RECIPES PAGE (recipes.html):

The recipes page begins with a nice sized and stylish background picture to welcome the user.  The user is then greeted with the option to add a recipe, but will be asked to sign up if they are not already a user before they can add.  This
option will stick to the top of the screen to allow for easy access being the most important feature of the site.  After all, if users don't add recipes then the site will lose any appeal!  

The next part of this page is the filter menu which will also stick under the add recipes box.  This gives the user a number of options to help them browse the site...

1)  They can choose to view 3, 6 or 9 recipes at any one time in case they want to fine tune what they see.  
2)  They can filter by a specific cuisine type, or even by any recipes that they have personally added.
3)  They can sort the filtered recipes by ones that have been added most recently, by alphabetical order and by user ratings.

This gives the user plenty of choice to find what they're looking for and to be able to access their own creations quickly and easily.

Any recipes added to the site will display in a 'recipe card' style box underneath the filter options.  Upon hover, each recipes description will change colour and the pointer will change to a hand to signify that it is clickable.
Any ratings provided will be averaged and display in the description too.  If a recipe belongs to the user that is logged in, 2 additional boxes will appear to allow the user to edit or delete their recipe.  If the user chooses to delete,
a dropdown box will appear above the recipe card asking the user to confirm to avoid any mishaps!

Below the displayed recipes are buttons for previous and next which will allow the user to move through the pages.

#### PAGE 6 - ADD A RECIPE (add_recipe.html):

To make the site as user friendly as possible, a recipe is added in two stages.  This page is stage 1 in the process where the user will enter some basic details to create the record in the database.  They simply enter a recipe name and
select a cuisine type from the list.  They have the option to add an image address (as in this project there is no facility to upload images) and there is a button containing a question mark which will provide some instructions in a 
floating box when hovered.  If the user is unable to add an image address and leaves the input box blank, a default picture will be applied.

The user can then either select to cancel via the 'go back' button, or click the 'submit' button which will create the recipe in the database.

#### PAGE 7 - EDIT A RECIPE (edit_recipe.html):

This page allows the user to edit the original details they supplied as part of add a recipe (section 1 - recipe info), but it also allows them to add an instruction or ingredient to the recipe one at a time.

The page is used in two instances, firstly whenever a new recipe is created the user will be taken to this page to add additional details.  However the same page is also loaded if the user clicks edit on the recipes list page.

The page loads with a picture and title of the recipe taken from the record in the database collection.  If there is no picture then a default picture is applied.

Section 1 - recipe info, contains the same details as the add a recipe page.

Section 2 - recipe instructions, contains any existing instructions that are found in the recipe.  Each is loaded with a red minus icon next to the instruction which can be used to delete that particular instruction.  Under the existing
instructions is an add instructions box, allowing the user to enter a step number and instruction to the above list via the green plus icon.

Section 3 - recipe ingredients, here there is a box containing any existing ingredients that have been added to the recipe along with their quantity and any picture associated to the item (or a default picture if omitted).  Again, this 
can each be removed individually via the red minus icon.  Underneath is a select box which pulls through any ingredient listed on the site.  Once an ingredient is selected, the user can add a quantity and then push the details to the 
list via the green plus icon.

Below the dropdown list is a button which will take the user to a page where they can add an ingredient to the site if it is not already in the list.  Once added, the user will be brought back to the edit recipe page to continue building
their recipe.

#### PAGE 8 - VIEW A RECIPE (view_recipe.html):

This page contains immutable details of the recipe for anyone to view.  The top of the page contains a picture and title for the recipe, followed by a box that contains the user who posted the recipe, the category for the type of cuisine and
the current user rating.

Next follows the instructions and ingredients (a please wait message displays while these load).  The user then has a button to go back to the recipes page.

If the user is logged in and not viewing one of their own recipes, providing they have not already supplied a review of the same recipe, they will see a reviews box which allows them to make a short comment on the recipe and give it a score out 
of 5.  Other reviews are then posted below with the most recent comments nearest the top of the list.

#### PAGE 9 - INGREDIENTS PAGE (ingredients.html):

This page displays all of the ingredients that have been added to the site an has a similar layout to the recipes list page.  

There is a large picture at the top of the page and a sticky box that asks the user to add any ingredients they wish to see in their recipes if they are not already on the list.

Any existing ingredient is then displayed with a picture, a title and where or not it is marked as allergen free.  There is also an edit icon which changes colour when hovered.

#### PAGES 10 & 11 - ADD AN INGREDIENT / EDIT AN INGREDIENT (add_ingredient.html / edit_ingredient.html)

Any user can add an ingredient to help the community build their recipes.  Here, they simply add a name of the ingredient, an image address (again optional) and they can tick to advise if the ingredient contains allergens.

Edit ingredient is exactly the same page, however the user cannot edit the ingredient name as this could potentially lead to issues with other users recipes if the name suddenly changes from one ingredient to another!  Instead, only allergen
information and the ingredient image can be amended.

#### PAGE 12 - HEAD CHEF LEADERBOARD (head_chefs.html)

This is a simple page that looks for the 10 users with the best average review score across all uploaded recipes.  A table displays the top 10, highlighting the top 3 users.

### FUTURE FEATURES:

#### Email updates
One new feature could be the addition of email updates to inform users when new recipes have been added to attract them back to the site.  

#### Enhanced recipe details
In this version of the site the is no allergen information on each individual recipe.  An enhancement could be to build this in so that they user can see the information by recipe rather than by ingredient.

#### Recipes of the month
A page containing the best rated recipes uploaded in the previous month might be a good feature, helping a user keep track of any recent and well received recipes they have yet to try.

## TECHNOLOGIES USED:

#### 1:  NAME - JQuery

LINK - https://jquery.com/

REASON - Jquery has been used as it provides some very useful methods when working with javascript and these have often been utilised in my javascript code.

#### 2: NAME - Google Fonts

LINK - https://fonts.google.com/

REASON - Used to style the two types of fonts incorporated into the style of the site.

#### 3: NAME - Font Awesome

LINK - https://fontawesome.com/

REASON - Font awesome has been used to incorporate its icons onto the site as it has multiple options to ensure that the icon used is relevant to the content it is being used for, in this case they are mainly used
in the nav-bar against each navigation option.

#### 4: NAME - SASS

LINK - https://sass-lang.com/

REASON - Sass has really helped me to organise my css code and has some really useful features such as the way it handles media queries which makes this part of styling much less painful.  It also helps the site to load 
faster through the use of placeholders which are only used when called upon.

#### 4: NAME - FLASK

LINK - http://flask.pocoo.org/

REASON - Flask is a microframework that has many useful tools and has been used primarily to create the routing for this website.  Tools such as sessions have also been essential, making it possible for multiple users
to use the website at once by storing key variables client side.  

#### 5: NAME - JINJA2

LINK - http://jinja.pocoo.org/

REASON - Jinja2 is a full featured template engine for Python.  It has enabled data to be passed from Python to the html templates and also allows logic to be used inside of the template to assist in DRY coding.

#### 6: NAME - MONGODB / PYMONGO & MLABS

REASON - I chose to use a mongodb database because I liked the modern syntax used to perform CRUD functionality.  PYMONGO is a program that helps Python speak to the mongo database and mlabs is a great platform that allows 
you to set up, view and amend your data via the browser.

## WEBSITE WORKINGS:

### APP.PY

The workings of the website have been broken down various sections in the app.py file and each of the more complex functions have been annotated to help other developers understand how they work.  However, 
here is a quick breakdown of each of the sections and their purpose:

1) USER MANAGEMENT FUNCTIONS

Any user, registered or unregistered can use this website but only registered users can add or review a recipe.  These functions are all based around user management.  Throughout these functions, user data is 
written to the mlabs database via the respective view and some of this data is passed client side into the session['user'] variable for the site to identify when a user is active.  

There is a function to add a new user using the created 'user' class, a function to update a users details and a function to validate a users password and behave accordingly dependant on the outcome.

2) DATABASE HELPER FUNCTIONS

There are a few functions that follow that help manage data that is going into and coming out of the database.  

The recipe already exists function will ensure that an author cannot enter a recipe with the same name twice to avoid any recipe duplication or issues with what data is pulled on each occasion.  The review is present function checks
to see if a user has already added a review so that they cannot add multiple reviews to one recipe.  The website recipe data function will pull a summary of the recipes that currently sit in the database.

3) VIEWs

The views within the final section are written to perform the CRUD functions that exist within the site and use the standard Mongodb CRUD operations code to update the database in various ways.  Some aggregation is used to 
ensure that the data being requested is narrowed down to the exact data required when performing these operations.

In addition to the CRUD operations, the recipes view contains code that allows the recipes page to be filtered by the user.  This works by taking a number of parameters and arguments from the user and storing them in the user session 
if they are provided to then filter which recipes the user sees.

### MAIN.JS

The javascript file also provides a number of functions that have been built in to give the user the best possible experience when adding and editing recipes in particular.  By using ajax within the js code, I have been able to both call and
pass data in real time to the mongo database via ajax promises so that the user does not have to constantly refresh the page when building or editing their recipe.  Here is a quick rundown of some of the more complex functions:

1) loadData()

There are three main collections within the database when it comes to the recipes, these are the recipes themselves, the ingredients and the recipe reviews.  Load data fetches this information via the promise so that is available to manipulate
on the page.  If there are any issues in retrieving the data the user is alerted via a message box and asked to try again later.

2) createThisRecipeData()

This function takes the data received from loadData and processes it to ensure that the users sees the correct recipe information on the page.  This works on view_recipe.html and edit_recipe.html so that the user can update the recipe, 
the ingredients or the reviews in real time without having to refresh the page.  HTML is added to the page based on the information within the database and additional icon buttons are added if the user is editing the recipe.  These icons link to
other helper functions in the form of ajax calls which update the database in real time based on the information passed through the function.  This all helps create a fluid user experience and removes any frustration associated to having to 
wait while a page refreshes!

## WEBSITE TESTING:

#### UX

The website has been designed to meet the needs of the users described in the user stories section.  Here is a brief run down of how each has been met - 

Story 1:  As a foodie, I want to view many different recipes and try some that I like.

REFLECTION - There are a few test recipes on the site that might reflect what a user would add.  Providing the website took off and built a small following, I would be very confident that this purpose would be fulfilled.

Story 2: As a cook, I want to share my recipes with other people.

REFLECTION - The process of adding and updating recipes has been streamlined to make it very easy for a user to share their dishes.  I have no doubt that this user is well looked after!

Story 3:  As a cook, I want to get feedback on my recipes from other people.

REFLECTION - The reviews feature is simple yet effective and carries across a number of pages where the scores can be seen in plain sight.  Mission accomplished.

Story 4:  As a student, I need inspiration on what easy / nice meals to eat!

REFLECTION - I'm sure my site would be of particular interest to students.  Hopefully the database of recipes will continue to build and give our users many more choices!

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
1)  The sites home page features a quote from Austrian Chef, Wolfgang Puck.  This is credited on the site as part of the quote.

Media - 

All static pictures used have been taken from https://unsplash.com/ - a license free media sharing website:

1) File Name - grilled-salmon-cubes-with-vegitables.jpg  Source - https://www.foodiesfeed.com/free-food-photo/grilled-salmon-cubes-with-vegetables/download/
2) File Name - poached-eggs-beans-and-bacon.jpg  Source - https://www.foodiesfeed.com/free-food-photo/eating-high-protein-brunch-with-poached-eggs-beans-and-bacon-2/download/
3) File Name - brooke-lark-158019-unsplash.jpg Source - https://unsplash.com/search/photos/food
4) File Name - rustic-vegan-756636-unsplash.jpg Source - https://unsplash.com/search/photos/food
5) File Name - elli-o-65548-unsplash.jpg Source - https://unsplash.com/photos/-YHSwy6uqvk
6) File Name - ali-yahya-270126-unsplash.jpg Source - https://unsplash.com/search/photos/chef
7) File Name - simple-322427-unsplash.jpg Source - https://unsplash.com/search/photos/chef
8) File Name - shane-rounce-405329-unsplash.jpg Source - https://unsplash.com/search/photos/food
9) File Name - bobby-rodriguezz-1052701-unsplash.jpg Source - https://unsplash.com/search/photos/food
10) File Name - valeriy-evtushenko-1077286-unsplash.jpg Source - https://unsplash.com/search/photos/food-ingredients
11) File Name - fancycrave-458022-unsplash.jpg Source - https://unsplash.com/search/photos/food-ingredients
12) File Name - adils-photography-419432-unsplash.jpg Source - https://unsplash.com/search/photos/ingredients-recipe
13) File Name - angela-pham-472148-unsplash.jpg Source - https://unsplash.com/search/photos/food-meat
14) File Name - benjamin-faust-19712-unsplash.jpg Source -  https://unsplash.com/search/photos/food-meat-black-and-white
15) File Name - nick-karvounis-624439-unsplash - Photo by Nick Karvounis on Unsplash
16) File Name - static/images/rawpixel-600789-wall.jpg Source - https://unsplash.com/photos/VGSnjOVNj4w

These pictures were then compressed using optimizilla - https://imagecompressor.com/

## AREAS FOR IMPROVEMENT:

I have spent a lot of time and learned a huge amount while putting together this site.  In order to complete the course within the timescales I decided to draw a line under what I had already produced but I know there are
areas that could have been improved upon.  Here are a few areas that I know could be improved:

1) Testing - As indicated above, the automated testing for this site is somewhat limited but that is partly down to my lack of knowledge on how to test CRUD operations.  It is also down to my inexperience in writing some of 
the functions for the site, not too many functions actually return anything which feels pretty essential when thinking about automated tests.  This is something I will have to consider going into my final project.

2) DRY coding - I know there are some areas of my code that could have been much dryer in hindsight.  In particular, the code that creates the filters and sort methods within the recipes view in apps.py could have been compacted a lot.  Also,
createThisRecipeData within main.js repeats and the same result could have been achieved in a more consolidated way.  If I had more time then these would have been two areas that I would have refactored to get the same result but with 
better code.

Thank you for reviewing my website!  I hope you liked it as much as I did creating it!  :)