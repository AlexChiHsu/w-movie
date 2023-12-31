import styled from "styled-components";
import tw from "twin.macro";

export const MovieContainer = styled.div`
  ${tw`
    w-full
    h-auto
    overflow-auto
  `}
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  overflow: auto;
`;

export const DivContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;
