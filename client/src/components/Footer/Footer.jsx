import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
	return (
		<>
			<div className={style.footer}>
				<p>
					© 2022 - Powered by{" "}
					<a
						href="https://www.linkedin.com/in/juligon13/"
						target="_blank"
						rel="noreferrer"
						className={style.a}
					>
						Juligon
					</a>
				</p>
			</div>
		</>
	);
}
