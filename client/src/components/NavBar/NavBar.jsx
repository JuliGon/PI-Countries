import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import style from "./NavBar.module.css";
import Logo from "./Isologo.png";

export default function NavBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value); 
		console.log(name);
	}

	function handleSubmit(e) {
		try {
			if (name.length > 0) {
				e.preventDefault();
				dispatch(getCountriesByName(name));
				setName("");
				setCurrentPage(1);
			} else {
				alert("The field is empty!");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={style.container}>
			<nav className={style.nav}>
				<div className={style.div}>
					<img id="logo" src={Logo} alt="" className={style.logo} />
					<ul className={style.ul}>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/activity">Form</a>
						</li>
					</ul>
				</div>
				<div className={style.div}>
					<input
						value={name}
						type="text"
						placeholder="Search..."
						onChange={(e) => handleInputChange(e)}
						className={style.input}
					/>
					<button
						type="submit"
						onClick={(e) => handleSubmit(e)}
						className={style.button}
					>
						Search
					</button>
				</div>
			</nav>
		</div>
	);
}
