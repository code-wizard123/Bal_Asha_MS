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
			<li class="nav-link dropdown"><a href="/contact" class="dropdown-landing">Contact<i
				class="bi bi-chevron-compact-down"></i></a>
				<ul class="dropdown-list">
					<li class="nav-link">
						<a href="mailto:cod.callofduty@gmail.com" target="_blank">&nbsp;&nbsp;E-Mail</a>
						<li class="nav-link">
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

const Landing = ({ role, roleset }) => {
	let initialRender = true;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signIn, toggle] = React.useState(true);
	const [errorlogin, seterrorlogin] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (initialRender === false || role) {
			console.log("navigating")
			navigate('/protected')
		}
		else {
			console.log("set to false")
			console.log(role)
			initialRender = false;
		}

	}, [role])
	// const navigate = useNavigate();

	const signInFunc = async (e) => {
		e.preventDefault();

		const details = {
			email,
			password
		}

		await axios.post("http://localhost:4000/api/v1/login", details)
			.then(async (res) => {
				const checkRole = res.data.message.role
				await roleset(checkRole)
			})
			.catch(e => console.log(e))
	}

	return (
		<React.Fragment>
			<Navbar />
			{/* {errorlogin
				? (<h1 className='error-login'>Wrong details pls re enter</h1>)
				: null} */}
			{/* {loading
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
				: null} */}

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
						<div class="hover-text">
							<h2>Animation filled User Interface</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={improve} alt="" />
								</div>
							</div>
						</div>
						<div class="hover-text">
							<h2>Improve by strengthening your weak topics</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={lecture} alt="" />
								</div>
							</div>
						</div>
						<div class="hover-text">
							<h2>Online Lectures and frequent doubt solving with the best faculty</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={proctor1} alt="" />
								</div>
							</div>
						</div>
						<div class="hover-text">
							<h2>Active invigilation by Proctoring Software</h2>
						</div>
					</div>
				</div>
				<Components.Container>
					{/* <Components.SignUpContainer signinIn={signIn}>
						<Components.Form /*onSubmit={signUpFunc}>
							<Components.Title>Create Account</Components.Title>
							{confirm
								? (
									<h1 className='ReEnter'>Re-Enter Details</h1>
								)
								: null}
							<Components.Input type='text' placeholder='First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
							<Components.Input type='text' placeholder='Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} required />
							{email == ''
								? null
								: ((re.test(email))
									? null
									: (<h1 className='ReEnter'>Enter valid email</h1>))
							}
							<Components.Input type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
							<Components.Input type='number' placeholder='Mobile No.' value={mobile} onChange={(e) => setMobile(e.target.value)} required />
							<Components.Input type='text' placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} required />
							<Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
							{password === confpassword
								? null
								: (<h1 className='ReEnter'>Enter same password</h1>)
							}
							<Components.Input type='password' placeholder='Confirm Password' value={confpassword} onChange={(e) => setConfPassword(e.target.value)} required />
							<div class="upload-btn-wrapper">
								<button class="btn">Upload a file</button>
								<input type="file" onChange={(e) => setImage(e.target.files[0])} name="myfile" />

							</div>
							 <button className="btn">Upload a file</button>
            <input type="file" ></input> }
							<button /*onClick={submitImage} className='file-button'>Upload image as profile Photo</button>
							<div class="selector">
								<div class="selector-item">
									<input type="radio" id="radio1" name="selector" value="2" class="selector-item_radio" onClick={(e) => setType(e.target.value)} />
									<label for="radio1" class="selector-item_label">Student</label>
								</div>
								<div class="selector-item">
									<input type="radio" id="radio2" name="selector" value="1" class="selector-item_radio" onClick={(e) => setType(e.target.value)} />
									<label for="radio2" class="selector-item_label">Teacher</label>
								</div>
							</div>
							<Components.Button type="submit">Sign Up</Components.Button>
						</Components.Form>
					</Components.SignUpContainer> */}
					<Components.SignInContainer signinIn={signIn}>
						<Components.Form onSubmit={signInFunc}>
							<Components.Title>Sign in</Components.Title>
							<Components.Input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
							<Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
							<Components.Button type="submit">Sign In</Components.Button>
						</Components.Form>
					</Components.SignInContainer>

					{/* <Components.OverlayContainer signinIn={signIn}>
						<Components.Overlay signinIn={signIn}>

							<Components.LeftOverlayPanel signinIn={signIn}>
								<Components.Title>Welcome Back!</Components.Title>
								<Components.Paragraph>
									To keep connected with us please login with your personal info
								</Components.Paragraph>
								<Components.GhostButton onClick={() => {
									toggle(true)
								}} >
									Sign In
								</Components.GhostButton>
							</Components.LeftOverlayPanel> */}

							{/* <Components.RightOverlayPanel signinIn={signIn}>
								<Components.Title>Hello!</Components.Title>
								<Components.Paragraph>
									Enter Your personal details and start journey with us
								</Components.Paragraph>
								<Components.GhostButton onClick={() => toggle(false)}>
									Sign Up
								</Components.GhostButton>
							</Components.RightOverlayPanel> */}

						{/* </Components.Overlay>
					</Components.OverlayContainer> */}

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