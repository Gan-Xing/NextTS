import { getLocal, setLocals, removeLocals, setLocal, getLocals } from 'ganxing';

enum TokenKeys {
	Access = 'ACCESS_TOKEN',
	Refresh = 'REFRESH_TOKEN'
}
// 获取token
export const getAccessToken = () => {
	return getLocal(TokenKeys.Access);
};

// 刷新token
export const getRefreshToken = () => {
	return getLocal(TokenKeys.Refresh);
};

// 设置token
export const setToken = (token: Auth.Token) => {
	setLocals([
		{
			key: TokenKeys.Refresh,
			value: token.refreshToken,
			expiration: token.refreshExpiresIn * 1000
		},
		{
			key: TokenKeys.Access,
			value: token.accessToken,
			expiration: token.accessExpiresIn * 1000
		}
	]);
};

// 删除token
export const removeToken = () => {
	removeLocals([TokenKeys.Access, TokenKeys.Refresh]);
};

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
	return 'Bearer ' + token;
};

// ========== 账号相关 ==========

export const setEmailParams = (data: { phone: string; token: string }) => {
	setLocals([
		{
			key: 'EmailToken',
			value: data.token,
			expiration: 15 * 60 * 1000
		},
		{
			key: 'PhoneNumber',
			value: data.phone,
			expiration: 60 * 60 * 1000
		}
	]);
};

export const getEmailParams = () => {
	return getLocals(['EmailToken', 'PhoneNumber']) as string[];
};

export const setPhoneToken = (data: string) => {
	setLocal('PhoneToken', data, 15 * 60 * 1000);
};

export const getPhoneToken = () => {
	return getLocal('PhoneToken') as string;
};

export const getPhoneNumber = () => {
	return getLocal('PhoneNumber') as string;
};
