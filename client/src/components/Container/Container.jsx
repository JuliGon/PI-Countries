import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries, getActivities } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Container.module.css";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

export default function Container({ currentCountries, setCurrentPage }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());
		dispatch(getActivities());
	}, [dispatch]);

	return (
		<>
			<div className={style.cards}>
				{currentCountries.length > 0 ? (
					currentCountries.map((e, index) => {
						return (
							<Link to={`countries/${e.id}`} key={index} className={style.link}>
								<Card
									key={e.id}
									name={e.name}
									region={e.region}
									flag={e.flag}
								/>
							</Link>
						);
					})
				) : (
					<div>
						<Loader />
					</div>
				)}
			</div>
		</>
	);
}
