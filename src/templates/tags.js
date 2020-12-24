import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Img from "gatsby-image";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map((post) => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <Img
            className="object-contain w-full h-64 transition-all duration-150 transform "
            fluid={post.node.frontmatter.featuredimage.childImageSharp.fluid}
            alt={post.node.frontmatter.title}
          />
          <h2 className="text-3xl font-bold text-left text-green-500">
            {post.node.frontmatter.title}
          </h2>
        </Link>
        <p className="mb-3 text-lg text-left text-gray-600">
          {post.node.excerpt}
        </p>
        <Link className="px-6 py-2 mt-6 font-sans text-base font-bold text-white uppercase bg-green-800 rounded-md" to={post.node.fields.slug}>
          Seguir leyendo →
        </Link>
      </li>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} planta${
      totalCount === 1 ? "" : "s"
    } con la virtud de ser “${tag}${totalCount === 1 ? "" : "s"}”`;

    return (
      <Layout>
        <section className="min-h-screen bg-green-900 section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="max-w-5xl mx-auto content">
            <div className="columns">
              <div
                className="p-6 mt-6 bg-white shadow-lg "
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="text-3xl text-center text-gray-900 ">
                  {tagHeader}
                </h3>
                <ul className="grid gap-3 pt-12 md:grid-cols-2 lg:grid-cols-4 taglist">
                  {postLinks}
                </ul>
                <p className="py-12 mt-12 text-xl text-center ">
                  <Link
                    className="px-6 py-2 font-mono text-xl text-white bg-green-500 rounded-md"
                    to="/tags/"
                  >
                    Ver todas las virtudes
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(format: PLAIN, truncate: true, pruneLength: 60)

          frontmatter {
            title
            templateKey
            description
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
