import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	Container,
	Step,
	StepLabel,
	Stepper,
	Typography,
	TextField,
	Select,
	FormControl,
	InputLabel,
	Paper,
	Box
} from '@material-ui/core';
import Layout from '@/components/Layout';
import styles from '@/styles/SignUp.module.css';
import { fetchCaptcha, validateCaptcha, validateEmail } from '@/services';
import { InitialSignUpForm } from '@/types';
import { MySessionStorage } from '@/utils';

const getSteps = () => {
	return ['注册', '邮箱验证', '第三步'];
};

const getStepContent = (stepIndex: number, handleNext: () => void, handleBack: () => void) => {
	switch (stepIndex) {
		case 0:
			return <SignUpForm handleNext={handleNext} />;
		case 1:
			return <ValidateEmail handleNext={handleNext} />;
		case 2:
			return '第三步的内容...';
		default:
			return '未知步骤';
	}
};

const SignUpForm: React.FC<{ handleNext: () => void }> = ({ handleNext }) => {
	const initialValues: InitialSignUpForm = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		country: 'CN',
		phoneNumber: '',
		captcha: ''
	};

	const SignUpSchema = Yup.object().shape({
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Passwords must match')
			.required('Confirm password is required'),
		phoneNumber: Yup.string()
			.matches(/^1[3-9]\d{9}$/, 'Please enter a valid phone number')
			.required('Phone number is required'),
		captcha: Yup.string().required('Verification code is required')
	});

	const [captchaSrc, setCaptchaSrc] = useState('');
	const [captchaToken, setCaptchaToken] = useState('');

	const refreshCaptcha = async () => {
		try {
			const data = await fetchCaptcha(); // 替换为您的后端验证码 API 路径
			setCaptchaSrc(data.image); // 假设后端返回的是验证码图像的 URL 或 Base64 编码
			setCaptchaToken(data.token); // 保存验证码 token
		} catch (error) {
			console.error('Error fetching captcha:', error);
		}
	};

	useEffect(() => {
		refreshCaptcha(); // 组件挂载时获取一次验证码
	}, []);

	const handleSubmit = async (values: any) => {
		const payload = {
			...values,
			captchaToken // 包括验证码 token
		};

		try {
			const { data } = await validateCaptcha(payload);

			if (data.isValid) {
				MySessionStorage.setItem(
					'phoneParams',
					{
						token: data.token,
						phone: payload.phoneNumber
					},
					300
				);
				handleNext();
			} else {
				console.error('Invalid captcha');
				// 显示错误消息或者重新刷新验证码
			}
		} catch (error) {
			console.error('Error validating captcha:', error);
		}
	};

	const countryOptions = [{ value: 'CN', label: '+86 中国' }];

	return (
		<Formik
			initialValues={{
				...initialValues,
				country: 'CN'
			}}
			validationSchema={SignUpSchema}
			onSubmit={(values, { setSubmitting }) => {
				handleSubmit(values);
				setSubmitting(false);
			}}>
			{(
				{ setFieldValue, errors, touched, values } // 确保在这里正确地解构 values
			) => (
				<Form className={styles.signupForm}>
					<div className={styles.row}>
						<Field
							as={TextField}
							name='firstName'
							label='First Name'
							variant='outlined'
							error={
								touched.firstName &&
								Boolean(
									errors.firstName
								)
							}
							helperText={
								touched.firstName &&
								errors.firstName
							}
							fullWidth
						/>
						<Field
							as={TextField}
							name='lastName'
							label='Last Name'
							variant='outlined'
							error={
								touched.lastName &&
								Boolean(
									errors.lastName
								)
							}
							helperText={
								touched.lastName &&
								errors.lastName
							}
							fullWidth
						/>
					</div>

					<Field
						as={TextField}
						name='email'
						type='email'
						label='Email'
						variant='outlined'
						error={
							touched.email &&
							Boolean(errors.email)
						}
						helperText={
							touched.email && errors.email
						}
						fullWidth
					/>

					<Field
						as={TextField}
						name='password'
						type='password'
						label='Password'
						variant='outlined'
						error={
							touched.password &&
							Boolean(errors.password)
						}
						helperText={
							touched.password &&
							errors.password
						}
						fullWidth
					/>

					<Field
						as={TextField}
						name='confirmPassword'
						type='password'
						label='Confirm Password'
						variant='outlined'
						error={
							touched.confirmPassword &&
							Boolean(
								errors.confirmPassword
							)
						}
						helperText={
							touched.confirmPassword &&
							errors.confirmPassword
						}
						fullWidth
					/>

					<div className={styles.row}>
						<FormControl
							variant='outlined'
							className={
								styles.formControl
							}>
							<InputLabel>
								Country
							</InputLabel>
							<Select
								native
								value={
									values.country
								}
								onChange={(e) =>
									setFieldValue(
										'country',
										e
											.target
											.value
									)
								}
								label='Country'
								inputProps={{
									name: 'country',
									id: 'country-native-simple'
								}}>
								{countryOptions.map(
									(
										option
									) => (
										<option
											key={
												option.value
											}
											value={
												option.value
											}>
											{
												option.label
											}
										</option>
									)
								)}
							</Select>
						</FormControl>
						<Field
							as={TextField}
							name='phoneNumber'
							label='Phone Number'
							variant='outlined'
							className={
								styles.phoneNumberInput
							}
							error={
								touched.phoneNumber &&
								Boolean(
									errors.phoneNumber
								)
							}
							helperText={
								touched.phoneNumber &&
								errors.phoneNumber
							}
							fullWidth
						/>
					</div>

					<div className={styles.row}>
						<Paper
							elevation={1}
							className={
								styles.captchaContainer
							}>
							<div
								dangerouslySetInnerHTML={{
									__html: captchaSrc
								}}
								onClick={
									refreshCaptcha
								}
								className={
									styles.captchaImage
								}
							/>
						</Paper>
						<Field
							as={TextField}
							name='captcha'
							label='Verification Code'
							variant='outlined'
							error={
								touched.captcha &&
								Boolean(
									errors.captcha
								)
							}
							helperText={
								touched.captcha &&
								errors.captcha
							}
							fullWidth
							className={
								styles.verification
							}
						/>
					</div>

					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth>
						Continue
					</Button>
				</Form>
			)}
		</Formik>
	);
};

const ValidateEmail: React.FC<{ handleNext: () => void }> = ({ handleNext }) => {
	const [code, setCode] = useState(Array(6).fill(''));
	const [isCodeComplete, setIsCodeComplete] = useState(false);

	// 当验证码输入完成时，检查是否所有输入框都填满了
	useEffect(() => {
		setIsCodeComplete(code.every((c) => c.length === 1));
	}, [code]);

	const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newCode = [...code];
		newCode[index] = e.target.value.slice(0, 1);
		setCode(newCode);

		// 自动跳转到下一个输入框
		if (e.target.value && index < 5) {
			const nextSibling = document.querySelector(
				`input[name='code${index + 1}']`
			);
			if (nextSibling) {
				(nextSibling as HTMLInputElement).focus();
			}
		}
	};

	// ValidateEmail 组件中
	const handleSubmit = async () => {
		const phoneParams = MySessionStorage.getItem('phoneParams');
		const emailCode = code.join(''); // 将用户输入的验证码数组转换为字符串
		try {
			const { data } = await validateEmail({
				token: phoneParams.token,
				phone: phoneParams.phone,
				code: emailCode
			});
			if (data.isValid) {
				handleNext();
			} else {
				// 处理验证失败的情况
				console.error('Invalid email verification code');
			}
		} catch (error) {
			console.error('Error validating email token:', error);
		}
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Box display='flex' justifyContent='center' mb={2}>
				{code.map((c, index) => (
					<TextField
						key={index}
						name={`code${index}`}
						variant='outlined'
						inputProps={{
							maxLength: 1,
							style: { textAlign: 'center' }
						}}
						value={c}
						onChange={handleChange(index)}
						style={{
							margin: '0 4px',
							width: '40px'
						}}
					/>
				))}
			</Box>
			<Button
				variant='contained'
				color='primary'
				onClick={handleSubmit}
				disabled={!isCodeComplete}>
				继续
			</Button>
		</Box>
	);
};

const MultiStepForm: React.FC = () => {
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Layout>
			<Container>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<div>
					{activeStep === steps.length ? (
						<div>
							<Typography>
								所有步骤完成
							</Typography>
							<Button onClick={handleReset}>
								重置
							</Button>
						</div>
					) : (
						<div>
							{getStepContent(
								activeStep,
								handleNext,
								handleBack
							)}
						</div>
					)}
				</div>
			</Container>
		</Layout>
	);
};

export default MultiStepForm;
