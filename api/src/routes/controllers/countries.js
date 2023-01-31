const { Country, Activity } = require("../../db");
require("dotenv").config();
const axios = require("axios");

const getCountries = async () => {
	try {
		const apiUrl = await axios.get("https://restcountries.com/v3/all");
		const countries = apiUrl.data?.map((e) => {
			return {
				id: e.cca3,
				name: e.name.common,
				flag: e.flags[1],
				region: e.region,
				capital: e.capital ? e.capital[0] : "Not available",
                subregion: e.subregion ? e.subregion : "Not available",
                area: e.area,
                population: e.population,
			};
        });
        return countries;
    } catch (error) {
        console.log(error);
    }
};

const chargeAndGetCountries = async () => {
    try {
        const dbCountries = await Country.findAll({ include: Activity });
        if (!dbCountries.length) {
            const country = await getCountries();
            return await Country.bulkCreate(country);
        } else {
            return dbCountries;
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    chargeAndGetCountries
};