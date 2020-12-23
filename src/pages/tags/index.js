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
    <section className="min-h-screen bg-green-50 section">
      <Helmet title={`Tags | ${title}`} />
      <div className="container max-w-6xl mx-auto content">
        <div className="columns">
          <div
            className="p-6 mt-6 bg-white shadow-lg column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="mb-6 text-3xl">Virtudes</h1>
            <ul className="grid grid-cols-4 gap-3 taglist">
              {group.map((tag) => (
                <li key={tag.fieldValue} >
                  <Link className="text-xl text-green-500 capitalize hover:underline" to={`/tags/${kebabCase(tag.fieldValue)}/`}>
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
