import React from "react";
import style from "./Card.module.css";

export default function Card({ name, flag, region, id }) {
	return (
		<>
			<div key={id} className={style.card}>
				<h4 className={style.title}>{name}</h4>
				<p className={style.subtitle}>{region}</p>
				<img src={flag} alt="Not found" className={style.img} />
			</div>
		</>
	);
}
