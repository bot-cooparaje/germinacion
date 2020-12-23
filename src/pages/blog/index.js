import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="block p-12 bg-gray-200">
          <h1 className="font-mono text-4xl text-center text-gray-900">
          Guia de plantas
          </h1>
        </div>
        <section className="max-w-6xl mx-auto section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
