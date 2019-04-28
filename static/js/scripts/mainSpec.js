describe("Test Correct Application of Jasmine", function() {

    describe("Initialise", function() {
        it("should return a pass to ensure that Jasmine has initialised properly (1 + 1 = 2)", function() {
            expect(onePlusOne()).toBe(2);
        });
    });
})

describe("Team generation testing suite", function() {
    
    /* These tests should be ran in order as there is a set order to them within
    the js file as there are linked through promises */
    
    
    let teamData = [
        {"users-name":"Awesom...","nickname":"Awesome Aaron",
        "full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6",
        "avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0",
        "def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC",
        "force-pick":"true","force-exclude":"false","force-team":"",
        "force-position":"GK"},
        
        {"users-name":"Bryan1979","full-username":"Bryan1979","avg_gk":"4.00",
        "avg_out":"5.56","avg_def":"5.5","avg_move":"4.5","avg_pass":"5.5",
        "avg_fin":"6.75","gk-pref":"1","def-pref":"1","mid-pref":"1",
        "att-pref":"2","available":"No","force-pick":"false",
        "force-exclude":"false","force-team":"","force-position":""},
        
        {"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo",
        "avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5",
        "avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2",
        "mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false",
        "force-exclude":"false","force-team":"","force-position":""},
        
        {"users-name":"Harty","nickname":"Harty","full-username":"chiefchris",
        "avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0",
        "avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0",
        "mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true",
        "force-exclude":"false","force-team":"","force-position":""},
        
        {"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00",
        "avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75",
        "avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1",
        "att-pref":"1","available":"TBC","force-pick":"true",
        "force-exclude":"false","force-team":"","force-position":""},
        
        {"users-name":"Ec","nickname":"Ec","full-username":"Ec43b",
        "avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4",
        "avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2",
        "mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true",
        "force-exclude":"false","force-team":"2","force-position":""}
    ]
    
    describe("Select players available to add to teams", function() {
        
        it("should return a list of players and their data in preperation for organising teams", function() {
            
            let expectedData = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075}]
                   
            // Above data has one player that should be excluded as no availability
            
            expect(playersToChooseTeamsFrom(teamData).length).toBe(teamData.length-1);
            
            // Players also should be returned with avg_tot calculation
            expect(playersToChooseTeamsFrom(teamData)).toEqual(expectedData);
            
        });
    });
    
    describe("Second stage of team selection", function() {
        
        it("Should attach player to a team number and allocate goalkeepers if specified", function() {
            
            let expectedData = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}]
            let stage1Data = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075}]
            
            expect(attachPlayerToForcedTeam(stage1Data).length).toBe(teamData.length-1);
            
            expect(attachPlayerToForcedTeam(stage1Data)).toEqual(expectedData);
            
        });
    });
    
    describe("Third stage of team selection", function() {
        
        it("Should ensure an error is called if more that 2 keepers are specified", function() {
            
            let expectedData = undefined;
            let stage2DataWithMultipleKeepers = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}]
            
            expect(moreThanOneKeeperCheck(stage2DataWithMultipleKeepers)).toBe(expectedData);
            
        });
        
        it("Should return unspoiled team data if number of keepers specified is less than 2", function() {
            
            let expectedData = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}];
            let stage2Data = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}];
            
            expect(moreThanOneKeeperCheck(stage2Data)).toEqual(expectedData);
            
        });
    });
    
    describe("Fourth stage of team selection", function() {
        
        it("Should create two arrays, one of players already assigned to a team and another with unallocated players", function() {
            
            let expectedAllocated = [[{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}]];
            let expectedUnallocated = [[{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001}]]; 
            let stage3Data = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001},{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}];
            
            
            // Check for allocted players...
            expect(separatePlayersByAllocatedUnallocated(stage3Data)[0]).toEqual(jasmine.objectContaining(expectedAllocated[0]));
            
            // // Check for unallocated players
            expect(separatePlayersByAllocatedUnallocated(stage3Data)[1]).toEqual(jasmine.arrayContaining(expectedUnallocated[0]));
            
        });
        
    });
    
    describe("Fifth stage of team selection", function() {
        
        it("Should produce a list of players and a summary of the team scores as they currently stand", function() {
            
            let expectedTeamData = [[{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}],[{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001}]];
            let expectedTeamScores = [{"team":1,"Score":0,"Players":0,"avg-score":0},{"team":2,"Score":6.15,"Players":1,"avg-score":6.15}];
            
            let Allocated = [{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}];
            let Unallocated = [{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001}];
            let stage4Data = [Allocated, Unallocated]
            
            console.log(expectedTeamData[1][0]);
            
            // Check for already alloacted players...
            expect(checkTeamScores(stage4Data)[0][0]).toEqual(expectedTeamData[0]);
            
            // Check for players to be alloacted players...
            expect(checkTeamScores(stage4Data)[0][1][0]).toEqual(jasmine.objectContaining(expectedTeamData[1][0]));
            
            // // Check for scores
            expect(checkTeamScores(stage4Data)[1]).toEqual(expectedTeamScores);
            
        });
        
    });
    
    describe("Sixth stage of team selection", function() {
        
        it("Should allocate any unassigned goalkeepers to a team and include user assigned players", function() {

            let teamData = [[{"users-name":"Ec","nickname":"Ec","full-username":"Ec43b","avg_gk":"4.00","avg_out":"6.15","avg_def":"6.0","avg_move":"6.4","avg_pass":"6.2","avg_fin":"6.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"2","force-position":"","avg_tot":5.075,"team":2}],[{"users-name":"Awesom...","nickname":"Awesome Aaron","full-username":"1","avg_gk":"4.00","avg_out":"6.35","avg_def":"7.6","avg_move":"6.8","avg_pass":"6.0","avg_fin":"5.0","gk-pref":"0","def-pref":"2","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"GK","avg_tot":5.175},{"users-name":"Carlo","nickname":"Carlo","full-username":"Carlo","avg_gk":"6.50","avg_out":"7.25","avg_def":"8.0","avg_move":"6.5","avg_pass":"7.5","avg_fin":"7.0","gk-pref":"1","def-pref":"2","mid-pref":"2","att-pref":"1","available":"Yes","force-pick":"false","force-exclude":"false","force-team":"","force-position":"","avg_tot":6.875},{"users-name":"Harty","nickname":"Harty","full-username":"chiefchris","avg_gk":"4.50","avg_out":"6.31","avg_def":"6.75","avg_move":"5.0","avg_pass":"7.25","avg_fin":"6.25","gk-pref":"0","def-pref":"0","mid-pref":"0","att-pref":"0","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.404999999999999},{"users-name":"davidd...","full-username":"davidd4158","avg_gk":"4.00","avg_out":"6.94","avg_def":"6.0","avg_move":"8.25","avg_pass":"5.75","avg_fin":"7.75","gk-pref":"0","def-pref":"0","mid-pref":"1","att-pref":"1","available":"TBC","force-pick":"true","force-exclude":"false","force-team":"","force-position":"","avg_tot":5.470000000000001}]];
            let teamScores = [{"team":1,"Score":0,"Players":0,"avg-score":0},{"team":2,"Score":6.15,"Players":1,"avg-score":6.15}];
            
            let allData = [teamData, teamScores];
            let totalPlayers = teamData[0].length + teamData[1].length;
            
            // Check if all players have been accounted for
            expect(allocateGoalkeepers(allData)[0].length).toBe(totalPlayers);
            
            // Check if teams are even or 1 player short / over when uneven teams (team 1)
            expect(allocateGoalkeepers(allData)[1][0].length).not.toBeGreaterThan((totalPlayers / 2) + 1);
            expect(allocateGoalkeepers(allData)[1][0].length).not.toBeLessThan((totalPlayers / 2) - 1);
            
            // Check if teams are even or 1 player short / over when uneven teams (team 2)
            expect(allocateGoalkeepers(allData)[1][1].length).not.toBeGreaterThan((totalPlayers / 2) + 1);
            expect(allocateGoalkeepers(allData)[1][1].length).not.toBeLessThan((totalPlayers / 2) - 1);
        });
        
    });
    
})