const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";
const HTML_SELECTOR = ".plainlist ul li";

axios
  .get(URL)
  .then(response => {
    const $ = cheerio.load(response.data);
    const data = $(HTML_SELECTOR);
    
    const countries = [];
    data.each((idx, element) => {
      countries.push({
        country: $(element).children("a").text(),
        iso3: $(element).children("span").text(),
      });
    });
    fs.writeFileSync("./countries.json", JSON.stringify(countries, null, 2));
    console.log(countries);
  })
