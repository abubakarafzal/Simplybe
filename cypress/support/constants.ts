// cypress/support/constants.ts

export const PageTextConstants = {
  emailValidationMsg: 'Oops! You need to type your email here',
  firstNameValidationMsg: 'We need your first name – it’s nicer that way',
  lastNameValidationMsg: 'Last name, too, please!',
  passwordValidationMsg: 'Hey, we need a password here',
  birthDayValidationMsg: 'Enter your full date of birth',
  birthMonthValidationMsg: 'Enter your full date of birth',
  birthYearValidationMsg: 'Enter your full date of birth',
  signInPasswordValidationMsg: 'Enter a valid password',
  dobValidationMsg: 'Enter a valid date of birth',
  invalidEmailFormatMsg: 'That doesn’t look like a valid email address – try again?',
  invalidFirstNameMsg: 'Enter a valid first name',
  invalidLastNameMsg: 'Enter a valid last name',
  emptyFirstNameMsg: 'Enter your first name',
  emptyLastNameMsg: 'Enter your last name',
  emptyDobMsg: 'Enter a complete date of birth',
  emptyPhoneNumberMsg: 'Enter a UK phone number',
  emptyEmailMsg: 'Enter your email address',
  emptyPasswordMsg: 'Your password must be between 8 and 128 characters long'
} as const;