import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
//import PreviewCompatibleImage from "./PreviewCompatibleImage";
import styled from "@emotion/styled";
import tw from "twin.macro";
import Img from "gatsby-image";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Container>
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
              <article
                className={`blog-list-item bg-white shadow-xl pb-3 ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                }`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <Link
                      to={post.fields.slug}
                      className="relative items-center justify-center block w-full h-64 overflow-hidden image"
                    >
                      <Img
                        className="object-cover w-full h-64 transition-all duration-150 transform "
                        fluid={
                          post.frontmatter.featuredimage.childImageSharp.fluid
                        }
                        alt={post.frontmatter.title}
                      />
                    </Link>
                  ) : null}
                  <p className="my-2 text-center post-meta">
                    <Link
                      className="font-sans text-xl font-black text-gray-800 hover:underline "
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                  </p>
                  <span className="hidden">{post.frontmatter.date}</span>
                </header>
                <p className="hidden mb-3 font-serif text-lg font-bold prose">
                  {post.frontmatter.description}
                  <Link className="button" to={post.fields.slug}>
                    Seguir leyendo →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </Container>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 80)

              id
              fields {
                slug
              }
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);

const Container = styled.div`
  ${tw`grid grid-cols-2 gap-6 my-12 sm:grid-cols-4 md:grid-cols-5 `}

     

  .gatsby-image-wrapper {
    ${tw`relative h-full transition-all duration-500 ease-in-out transform bg-red-500`} 
  }


  .blog-list-item:hover {
    .gatsby-image-wrapper {
      transform: scale(1.05);
    }
  }
`;
