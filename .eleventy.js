const fs = require("fs");
const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(slug, alt, sizes, classes) {
  const images = fs.readdirSync('img/');
  let src = `img/${images.find(i => i.startsWith(slug))}`;
  let metadata = await Image(src, {
    widths: [300, 600, 1200, 1800],
    formats: ["avif", "jpeg"],
    outputDir: "./_site/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  if (classes) {
    imageAttributes.classes = classes;
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("debug", thing => console.log(thing));
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addPassthroughCopy("fonts/*");
  eleventyConfig.addFilter('log', value => {
    console.log(value)
  });
};
