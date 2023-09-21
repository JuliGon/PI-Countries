/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import NavBar from "../../components/NavBar/NavBar";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import style from "./Home.module.css";

export default function Home() {
	const allCountries = useSelector((state) => state.countries);
	const [order, setOrder] = useState(""); //renderiza los sort

	//paginado
	const [currentPage, setCurrentPage] = useState(1); //creo un estado local, le paso la pagina actual y la seteo para que arranque en 1
	const [countriesPerPage, setCountriesPerPage] = useState(12); //un segundo estado local, le paso la cantidad de paises por pagina (12)
	const indexOfLastCountry = currentPage * countriesPerPage; // 12
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
	const currentCountries = allCountries.slice(
		indexOfFirstCountry,
		indexOfLastCountry
	);

	//guarda los paises que se renderizan por pagina
	//el slice divide el array de todos los paises desde el indice del primero hasta el indice del ultimo

	const pagination = (pageNumber) => {
		//setea la pagina en el numero que vaya clickeando
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div>
				<NavBar setCurrentPage={setCurrentPage} />
			</div>
			<div className={style.container}>
				<Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
					<Container
						setCurrentPage={setCurrentPage}
						currentCountries={currentCountries}
					/>
					<Pagination
						key={1}
						countriesPerPage={countriesPerPage}
						allCountries={allCountries.length}
						pagination={pagination}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
					<Footer setCurrentPage={setCurrentPage} />
				</div>
		</>
	);
}
