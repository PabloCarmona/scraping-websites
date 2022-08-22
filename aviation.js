const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://aerocorner.com/blog/newest-commercial-airplanes/";

axios.get(URL).then(async (res) => {
  const names = [];
  let imgs = [];
  const $ = cheerio.load(res.data);
  
  const titles = $("#post-18216 .entry-content h2");
  titles.each((idx, element) => {
    let name = $(element).text();
    const firstIdx = name.indexOf(" ");
    name = name.slice(firstIdx).trim();
    names.push(name);
  });

  const images = $("#post-18216 .entry-content .wp-block-image");
  images.each((idx, image) => {
    const img = $(image).children("img").attr("data-lazy-src");
    imgs.push(img);
  });

  imgs = imgs.map(img => img.split("/")).filter(img => img[img.length - 1] !== "Boeing-777X-model-730x139.jpg")
  

  const airplanes = names.map((name, idx) => ({ name, img: imgs[idx].join("/") }));
  fs.writeFileSync("./planes.json", JSON.stringify(airplanes, null, 2))
  console.log(airplanes)
});
