// import styled from "@emotion/styled"
// import algoliasearch from "algoliasearch/lite"
// import { Link } from "gatsby"
// import lottie from "lottie-web"
// import React from "react"

import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"
import { Highlight } from "react-instantsearch-dom"
//import Fade from "react-reveal/Fade"
import tw from "twin.macro"

const PostPreview = ({ hit }) => {
  return (
      <SearchItem>
        <Content>
          <Link to={hit.slug}>
            <Highlight hit={hit} attribute="title" tagName="mark" />
          </Link>
          <p>
            <Highlight hit={hit} attribute="excerpt" tagName="mark" />
          </p>
        </Content>
      </SearchItem>
  )
}

export default PostPreview

const SearchItem = styled.div`
  ${tw`flex text-green-100 bg-green-800`}



  body.dark & {
    ${tw`text-green-100 bg-green-800`}
  }

  a {
    ${tw`font-sans text-xl font-bold text-green-200`}
  }

  p {
    ${tw`font-sans text-base`}
  }
`

const Image = styled.div`
  ${tw`w-32 `}

  ${tw`opacity-75`}
  body.dark & {
  }
`

const Content = styled.div`
  ${tw`w-full p-2 px-3`}
  flex: 1
`
