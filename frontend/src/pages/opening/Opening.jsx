import React from "react";
import './css/opening.css'

const Opening = () => {
	return (

		<div className="untitled">
			<div className="untitled__slides">
				<div className="untitled__slide">
					<div className="untitled__slideBg"></div>
					<div className="untitled__slideContent">
						<span>Every vulnerable and abandoned child</span>
						<span>has a future at BalAsha Trust</span>
						<a className="button" href="/landing">Sign Up</a>
					</div>
				</div>
				<div className="untitled__slide">
					<div className="untitled__slideBg"></div>
					<div className="untitled__slideContent">

						<span>We rescue abandoned children</span>
						<span>and give them a safe home,love and care</span>
						<a className="button" href="/landing" >Sign Up</a>
					</div>
				</div>
				<div className="untitled__slide">
					<div className="untitled__slideBg"></div>
					<div className="untitled__slideContent">
						<span>Serving children in communities with</span>
						<span>Education,Nutrition and Health</span>
						<a className="button" href="/landing">Sign Up</a>
					</div>
				</div>
				<div className="untitled__slide">
					<div className="untitled__slideBg"></div>
					<div className="untitled__slideContent">
						<span>Finding Forever Adoptive Families</span>
						<span>For Children</span>
						<a className="button" href="/landing" target="/black">Sign Up</a>
					</div>
				</div>
			</div>
			<div className="untitled__shutters"></div>
		</div>
	);
};
export default Opening;
