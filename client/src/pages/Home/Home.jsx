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
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(8);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <NavBar setCurrentPage={setCurrentPage} />
      </div>
      <div className={style.container}>
        <div className={style.filtersAndPagination}>
          <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
          <Pagination
            key={1}
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            pagination={pagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <Container
          setCurrentPage={setCurrentPage}
          currentCountries={currentCountries}
        />
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
}


