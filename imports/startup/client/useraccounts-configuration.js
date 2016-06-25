import { Meteor } from 'meteor/meteor';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { analytics } from 'meteor/percolatestudio:segment.io';
import { FlowRouter } from 'meteor/kadira:flow-router';

function logoutCallback() {
  analytics.track('Logged out');
  FlowRouter.go('/sign-in');
}

function accountsSubmitHook(error, state) {
  if (!error) {
    analytics.alias(Meteor.userId());
    if (state === 'signIn') {
      // Successfully logged in
      analytics.track('Logged in');
    }
    if (state === 'signUp') {
      // Successfully registered
      analytics.track('Signed up');
    }
  }
}

AccountsTemplates.configure({
  texts: {
    errors: {
      accountsCreationDisabled: 'Client side accounts creation is disabled!',
      cannotRemoveService: 'Cannot remove the only active service!',
      captchaVerification: 'Captcha verification failed!',
      loginForbidden: 'error.accounts.Login forbidden',
      mustBeLoggedIn: 'error.accounts.Please log in for access.',
      pwdMismatch: 'error.pwdsDontMatch',
      validationErrors: 'Validation Errors',
      verifyEmailFirst: 'Please verify your email first. Check the email and follow the link!',
    },
  },
  defaultLayoutType: 'blaze',
  defaultTemplate: '',
  defaultLayout: 'App_body',
  defaultContentRegion: 'main',
  defaultLayoutRegions: {},
  showForgotPasswordLink: true,
  homeRoutePath: '/select-account', // TODO doublecheck
  onLogoutHook: logoutCallback,
  confirmPassword: false,
  onSubmitHook: accountsSubmitHook,
});

AccountsTemplates.addFields([
  {
    _id: 'firstName',
    type: 'text',
    displayName: 'First name',
    placeholder: 'Jane',
  },
  {
    _id: 'lastName',
    type: 'text',
    displayName: 'Last name',
    placeholder: 'Smith',
  },
]);
