import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';

interface FormValues {
	phoneNumber: string;
	code: string;
}

const initialValues: FormValues = {
	phoneNumber: '',
	code: ''
};

const SignUpSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.matches(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
		.required('手机号码为必填项'),
	code: Yup.string().required('验证码为必填项')
});

const SignUp: React.FC = () => {
	const [isCodeSent, setIsCodeSent] = useState(false);

	const sendVerificationCode = async (phoneNumber: string) => {
		try {
			// 使用 Next.js API 路由发送请求
			const response = await fetch('/api/send-code', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phoneNumber })
			});

			if (!response.ok) {
				throw new Error('Failed to send verification code');
			}

			setIsCodeSent(true);
		} catch (error) {
			console.error('Error sending verification code:', error);
		}
	};

	return (
		<Layout>
			<h2>注册</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={SignUpSchema}
				onSubmit={(values: FormValues) => {
					console.log(values);
					// 在这里处理注册逻辑
				}}>
				{({ setFieldValue, values }) => (
					<Form>
						<div>
							<label htmlFor='phoneNumber'>
								手机号码
							</label>
							<Field name='phoneNumber' />
							<ErrorMessage
								name='phoneNumber'
								component='div'
							/>
						</div>
						<div>
							<label htmlFor='code'>
								验证码
							</label>
							<Field name='code' />
							<ErrorMessage
								name='code'
								component='div'
							/>
							<button
								type='button'
								onClick={() =>
									sendVerificationCode(
										values.phoneNumber
									)
								}
								disabled={
									isCodeSent
								}>
								发送验证码
							</button>
						</div>
						<button type='submit'>注册</button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default SignUp;
