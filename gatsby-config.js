require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const striptags = require("striptags");

// gatsby-config.js
const blogQuery = `  {
  allMarkdownRemark {
    nodes {
      objectID: id
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
      html
    }
  }
}`;

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) => {
      // 1. Break each post into an array of searchable text chunks.
      // 2. return a flattened array of all indices
      return data.allMarkdownRemark.nodes.reduce((indices, post) => {
        // 1. description (if it exists)
        // 2. Each paragraph

        const pChunks = striptags(post.html, [], "XXX_SPLIT_HERE_XXX").split(
          "XXX_SPLIT_HERE_XXX"
        );

        const chunks = pChunks.map((chnk) => ({
          slug: post.fields.slug,
          title: post.frontmatter.title,
          image: post.frontmatter.featuredimage,
          excerpt: chnk,
        }));

        if (post.frontmatter.description) {
          chunks.push({
            slug: post.fields.slug,
            title: post.frontmatter.title,
            excerpt: post.frontmatter.description,
            image: post.frontmatter.featuredimage,
          });
        }

        const filtered = chunks.filter((chnk) => !!chnk.excerpt);

        return [...indices, ...filtered];
      }, []);
    },
  },
];

module.exports = {
  siteMetadata: {
    title: "GermiNación",
    description:
      "Se trata aquí de enumerar una serie de afecciones comunes, cuya resolución puede ser acompañada del uso de plantas para la salud.",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        // Accepts all options defined by `gatsby-plugin-postcss` plugin.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        //develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ["/ignored.css", "react-awesome-slider/"], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
