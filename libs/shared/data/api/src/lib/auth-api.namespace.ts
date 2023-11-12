export namespace AuthApi {
  export interface SignUpDto {
    username: string;
    fullName: string;
    email: string;
    dob: Date;
    /**
     * About regex
     * At least 1 upper case letter
     * At least 1 lower case letter
     * At least 1 number or special character
     */
    password: string;
  }

  export interface SignInDto {
    username: string;
    email?: string;
    isLongSession?: boolean;

    /**
     * About regex
     * At least 1 upper case letter
     * At least 1 lower case letter
     * At least 1 number or special character
     */
    password: string;
  }

  export interface SignInResponseDto {
    username: string;
  }

  export interface UsernameExistsDto {
    isUsernameAvailable: boolean;
    username: string;
  }
}
