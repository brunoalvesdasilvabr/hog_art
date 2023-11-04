export interface UserWithoutConfirmationStatusInterface {
  Session: string;
  challengeParam: {
    requiredAttributes: string[];
    userAttributes: {
      'custom:role': string;
      email: string;
      email_verified: string;
      phone_number_verified: string;
      preferred_username: string;
    };
  };
  username: string;
}

export interface UserInterface {
  Session: string;
  attributes: {
    'custom:role': string;
    email: string;
    email_verified: string;
    phone_number_verified: string;
    preferred_username: string;
    sub: string;
  };
  username: string;
}
