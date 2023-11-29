import { SignUpFormData } from '@/types/signup';
import myfetch from './myfech'; // 确保正确导入 myfetch

const getCAPTCHAUrl = '/nestapi/captcha';
const validateCaptchaUrl = '/nestapi/auth/validateCaptcha';
const validateEmailTokenUrl = '/nestapi/auth/validateEmail';
const signUpUrl = '/nestapi/register';

// 获取验证码
export async function fetchCaptcha() {
	return myfetch(getCAPTCHAUrl, { method: 'GET' });
}

// 验证验证码
export async function validateCaptcha(formData: SignUpFormData) {
	return myfetch(validateCaptchaUrl, {
		method: 'POST',
		data: formData // myfetch 将处理 JSON.stringify
	});
}

// 验证邮箱验证码
export async function validateEmail(data: { token: string; phone: string; code: string }) {
	return myfetch(validateEmailTokenUrl, {
		method: 'POST',
		data: data // myfetch 将处理 JSON.stringify
	});
}

// 提交注册表单
export async function submitSignUp(formData: SignUpFormData) {
	return myfetch(signUpUrl, {
		method: 'POST',
		data: formData // myfetch 将处理 JSON.stringify
	});
}
