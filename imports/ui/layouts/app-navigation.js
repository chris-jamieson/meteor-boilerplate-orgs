import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import './app-navigation.html';
import './navbar/navbar-organisation.js';
import './navbar/navbar-user.js';
import './navbar/navbar-admin.js';

Template.App_navigation.events({
  'click .sign-out'(event, template) {
    AccountsTemplates.logout();
  },
});
