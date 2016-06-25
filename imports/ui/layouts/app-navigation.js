import './app-navigation.html';

Template.App_navigation.events({
    "click .sign-out": function(event, template){
        AccountsTemplates.logout();
    }
});
