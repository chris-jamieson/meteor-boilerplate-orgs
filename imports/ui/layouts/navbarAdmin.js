Template.navbarAdmin.events({
    "click .open-impersonate-modal": function(event, template){
        event.preventDefault();

        Modal.show('adminImpersonateUsersModal');
    }
});
