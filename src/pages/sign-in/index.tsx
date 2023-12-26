import React, { useState } from 'react';
import Layout from '@/components/Layout';
import {
	TextField,
	Button,
	Grid,
	Typography,
	Divider,
	IconButton,
	Card,
	CardContent,
	Tab,
	Tabs,
	Box,
	Stack
} from '@mui/material';
import {
	Email,
	Phone,
	Google,
	Facebook,
	Apple,
	QrCode2,
	VisibilityOff,
	Visibility
} from '@mui/icons-material';
import Image from 'next/image';

const SignIn: React.FC = () => {
	const [loginMethod, setLoginMethod] = useState('email');
	const [showQRCode, setShowQRCode] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setLoginMethod(newValue);
	};

	const handleQRCodeLogin = async () => {
		setShowQRCode(!showQRCode);
		if (!showQRCode) {
			try {
				const response = await fetch(
					'/api/auth/wechat-miniprogram-qrcode'
				);
				const data = await response.json();
				if (data && data.qrCodeUrl) {
					setQrCodeUrl(data.qrCodeUrl);
				}
			} catch (error) {
				console.error('Error fetching QR code:', error);
			}
		}
	};

	return (
		<Layout>
			<Grid
				container
				direction='column'
				alignItems='center'
				justifyContent='center'>
				<Card
					style={{
						width: '400px',
						height: '400px',
						marginTop: '20px',
						padding: '16px',
						borderRadius: '15px',
						boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
						transition: '0.3s'
					}}>
					<CardContent>
						<Box
							display='flex'
							justifyContent='flex-end'>
							<IconButton
								onClick={
									handleQRCodeLogin
								}>
								<QrCode2 />
							</IconButton>
						</Box>
						{!showQRCode ? (
							<>
								<Tabs
									value={
										loginMethod
									}
									onChange={
										handleChange
									}
									aria-label='登录方式'
									variant='fullWidth'
									sx={{
										'.MuiTab-root':
											{
												// Applying styles to all Tab components inside Tabs
												flex: 1
											}
									}}>
									<Tab
										label='邮箱登录'
										value='email'
										icon={
											<Email />
										}
									/>
									<Tab
										label='手机号登录'
										value='phone'
										icon={
											<Phone />
										}
									/>
								</Tabs>
								<TextField
									label={
										loginMethod ===
										'email'
											? '邮箱'
											: '手机号'
									}
									type={
										loginMethod
									}
									variant='outlined'
									fullWidth
									margin='normal'
								/>
								<TextField
									label='密码'
									type={
										showPassword
											? 'text'
											: 'password'
									}
									variant='outlined'
									fullWidth
									margin='normal'
									InputProps={{
										endAdornment: (
											<IconButton
												onClick={
													handlePasswordVisibility
												}>
												{showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										)
									}}
								/>
								<Button
									variant='contained'
									color='primary'
									fullWidth
									sx={{
										margin: '8px'
									}}>
									登录
								</Button>
							</>
						) : (
							<Box
								sx={{
									display: 'flex',
									flexDirection:
										'column',
									alignItems: 'center',
									justifyContent:
										'center',
									flex: 1
								}}>
								<Stack
									spacing={
										2
									}
									alignItems='center'>
									<Typography
										variant='h5'
										align='center'>
										微信扫码登录
									</Typography>
									{qrCodeUrl ? (
										<Image
											src={
												qrCodeUrl
											}
											alt='微信二维码'
											width={
												200
											}
											height={
												200
											}
											objectFit='contain'
										/>
									) : (
										<Typography
											variant='body1'
											align='center'>
											加载二维码中...
										</Typography>
									)}
								</Stack>
							</Box>
						)}
						{/* {!showQRCode && (
							<>
								<Divider
									className={
										classes.divider
									}>
									或
								</Divider>
								<Grid
									item
									container
									xs={12}
									spacing={
										1
									}
									justifyContent='center'>
									<IconButton
										color='primary'
										className={
											classes.iconButton
										}>
										<Google />
									</IconButton>
									<IconButton
										color='primary'
										className={
											classes.iconButton
										}>
										<Facebook />
									</IconButton>
									<IconButton
										color='primary'
										className={
											classes.iconButton
										}>
										<Apple />
									</IconButton>
								</Grid>
							</>
						)} */}
					</CardContent>
				</Card>
			</Grid>
		</Layout>
	);
};

export default SignIn;
