const fs = require('fs'); //
const path = require('path'); //

function getCityCodes() {
    const rawData = fs.readFileSync(//read raw file as text
        path.join(__dirname, '../data/cities.json'),
        'utf8' //using c=this char encoder
    );
    const cities = JSON.parse(rawData);//turn text to js object
    const cityCodes = cities.List.map(city => city.CityCode);//get only the city code from lits
    return cityCodes; //return array of city codes
}

module.exports = { getCityCodes};