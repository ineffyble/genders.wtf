const rss = require("@11ty/eleventy-plugin-rss");
const dedent = require("dedent");
const { escape } = require("nunjucks").lib;

exports.data = {
  permalink: "feed.xml",
  layout: null,
  eleventyExcludeFromCollections: true,
}

const metadata = {
  title: "Genders.WTF",
  language: "en",
  url: "https://genders.wtf/",
  author: {
    name: "Effy",
    url: "https://effy.space",
  },
}

exports.render = async function ({ permalink, collections }) {
  return dedent`
    <?xml version="1.0" encoding="utf-8" ?>
    <feed xmlns="http://www.w3.org/2005/Atom" xml:base="${metadata.url}">
      <title>${metadata.title}</title>
      <link href="${permalink || rss.absoluteUrl(metadata.url)}" rel="self"/>
      <link href="."/>
      <updated>${rss.dateToRfc3339(rss.getNewestCollectionItemDate(collections.genders))}</updated>
      <id>${metadata.url}</id>
      <author>
        <name>${metadata.author.name}</name>
        <uri>${metadata.author.url}</uri>
      </author>
      ${(await Promise.all([...collections.genders].reverse().map(async (page) => {
        const absolutePageUrl = rss.absoluteUrl(page.url, metadata.url)
        return dedent`
          <entry>
            <title>${page.data.name}</title>
            <link href="${absolutePageUrl}"/>
            <updated>${rss.dateToRfc3339(page.date)}</updated>
            <id>${absolutePageUrl}</id>
            ${page.data.tags.filter(tag => tag !== "genders").map(tag => `<category term="${tag}"/>`).join("\n")}
            <content xml:lang="${metadata.language}" type="html">
              <![CDATA[
              ${await rss.convertHtmlToAbsoluteUrls(
                await this.image(page.fileSlug, escape(page.data.alt), "100vw"),
                absolutePageUrl
              )}
              ]]>
            </content>
          </entry>
        `;
      }))).join("\n")}
    </feed>
  `;
}
