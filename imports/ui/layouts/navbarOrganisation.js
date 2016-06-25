Template.navbarOrganisation.onCreated(function() {
    var instance = this;

    var organisationId = FlowRouter.getParam('organisationId');

    instance.autorun(function() {
        instance.subscribe('myOrganisations');
    });

    instance.organisation = function() {
        return Organisations.findOne({ _id: organisationId });
    };
});


Template.navbarOrganisation.helpers({
    organisation: function(){
        var organisationId = FlowRouter.getParam('organisationId');
        return Organisations.findOne({ _id: organisationId });
    }
});
