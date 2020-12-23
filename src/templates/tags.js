import React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map((post) => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className="text-xl text-center text-green-500">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} planta${
      totalCount === 1 ? "" : "s"
    } con la virtud de ser “${tag}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container max-w-6xl mx-auto content">
            <div className="columns">
              <div
                className="p-6 mt-6 bg-white shadow-lg column is-10 is-offset-1"
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="text-3xl text-center text-gray-900 ">
                  {tagHeader}
                </h3>
                <ul className="grid gap-3 pt-12 md:grid-cols-3 taglist">
                  {postLinks}
                </ul>
                <p className="mt-12 text-xl text-center text-green-500 underline capitalize">
                  <Link to="/tags/">Ver todas las virtudes</Link>
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
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
