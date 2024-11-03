export interface UserProps {
  username?: string;
  email?: string;
  password?: string;
}

export interface ErrorProps {
  username?: string;
  usernameInvalid?: boolean;
  email?: string;
  emailInvalid?: boolean;
  password?: string[];
  passwordInvalid?: boolean;
}

export interface ReadmeModalProps {
  showModal: boolean;
  content: string;
  handleOnClose: () => void;
}

export interface UserAuthProps extends UserProps {
  accessToken?: string;
  refreshToken?: string;
}

export interface RefreshedTokenProps {
  accessToken?: string;
  isExpired?: boolean;
  sessionExpiredMsg?: string;
}
