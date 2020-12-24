import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <div
      className="flex flex-col items-center justify-center w-full p-8 py-32 text-left border-b-2 border-green-400"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
        backgroundSize: `contain`,
      }}
    >
      <div className="max-w-5xl">
        <h1 className="font-serif text-6xl font-bold text-green-500 ">
          {title}
        </h1>
        <h3 className="mt-2 font-serif text-4xl">{subheading}</h3>
        <div className="tile">
          <h4 className="hidden py-12 text-3xl text-left">{mainpitch.title}</h4>
        </div>
        <div className="mt-6 tile">
          <p className="max-w-xl py-2 mx-auto text-xl text-left">
            Se trata aquí de enumerar una serie de afecciones comunes, cuya
            resolución puede ser acompañada del uso de plantas para la salud.
            Una vez más vale la pena aclarar que se trata de un enfoque
            alopático en el medio doméstico, para resolver situaciones simples
            que no requieren de mayores y más complejos recursos.
          </p>
          <p className="max-w-xl py-2 mx-auto text-xl text-left">
            Las plantas mencionadas son las cosmopolitas y nativas de esta
            región norpatagónica, y excluye otras que no se encuentran
            habitualmente en esta zona o que -si bien se consiguen en
            herbosterías- tienen su origen en otras latitudes.
          </p>
          <p className="max-w-xl py-2 mx-auto text-xl text-left">
            Nuestra experiencia muestra que en cada región, en cada nicho
            ecológico, hay especies para ayudar a todos nuestros problemas de
            salud, y no es imprescindible “importar” plantas de otros
            ecosistemas.
          </p>
        </div>
      </div>
    </div>
    <section className="w-full px-3 mx-auto bg-green-700">
      <div className="container max-w-6xl mx-auto">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="max-w-6xl mx-auto content">
                <div className="pb-24 column is-12">
                  <h3 className="flex flex-col items-baseline pt-24 pb-0 text-5xl font-thin text-left text-green-100 md:flex-row">
                    Guía de plantas{" "}
                    <small className="font-mono text-xl text-white md:pl-6">
                      (región norpatagónica)
                    </small>
                  </h3>
                  <BlogRoll />
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
