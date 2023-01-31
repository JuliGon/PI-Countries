import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import style from "./NavBar.module.css";
import Logo from "./Logo_SinTag.png";

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
			<header>
				<nav className={style.nav}>
					<ul className={style.ul}>
						<img id="logo" src={Logo} alt="" className={style.logo} />
						<li className={style.li}>
							<a href="/">Landing Page</a>
						</li>
						<li className={style.li}>
							<a href="/home">Countries</a>
						</li>
						<li className={style.li}>
							<a href="/activity">Create activity</a>
						</li>
						<li className={style.li}>
							<input
								value={name}
								type="text"
								placeholder="Find a country..."
								onChange={(e) => handleInputChange(e)}
								className={style.input}
							/>
						</li>
						<li className={style.li}>
							<button
								type="submit"
								onClick={(e) => handleSubmit(e)}
								className={style.button}
							>
								Search
							</button>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
