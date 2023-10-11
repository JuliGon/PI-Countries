import React from "react";
import style from "./Pagination.module.css";
import { BiSolidChevronsLeft, BiSolidChevronsRight } from "react-icons/bi";

export default function Pagination({
	countriesPerPage,
	allCountries,
	pagination,
	currentPage,
	setCurrentPage,
	countriesOnFirstPage,
}) {
	const pageNumbers = [];
	const totalPages = Math.ceil(allCountries / countriesPerPage);

	//sumo uno al total de páginas por el país que corto de la primera
	//divide todas los paises por la cantidad de paises por pagina
	//y los pushea al array pageNumbers

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	const previousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	//el map renderiza cada numero por separado
	return (
		<>
			<div>
				<ul className={style.pagination}>
					<li key="prev" className={style.li}>
						<a
							href="#!"
							onClick={previousPage}
							className={currentPage > 1 ? style.a : style.buttonDisabled}
						>
							<BiSolidChevronsLeft />
						</a>
					</li>
					<li className={style.li}>
						<a href="#!" className={style.a}>
							{currentPage} / {totalPages}
						</a>
					</li>
					<li key="next" className={style.li}>
						<a
							href="#!"
							onClick={nextPage}
							className={
								currentPage !== totalPages ? style.a : style.buttonDisabled
							}
						>
							<BiSolidChevronsRight />
						</a>
					</li>
				</ul>
			</div>
		</>
	);
}
