import React from "react";
import { styled } from "styled-components";
import tw from "twin.macro";
import LogoWithText from "./components/logoWithText";
import RightList from "./components/rightList";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../common/screen";

const WebHeaderContainer = styled.div`
  ${tw`
    w-full
    h-14
    flex
    flex-row
    items-center
    justify-between
    text-white
    absolute
    top-0
    left-0
    xl:pr-10
    xl:pl-10
    lg:pl-6
    lg:pr-6
    sm:pl-4
    sm:pr-4
    z-50
  `}
  background-color: #1B1E25AD;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.48);
`;

interface WebHeaderProp {
  isSelected: string;
  setIsSelected: Function;
  openLogin: boolean;
  setOpenLogin: Function;
  searchWord: string;
  setSearchWord: Function;
}
function WebHeader(props: WebHeaderProp) {
  const {
    isSelected,
    setIsSelected,
    setOpenLogin,
    openLogin,
    searchWord,
    setSearchWord,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  return (
    <WebHeaderContainer>
      <LogoWithText
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      {!isMobile && (
        <RightList
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
        />
      )}
    </WebHeaderContainer>
  );
}

export default WebHeader;
