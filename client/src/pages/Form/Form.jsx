import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../redux/actions";
import style from "./Form.module.css";
import { FiArrowLeft } from "react-icons/fi";

export default function Form() {
	const dispatch = useDispatch();
	const history = useHistory();
	// eslint-disable-next-line no-unused-vars
	const activities = useSelector((state) => state.activities);
	const countries = useSelector((state) => state.countries);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: "",
		difficulty: "",
		duration: 0,
		season: "",
		countries: [],
	});

	let sortedCountries = [...countries].sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	//validations
	let validateName = /^[a-zA-Z\s]+$/;
	let validateInteger = /^[\d]$/;

	function validate(input) {
		let errors = {};

		if (!input.name) errors.name = "Activity is required";
		if (input.name.length > 50) errors.name = "Activity is too large";
		if (!validateName.test(input.name))
			errors.name = "Numbers or special characters are not allowed";
		if (!input.difficulty) errors.difficulty = "Difficulty is required";
		if (!input.duration)
			errors.duration = "Activity's duration (time) is required";
		if (input.duration < 1 || input.duration > 6)
			errors.duration = "Activity's duration must be between 1 and 6 hours";
		if (!validateInteger.test(input.duration))
			errors.duration = "It must be an integer";
		if (!input.season) errors.season = "Season is required";
		if (!input.countries.length)
			errors.countries = "Al least one country is required";
		return errors;
	}

	useEffect(() => {
		setErrors(validate(input));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value, //toma el valor del input y lo pasa al estado
		});
	}

	function handleSelect(e) {
		if (!input.countries.includes(e.target.value)) {
			//evita que se repita el pais seleccionado
			setInput({
				...input,
				countries: [...input.countries, e.target.value], //me trae lo que ya había en el estado y le agrega el value
			});
		} else alert("This country's already included");
	}

	function handleSeason(e) {
		setInput({
			...input,
			season: e.target.value,
		});
	}

	function handleDifficulty(e) {
		setInput({
			...input,
			difficulty: e.target.value,
		});
	}

	function getNameById(id) {
		const countryId = countries.filter((e) => e.id === id);
		return countryId[0].name;
	}

	function handleDelete(e) {
		setInput({
			...input,
			countries: input.countries.filter((d) => d !== e),
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (Object.keys(errors).length === 0 && input.countries.length > 0) {
			dispatch(postActivity(input));
			//alert("Activity successfully created");
			//e.target.reset();
			setInput({
				name: "",
				difficulty: "",
				duration: 0,
				season: "",
				countries: [],
			});
			history.push("/home");
		} else {
			alert("Something went wrong!");
		}
	}

	return (
		<>
			<div className={style.container}>
				<Link to="/" className={style.back}>
					<FiArrowLeft />
				</Link>
				<form onSubmit={(e) => handleSubmit(e)} className={style.form}>
					<div>
						<h3 className={style.h3}>Create your touristic activity</h3>
						<label className={style.label}>Activity: </label>
						<input
							type="text"
							name="name"
							value={input.name}
							onChange={(e) => handleChange(e)}
							className={style.input}
						/>
						{errors.name && <p className={style.errors}>{errors.name}</p>}
					</div>
					<div>
						<label className={style.label}>Difficulty: </label>
						<select
							name="difficulty"
							onChange={(e) => handleDifficulty(e)}
							className={style.select}
						>
							<option value={input.difficulty} disabled selected>
								-- Select a difficulty level --
							</option>
							<option value="1">1: Beginners</option>
							<option value="2">2: Easy</option>
							<option value="3">3: Intermediate</option>
							<option value="4">4: Hard</option>
							<option value="5">5: Extreme</option>
						</select>
						{errors.difficulty && (
							<p className={style.errors}>{errors.difficulty}</p>
						)}
					</div>
					<div>
						<label className={style.label}>Duration (hrs.): </label>
						<input
							type="number"
							name="duration"
							onChange={(e) => handleChange(e)}
							value={input.duration}
							className={style.input}
						/>
						{errors.duration && (
							<p className={style.errors}>{errors.duration}</p>
						)}
					</div>
					<div>
						<label className={style.label}>Season: </label>
						<select
							name="season"
							onChange={(e) => handleSeason(e)}
							className={style.select}
						>
							<option value={input.season} disabled selected>
								-- Select a season --
							</option>
							<option value="Summer">Summer</option>
							<option value="Winter">Winter</option>
							<option value="Fall">Fall</option>
							<option value="Spring">Spring</option>
						</select>
						{errors.season && <p className={style.errors}>{errors.season}</p>}
					</div>
					<label className={style.label}>Countries: </label>
					<select onChange={(e) => handleSelect(e)} className={style.select}>
						<option value={input.countries} disabled selected>
							-- Select a country --
						</option>
						{sortedCountries.map((e, id) => (
							<option key={id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
					{errors.countries && (
						<p className={style.errors}>{errors.countries}</p>
					)}
					<ul className={style.ul}>
						<li className={style.p}>
							{input.countries.map((e) => getNameById(e) + ", ")}
						</li>
					</ul>
					{input.countries.map((e, id) => (
						<div>
							<p key={id} className={style.p}>
								{getNameById(e)}
							</p>
							<button
								type="button"
								onClick={() => handleDelete(e)}
								className={style.delete}
							>
								X
							</button>
						</div>
					))}
					<div>
						{!input.name ||
						!input.difficulty ||
						!input.duration ||
						!input.season ||
						!input.countries.length ||
						Object.keys(errors).length ? (
							<button disabled type="submit" className={style.btnDisabled}>
								Create
							</button>
						) : (
							<button type="submit" className={style.btnForm}>
								Submit
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
}
