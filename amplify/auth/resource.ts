import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      mutable: false,
      required: true,
    },
    phoneNumber: {
      mutable: true,
      required: true
    },
    fullname: {
      mutable: true,
      required: true,
    },
  },
});