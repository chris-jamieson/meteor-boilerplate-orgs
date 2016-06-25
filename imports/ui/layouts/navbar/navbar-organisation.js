import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Organisations } from '../../../api/organisations/organisations.js';

import './navbar-organisation.html';

Template.Navbar_organisation.onCreated(function navbarOrganisationOnCreated() {
  const instance = this;

  const organisationId = FlowRouter.getParam('organisationId');

  instance.autorun(() => {
    instance.subscribe('myOrganisations');
  });

  instance.organisation = function organisation() {
    return Organisations.findOne({ _id: organisationId });
  };
});


Template.Navbar_organisation.helpers({
  organisation() {
    const organisationId = FlowRouter.getParam('organisationId');
    return Organisations.findOne({ _id: organisationId });
  },
});
