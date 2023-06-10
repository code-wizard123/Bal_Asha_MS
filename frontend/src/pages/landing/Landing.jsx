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
import logo from '../../Images/logocolorcombo.png'
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
		<div>
			
		</div>
	</React.Fragment>
);

const Navbar = () => {
	return (
		<div className="landing-navbar">
			<div className="landing-navbar-logo-landing">
				<img src={logo} height="50px" width="100px"></img>
			</div>
			{/* <div className="landing-navbar-links">
				<NavLinks />
			</div> */}
		</div>
	);
};

const Landing = () => {
	const signUpFunc = async (e) => {
		e.preventDefault();
		if ((password == confpassword) && re.test(email)) {
			const sendData = {
				"name": name,
				"email": email,
				"password": password,
				"role": role,
				"pincode": pincode,
				"TypeId": String(parseInt(type)),
				"avatar": url
			};

			// console.log(sendData);
			setLoading(true);
			// console.log(loading)

			try {
				const response = await axios.post('http://localhost:4000/api/v1/register', sendData)
				console.log(response.data)

				document.cookie = `token=${response.data.token}`
				
				if (parseInt(role) === 3) {
					navigate('/GroundWorker'); // Redirect to admin dashboard
				} else if (parseInt(role) === 2) {
					navigate('/OperationWorker');
				} else if (parseInt(role) === 1) {
					navigate('/CaseManager'); // Redirect to user dashboard
				}
			}
			catch (e) {
				seterrorlogin(e.response.data.message)
			}

			setLoading(false)
		}
	}
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signIn, toggle] = React.useState(true);
	const [errorlogin, seterrorlogin] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [confpassword, setConfPassword] = useState('');
	const [name, setName] = useState('');
	const [firstname, setFirstName] = useState('');
	const [pincode, setPincode] = useState(400053);
	const [mobile, setMobile] = useState('');
	const [type, setType] = useState("3");
	const [role, setRole] = useState(1);
	const [confirm, setConfirm] = useState(0);
	const [url, setUrl] = useState("");
	const [image, setImage] = useState("");
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const submitImage = () => {
		setLoading(true)
		// const [loading, setLoading] = useState(false)

		let userid = (JSON.parse(localStorage.getItem('login')).user.UserId).toString();
		// console.log(userid);
		let typeid = (JSON.parse(localStorage.getItem('login')).user.TypeId)
		const data = new FormData()
		data.append("file", image)
		data.append("upload_preset", "vkgzvauu")
		data.append("cloud_name", "dmomonuiu")

		fetch("'https://api.cloudinary.com/v1_1/dmomonuiu/image/upload',", {
			method: "post",
			body: data
		})
			.then((res) => res.json())
			.then((data) => {
				setUrl(data.url)
			})
	}
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

				// Redirect the user based on their role
				if (message.role === 3) {
					navigate('/GroundWorker'); // Redirect to admin dashboard
				} else if (message.role === 2) {
					navigate('/OperationWorker');
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
				? (<h1 className='error-login'>Wrong Details Please Re-Enter</h1>)
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
							<h2>Every abandoned and vulnerable child has a future at BalAsha Trust</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={improve} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>Finding forever adoptive families for children</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={lecture} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>Serving children in communities with Education, Nutrition and Health</h2>
						</div>
						<div className="section-col">
							<div className='section'>
								<div className="image">
									<img src={proctor1} alt="" />
								</div>
							</div>
						</div>
						<div className="hover-text">
							<h2>We rescue abandoned children and give then safe home, love and acre</h2>
						</div>
					</div>
				</div>
				{/* <Components.Container>
					<Components.SignInContainer signinIn={signIn}>
						<Components.Form  className='colour' onSubmit={signInFunc}>
							<Components.Title>Sign in</Components.Title>
							<Components.Input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
							<Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
							<Components.Button type="submit">Sign In</Components.Button>
						</Components.Form>
					</Components.SignInContainer>
				</Components.Container> */}
				<Components.Container>
					<Components.SignUpContainer className="SignUpContainer" signinIn={signIn}>
						<Components.Form onSubmit={signUpFunc}>
							<Components.Title>Create Account</Components.Title>
							{confirm
								? (
									<h1 className='ReEnter'>Re-Enter Details</h1>
								)
								: null}
							<Components.Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
							{email == ''
								? null
								: ((re.test(email))
									? null
									: (<h1 className='ReEnter'>Enter valid email</h1>))
							}
							<Components.Input type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
							{/* <Components.Input type='number' placeholder='Role' value={role} onChange={(e) => setRole(e.target.value)} required /> */}
							<select class="role" value={role} onChange={e => setRole(e.target.value)}>
								<option value="1">Case Manager</option>
								<option value="2">Operation Worker</option>
								<option value="3">Ground Worker</option>
							</select>
							<Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
							{password === confpassword
								? null
								: (<h1 className='ReEnter'>Enter same password</h1>)
							}
							<Components.Input type='password' placeholder='Confirm Password' value={confpassword} onChange={(e) => setConfPassword(e.target.value)} required />
							<div className="upload-btn-wrapper">
								{/* <button className="btn">Upload a file</button> */}
								<input type="file" onChange={(e) => setImage(e.target.files[0])} name="myfile" />
							</div>
							{/* <button className="btn">Upload a file</button>
            <input type="file" ></input> */}
							{/* <button onClick={submitImage} className='file-button'>Upload image as profile Photo</button> */}
							{/* <div className="selector">
								<div className="selector-item">
									<input type="radio" id="radio1" name="selector" value="2" className="selector-item_radio" onClick={(e) => setType(e.target.value)} />
									<label htmlFor="radio1" className="selector-item_label">Student</label>
								</div>
								<div className="selector-item">
									<input type="radio" id="radio2" name="selector" value="1" className="selector-item_radio" onClick={(e) => setType(e.target.value)} />
									<label htmlFor="radio2" className="selector-item_label">Teacher</label>
								</div>
							</div> */}
							<Components.Button type="submit">Sign Up</Components.Button>
						</Components.Form>
					</Components.SignUpContainer>

					<Components.SignInContainer signinIn={signIn}>
						<Components.Form onSubmit={signInFunc}>
							<Components.Title>Sign in</Components.Title>
							<Components.Input type='text' placeholder='E-Mail ID' value={email} onChange={(e) => setEmail(e.target.value)} required />
							<Components.Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
							<Components.Button type="submit">Sign In</Components.Button>
						</Components.Form>
					</Components.SignInContainer>

					<Components.OverlayContainer signinIn={signIn}>
						<Components.Overlay signinIn={signIn}>

							<Components.LeftOverlayPanel signinIn={signIn}>
								<Components.Title>Welcome Back!</Components.Title>
								<Components.Paragraph>
									To keep connected with us please login with your personal info
								</Components.Paragraph>
								<Components.GhostButton onClick={() => toggle(true)} >
									Sign In
								</Components.GhostButton>
							</Components.LeftOverlayPanel>

							<Components.RightOverlayPanel signinIn={signIn}>
								<Components.Title>Hello!</Components.Title>
								<Components.Paragraph>
									Enter Your personal details and start journey with us
								</Components.Paragraph>
								<Components.GhostButton onClick={() => toggle(false)}>
									Sign Up
								</Components.GhostButton>
							</Components.RightOverlayPanel>

						</Components.Overlay>
					</Components.OverlayContainer>
				</Components.Container>
				{/* <div id="features" className='features'>
					<h1>Features</h1>
				</div> */}

			</div >

			<footer className="Footer">Copyright © 2023 All rights reserved.</footer>
		</React.Fragment >

	);
};

export default Landing;