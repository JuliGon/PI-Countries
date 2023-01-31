const { Router } = require("express");
const router = Router();
const { chargeAndGetCountries } = require("../controllers/countries");

router.get("", async (req, res) => {
	const { name } = req.query;
	try {
		const countries = await chargeAndGetCountries();
		if (name) {
		 	const country = await countries.filter((e) =>
		 		e.name.toLowerCase().includes(name.toLowerCase())
		 	);
		 	country.length
		 		? res.json(country)
		 		: res.status(404).send("Country not found");
		} else {
		 	res.json(countries);
		}
	} catch (error) {
		res.status(404).send("Something went wrong!");
	}
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
	try {
		const countries = await chargeAndGetCountries();
		if (id) {
			const countryId = await countries.filter((e) => e.id.toUpperCase().includes(id.toUpperCase())); 
			countryId.length
				? res.json(countryId)
				: res.status(404).send("Country not found");
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
