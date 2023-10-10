import React from "react";
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	alphabeticalOrder,
	orderByPopulation,
	filterByActivity,
	filterByRegion,
	getCountries,
} from "../../redux/actions";
import style from "./Filters.module.css";

export default function Filters({
	setCurrentPage,
	setOrder,
	currentCountries,
}) {
	const dispatch = useDispatch();
	const allActivities = useSelector((state) => state.activities);

	function handleFilterByActivity(e) {
		e.preventDefault();
		dispatch(filterByActivity(e.target.value)); //recibe los datos que se seleccionan -> e.target.value
		setCurrentPage(1);
	}

	function handleFilterByRegion(e) {
		e.preventDefault();
		dispatch(filterByRegion(e.target.value));
		setCurrentPage(1);
	}

	function handleSortByName(e) {
		e.preventDefault();
		dispatch(alphabeticalOrder(e.target.value));
		setCurrentPage(1);
		setOrder(`In order ${e.target.value}`); //cuando setea la pagina se modifica el estado local y se renderiza
	}

	function handleSortByPopulation(e) {
		e.preventDefault();
		dispatch(orderByPopulation(e.target.value));
		setCurrentPage(1);
		setOrder(`In order ${e.target.value}`);
	}

	function handleClick(e) {
		e.preventDefault();
		dispatch(getCountries());
	}

	return (
		<>
			<div className={style.container}>
				<label className={style.label}></label>
				<select
					defaultValue="default"
					onChange={(e) => handleSortByName(e)}
					className={style.filters}
				>
					<option value="default" disabled selected className={style.option}>
						-- Alphabetical order --
					</option>
					<option value="asc" className={style.option}>
						A to Z
					</option>
					<option value="desc" className={style.option}>
						Z to A
					</option>
				</select>
				<select
					defaultValue="default"
					onChange={(e) => handleSortByPopulation(e)}
					className={style.filters}
				>
					<option value="default" disabled selected className={style.option}>
						-- Order by population --
					</option>
					<option value="max" className={style.option}>
						Min. to Máx.
					</option>
					<option value="min" className={style.option}>
						Máx. to Min.
					</option>
				</select>
				<select
					defaultValue="default"
					onChange={(e) => handleFilterByRegion(e)}
					className={style.filters}
				>
					<option value="default" disabled selected className={style.option}>
						-- Filter by region --
					</option>
					<option value="all" className={style.option}>
						All
					</option>
					<option value="Americas" className={style.option}>
						Americas
					</option>
					<option value="Europe" className={style.option}>
						Europe
					</option>
					<option value="Asia" className={style.option}>
						Asia
					</option>
					<option value="Africa" className={style.option}>
						Africa
					</option>
					<option value="Oceania" className={style.option}>
						Oceania
					</option>
					<option value="Antarctic" className={style.option}>
						Antarctic
					</option>
				</select>
				<select
					defaultValue="default"
					onChange={(e) => handleFilterByActivity(e)}
					className={style.filters}
				>
					<option value="default" disabled selected className={style.option}>
						-- Filter by activity --
					</option>
					{allActivities?.map((a, index) => (
						<option value={a.name} key={index} className={style.option}>
							{a.name.charAt(0).toUpperCase() + a.name.slice(1).toLowerCase()}
						</option>
					))}
				</select>
				<button
					onClick={(e) => {
						handleClick(e);
					}}
					className={style.button}
				>
					Reset
				</button>
			</div>
		</>
	);
}
