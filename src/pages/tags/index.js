import React from 'react'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="min-h-screen bg-green-900 section">
      <Helmet title={`Virtudes | ${title}`} />
      <div className="container max-w-6xl mx-auto content">
        <div className="columns">
          <div
            className="p-16 bg-white shadow-lg"
          >
            <h1 className="mb-6 text-6xl">Virtudes</h1>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 taglist">
              {group.map((tag) => (
                <li key={tag.fieldValue} >
                  <Link className="py-4 text-2xl text-green-800 capitalize hover:underline" to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
