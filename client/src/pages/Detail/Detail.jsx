import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, cleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";
import { FiArrowLeft } from "react-icons/fi";

export default function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
		return () => {
			dispatch(cleanDetail());
		};
	}, [dispatch, id]);

	const country = useSelector((state) => state.detail);

	return (
		<>
			<div className={style.container}>
				<Link to="/" className={style.back}>
					<FiArrowLeft />
				</Link>
				{country.length > 0 ? (
					<div className={style.detail}>
						<h3 className={style.h3}>{country[0].name}</h3>
						<p className={style.p}>ID: {country[0].id}</p>
						<img src={country[0].flag} alt="Not found" className={style.img} />
						<h5 className={style.h5}>
							Capital:{" "}
							{country[0].capital ? country[0].capital : "Not available"}
						</h5>
						<p className={style.p}>Region: {country[0].region}</p>
						<p className={style.p}>
							Sub-Region:{" "}
							{country[0].subregion ? country[0].subregion : "Not available"}
						</p>
						<p className={style.p}>
							Area: {country[0].area?.toLocaleString()} km²
						</p>
						<p className={style.p}>
							Population: {country[0].population?.toLocaleString()} inhabitants
						</p>
						<h5 className={style.h5}>Touristic activities: </h5>
						{country[0].activities.length > 0 ? (
							country[0].activities.map((a, index) => {
								return (
									<div key={index}>
										<h5 className={style.h5}>
											{a.name.charAt(0).toUpperCase() +
												a.name.slice(1).toLowerCase()}
										</h5>
										<p className={style.p}>Difficulty: {a.difficulty}</p>
										<p className={style.p}>Duration: {a.duration} hrs.</p>
										<p className={style.p}>
											Season:{" "}
											{a.season.charAt(0).toUpperCase() +
												a.season.slice(1).toLowerCase()}
										</p>
									</div>
								);
							})
						) : (
							<p className={style.p}>
								It doesn't exists touristic activities yet.
							</p>
						)}
					</div>
				) : (
					<p className={style.notavailable}>Information not available</p>
				)}
			</div>
		</>
	);
}
