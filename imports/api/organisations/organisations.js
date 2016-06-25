import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';

class OrganisationsCollection extends Mongo.Collection {}

export const Organisations = new OrganisationsCollection('Organisations');

Organisations.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    autoform: {
      placeholder: 'My Organisation',
    },
  },
  users: {
    label: 'Users',
    type: [Object],
    autoValue() {
      let users = false;
      if (this.isInsert) {
        users = [{
          id: Meteor.userId(),
          role: 'owner',
        }];
      }
      return users;
    },
  },
  'users.$.id': {
    label: 'User ID',
    type: String,
  },
  'users.$.role': {
    label: 'User role',
    type: String,
    allowedValues: ['owner', 'administrator'],
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue() {
      let returnValue = false;
      if (this.isInsert) {
        returnValue = new Date();
      } else if (this.isUpsert) {
        returnValue = {
          $setOnInsert: new Date(),
        };
      } else {
        this.unset();
      }
      return returnValue;
    },
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue() {
      let updatedAt = false;
      if (this.isUpdate) {
        updatedAt = new Date();
      }
      return updatedAt;
    },
    denyInsert: true,
    optional: true,
  },
  createdBy: {
    type: String,
    autoValue() {
      let createdBy = false;
      if (this.isInsert) {
        createdBy = Meteor.userId();
      }
      return createdBy;
    },
    denyUpdate: true,
  },
});

Organisations.allow({
  insert(userId) {
    let allowed = false;
    if (Roles.userIsInRole(userId, ['admin'])) {
      allowed = true;
    } else {
      if (Meteor.permissions.check(userId, 'createOrganisations')) {
        allowed = true;
      }
    }
    return allowed;
  },
  update(userId, doc) {
    let allowed = false;
    if (Roles.userIsInRole(userId, ['admin'])) {
      allowed = true;
    } else {
      if (Meteor.permissions.check(userId, 'updateOrganisations', { organisationId: doc._id })) {
        allowed = true;
      }
    }
    return allowed;
  },
  remove(userId, doc) {
    let allowed = false;
    if (Roles.userIsInRole(userId, ['admin'])) {
      allowed = true;
    } else {
      if (Meteor.permissions.check(userId, 'removeOrganisations', { organisationId: doc.organisationId })) {
        allowed = true;
      }
    }
    return allowed;
  },
});

Organisations.deny({
  update(fields) {
    // can't change createdBy
    return _.contains(fields, 'createdBy');
  },
});
