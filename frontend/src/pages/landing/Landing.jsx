import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Components from './Components';
import './css/landing.css';
import './css/features.css';
import './css/navbar.css';
import './css/login.css';
import './css/signup.css';
import anima from '../../Images/abandened-children.jpg';
import improve from '../../Images/Adoption.jpg';
import lecture from '../../Images/children-edu.jpg';
import proctor1 from '../../Images/children-love.webp';
import logo from '../../Images/logo.jpg'
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import ProtectedRoutes from '../Protected/ProtectedRoutes';

// const ROLES = {
// 	GROUND_WORKER: 3,
// 	CASE_MANAGER: 1,
// 	OPERATION_MANAGER: 2
// }

const featureList = [
	'Face Verification',
	'Multiple People Detection',
	'Voice Detection',
	'Devtools Check',
	'Full Screen Check',
	'Multiple Tabs Check'
];

//STUDENT TYPE 2
//INSTITUTE TYPE 1

const NavLinks = () => (

	<React.Fragment>
		<p>
			<a href="#features">Features</a>
		</p>
		<p>
			<li className="nav-link dropdown"><a href="/contact" className="dropdown-landing">Contact<i
				className="bi bi-chevron-compact-down"></i></a>
				<ul className="dropdown-list">
					<li className="nav-link">
						<a href="mailto:cod.callofduty@gmail.com" target="_blank">&nbsp;&nbsp;E-Mail</a>
						<li className="nav-link">
							<a href="">Phone</a>
						</li>
					</li>
				</ul>
			</li>
		</p>
	</React.Fragment>
);

const Navbar = () => {
	return (
		<div className="landing-navbar">
			<div className="landing-navbar-logo-landing">
				<img src={logo} height="50px" width="100px"></img>
			</div>
			<div className="landing-navbar-links">
				<NavLinks />
			</div>
		</div>
	);
};

const Landing = () => {
	let initialRender = true;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signIn, toggle] = React.useState(true);
	const [errorlogin, seterrorlogin] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	// const navigate = useNavigate();

	const signInFunc = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:4000/api/v1/login', { email, password });
			console.log(response.data);
			// Assuming the server responds with a success message and a token
			const { success, message, token } = response.data;

			if (success) {
				// Set the token as a cookie or store it in localStorage as per your preference
				document.cookie = `token=${token}`;
				localStorage.setItem('role', message.role)

				// Redirect the user based on their role
				if (message.role === 3) {
					navigate('/GroundWorker'); // Redirect to admin dashboard
				} else if (message.role === 2) {
					navigate('/OperationManager');
				} else if (message.role === 1) {
					navigate('/CaseManager'); // Redirect to user dashboard
				}

				console.log('Login successful!');
			} else {
				console.log("Invalid Email and Password")
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}

	return (
		<React.Fragment>
			<Navbar />
			{errorlogin
				? (<h1 className='error-login'>Wrong details pls re enter</h1>)
				: null}
			{loading
				? (
					<div className='Loading-Screen'>
						<Oval
							height={80}
							width={80}
							color="#4fa94d"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel='oval-loading'
							secondaryColor="#4fa94d"
							strokeWidth={2}
							strokeWidthSecondary={2} />
					</div>)
				: null}

			<div className="section-type-landing-page">
				<div className="section-fluid-main">
					<div className="section-row">
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={anima} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>Animation filled User Interface</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={improve} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>Improve by strengthening your weak topics</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={lecture} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>Online Lectures and frequent doubt solving with the best faculty</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={proctor1} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>Active invigilation by Proctoring Software</h2>
						</div>
					</div>
				</div>
				<Components.Container>
					<Components.SignInContainer signinIn={signIn}>
						<Components.Form onSubmit={signInFunc}>
							<Components.Title>Sign in</Components.Title>
							<Components.Input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
							<Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
							<Components.Button type="submit">Sign In</Components.Button>
						</Components.Form>
					</Components.SignInContainer>
				</Components.Container>
				<div id="features" className='features'>
					<h1>Features</h1>
				</div>
			</div >

			<footer className="Footer">Copyright © 2022 All rights reserved.</footer>
		</React.Fragment >

	);
};

export default Landing;