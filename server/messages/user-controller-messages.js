export const MissingFieldsErrorMessage =
  "All fields are required. Please ensure that none of the fields are missing.";

export const DuplicateEmailErrorMessage =
  "An account with this email already exists. Please use a different email address.";

export const AccountCreatedSuccessMessage =
  "Your account has been successfully created.";

export const InternalServerErrorMessageDuringRegistration =
  "An internal server error occurred while processing your request. Please try again later.";

export const RegistrationErrorMessage = (error) =>
  `Error during user registration: ${error}`;

export const InvalidCredentialsErrorMessage =
  "Incorrect email or password. Please try again.";

export const LoginSuccessMessage = (username) => `Welcome back, ${username}!`;

export const InternalServerErrorMessageDuringLogin =
  "An internal server error occurred while processing your login request. Please try again later.";

export const LoginErrorMessage = (error) => `Error during login: ${error}`;

export const LogoutSuccessMessage = "You have been logged out successfully.";

export const InternalServerErrorMessageDuringLogout =
  "An internal server error occurred during the logout process. Please try again later.";

export const LogoutErrorMessage = (error) => `Error during logout: ${error}`;

export const ProfileFetchSuccessMessage = "User profile fetched successfully.";

export const UserNotFoundErrorMessage =
  "User not found. Please check the user ID and try again.";

export const InternalServerErrorMessageDuringProfileFetch =
  "An internal server error occurred while fetching the user profile. Please try again later.";

export const GetProfileErrorMessage = (error) =>
  `Error during profile fetch: ${error}`;
