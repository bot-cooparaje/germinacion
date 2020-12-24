// import styled from "@emotion/styled"
// import algoliasearch from "algoliasearch/lite"
// import { Link } from "gatsby"
// import lottie from "lottie-web"
// import React from "react"

import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";
import { Highlight } from "react-instantsearch-dom";
//import Fade from "react-reveal/Fade"
import tw from "twin.macro";

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
      <Image>
        <Link to={hit.slug}>
          <img
            className="object-cover w-full h-auto"
            alt={hit.title}
            src={`https://raw.githubusercontent.com/cooparaje/germinacion/master/static/img/${hit.image}`}
          />
        </Link>
      </Image>
    </SearchItem>
  );
};

export default PostPreview;

const SearchItem = styled.div`
  ${tw`relative flex flex-col-reverse py-3 pl-6 pr-3 overflow-hidden text-gray-900 bg-white md:flex-row`}
  min-height: 150px;

  a {
    ${tw`font-sans text-xl font-bold text-gray-900`}
  }

  p {
    ${tw`font-sans text-xl`}
  }
`;

const Image = styled.div`
  ${tw`bottom-0 right-0 z-50 w-56 md:absolute`}

  ${tw`opacity-75`}
  body.dark & {
  }
`;

const Content = styled.div`
  ${tw`relative z-20 w-full p-2 px-3 pr-2 md:pr-56`}
  flex: 1
`;
