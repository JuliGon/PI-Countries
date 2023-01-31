const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../../db");

router.get("", async (req, res) => {
	const { name } = req.query;
	try {
		const activities = await Activity.findAll();
		if (name) {
			const activity = await activities.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase())
			);
			activity.length
				? res.json(activity)
				: res.status(404).send("Country not found");
		} else {
			res.json(activities);
		};
	} catch (errors) {
		res.status(404).send("Something went wrong");
	}
});

router.delete("", async (req, res) => {
	const { id } = req.query;
	const activity = await Activity.findByPk(id);
	try {
		const deletedActivity = await Activity.destroy({
			where: { id: id },
		});
		res.send("done");
	} catch (error) {
		res.status(404).send(error);
	}
});

router.put("", async (req, res) => {
	const { name, difficulty, duration, season, countries, id } = req.body;

	try {
		const activity = await Activity.findByPk(id);

		await activity.update({
			name,
			difficulty,
			duration,
			season,
		});

		await activity.setCountries(countries);

		const updatedActivity = await Activity.findOne({
			where: { name: name },
			include: {
				model: Country,
				through: {
					attributes: [],
				},
			},
		});

		res.send(updatedActivity);
	} catch (error) {
		res.status(404).send(error);
	}
});


module.exports = router;
