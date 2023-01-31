const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../../db");
const { Op } = require("sequelize");

router.post("", async (req, res) => {
	const { name, difficulty, duration, season, countries } = req.body;

	try {
		const activity = await Activity.findOne({
			where: { name: { [Op.iLike]: `%${name}%` } }, //Op.iLike no distingue en mayúsculas y minúsculas
		});

		if (!activity) {
			const newActivity = await Activity.create(req.body);
			if (countries.length) {
				countries.forEach(async (e) => {
					const country = await Country.findByPk(e);
					newActivity.addCountry(country);
				});
				res.send("Activity successfully created");
			}
		} else {
			return res.status(404).send("Activity already exist");
		}
	} catch (error) {
		res.status(404).send("Something went wrong!");
	}
});

module.exports = router;
