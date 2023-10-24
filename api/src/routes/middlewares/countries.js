const { Router } = require("express");
const router = Router();
const { chargeAndGetCountries } = require("../controllers/countries");

router.get("", async (req, res, next) => {
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
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const countries = await chargeAndGetCountries();
		if (id) {
			const countryId = await countries.filter((e) =>
				e.id.toUpperCase().includes(id.toUpperCase())
			);
			countryId.length
				? res.json(countryId)
				: res.status(404).send("Country not found");
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
