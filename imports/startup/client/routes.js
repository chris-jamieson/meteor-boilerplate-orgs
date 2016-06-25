import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/pages/app-home.js';

// the App_notFound template is used for unknown routes and missing documents
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

/**
 * Accounts templates
 */
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('enrollAccount');

/**
 * Public routes
 */

FlowRouter.route('/', {
  name: 'app.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/invitations/:invitationId/accept', {
  name: 'invitations.accept',
  action() {
    BlazeLayout.render('App_body', { main: 'invitationsAccept' });
  },
});

/**
 * Private routes
 */

const privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [
    AccountsTemplates.ensureSignedIn,
  ],
});

privateRoutes.route('/organisations', {
  name: 'organisation.select',
  action() {
    BlazeLayout.render('App_body', { main: 'organisationSelect' });
  },
});

/**
 * Organisation routes
 */

const organisationRoutes = privateRoutes.group({
  prefix: '/o/:organisationId',
  name: 'organisation',
});

organisationRoutes.route('/settings', {
  name: 'organisation.settings',
  action() {
    BlazeLayout.render('App_body', { main: 'organisationSettings' });
  },
});
