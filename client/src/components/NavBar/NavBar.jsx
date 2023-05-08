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
		setName(e.target.value); //valor que tiene el input
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
		<>
			<nav className={style.nav}>
				<div className={style.items}>
					<div>
						<img id="logo" src={Logo} alt="" className={style.logo} />
					</div>
					<div className={style.div}>
						<a href="/">Home</a>
					</div>
					<div className={style.div}>
						<a href="/activity">Form</a>
					</div>
					<div className={style.div}>
						<input
							value={name}
							type="text"
							placeholder="Search..."
							onChange={(e) => handleInputChange(e)}
							className={style.input}
						/>
					</div>
					<div className={style.div}>
						<button
							type="submit"
							onClick={(e) => handleSubmit(e)}
							className={style.button}
						>
							Search
						</button>
					</div>
				</div>
			</nav>
		</>
	);
}
