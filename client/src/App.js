import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Detail from "../src/pages/Detail/Detail";
import Form from "../src/pages/Form/Form";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import axios from "axios";

axios.defaults.baseURL =
	"https://tothemoonandback-production.up.railway.app/" ||
	"http://localhost:3001";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/countries/:id" component={Detail} />
					<Route exact path="/activity" component={Form} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
