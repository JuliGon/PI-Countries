import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import style from "./NavBar.module.css";
import Logo from "./Isologo.png";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function NavBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMenu = () => setClick(false);

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
					<a href="/" onClick={closeMenu}>
					  <img id="logo" src={Logo} alt="" className={style.logo} />
					</a>

					<div className={style.hamburger} onClick={handleClick}>
						{click ? <FiX /> : <FiMenu />}
					</div>
					<ul className={click ? `${style.menuActive} ${style.menu}` : style.menu}>
						<li>
							<a href="/" onClick={closeMenu}>Home</a>
						</li>
						<li>
							<a href="/activity" onClick={closeMenu}>Form</a>
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
						className={style.search}
					>
						<FiSearch />
					</button>
				</div>
			</nav>
		</div>
	);
}
