const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require("../routes/middlewares/countries.js");
const activities = require("../routes/middlewares/activities.js");
const activity = require("../routes/middlewares/activity.js");
const { Country } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countries);
router.use("/activities", activities);
router.use("/activity", activity);

module.exports = router;
