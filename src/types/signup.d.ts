// types/signupTypes.ts
export interface InitialSignUpForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	country: string;
	phoneNumber: string;
	captcha: string;
}

export interface SignUpFormData extends InitialSignUpForm {
	captchaToken: string;
}
