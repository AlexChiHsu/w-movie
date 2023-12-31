import MovieListCard from "../../components/common/card/movieListCard";
import { css, styled } from "styled-components";
import tw from "twin.macro";
import Icon from "../../components/common/icons/icon";
import { MovieListProp } from "../../types/movieList";
import { useEffect, useRef, useState } from "react";
import { useDevice } from "../../components/helper/media";

const MovieListContainer = styled.div<{
  isShowBg?: boolean;
  isDetail?: boolean;
}>`
  ${tw`
    overflow-hidden
    ml-10
    mr-10
    pl-[26px]
    pr-[26px]
    rounded-[20px]
    gap-3.5
    bg-[#686B721A]
    mt-5
    mb-5
    z-20
  `}

  ${({ isShowBg }) =>
    isShowBg &&
    css`
      background-color: transparent;
    `}
  
    ${({ isDetail }) =>
    isDetail &&
    tw`
      ml-0
      mr-0
    `}
`;

const ListContainer = styled.div`
  ${tw`
    w-full
    items-center
    flex
    flex-row
    justify-center
    overflow-hidden
    gap-3.5
    mb-10
  `}
`;

const IconBackground = styled.button`
  ${tw`
    h-[50px]
    flex
    items-center
    justify-center
    rounded-[13px]
    pr-0.5
    bg-[#686B721A]
  `}
`;

const ScrollContainer = styled.div`
  ${tw`
    w-full
    overflow-hidden
    box-border
    h-[200px]
    flex
    items-center
    mr-2.5
    ml-2.5
  `}
`;

const ScrollList = styled.div`
  ${tw`
    flex
    items-center
    h-[200px]
    scroll-smooth
    overflow-x-scroll
    overflow-y-hidden
    whitespace-nowrap
    pt-2.5
    pb-2.5
    pr-2.5
    pl-2.5
  `}
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  overflow: auto;
`;

const ListTitle = styled.div`
  ${tw`
    w-full
    text-white
    font-normal
    text-xl
    text-start
    truncate
    items-start
    leading-[30px]
    mt-10
    mb-3.5
    pl-2.5
    ml-[63px]
    pointer-events-none
  `}
`;

interface IMovieListProp {
  listTitle: string;
  data: MovieListProp;
  isShowBg: boolean;
  isDetail?: boolean;
}

export default function MovieList(props: IMovieListProp) {
  const { listTitle, data, isShowBg, isDetail } = props;
  const scroll = useRef<null | HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [title, setTitle] = useState("");
  const [endOfLeft, setEndOfLeft] = useState(scroll.current?.scrollLeft);
  const device = useDevice(window.innerWidth);

  const onRightClick = () => {
    if (scroll.current?.offsetWidth !== undefined) {
      let value = scroll.current?.offsetWidth;
      setLeft((v) => v + value);
    }
  };

  const onLeftClick = () => {
    if (scroll.current?.offsetWidth !== undefined) {
      let value = scroll.current?.offsetWidth;
      setLeft((v) => v - value);
    }
  };

  useEffect(() => {
    scroll?.current?.scrollTo({
      left: left,
    });
    if (left < 0) {
      setLeft(0);
    }

    if (
      scroll.current?.scrollWidth !== undefined &&
      scroll.current?.scrollWidth - scroll.current?.clientWidth <=
        scroll.current.scrollLeft + 1
    ) {
      setEndOfLeft(scroll.current.scrollLeft);
    }

    if (endOfLeft !== 0 && endOfLeft !== undefined && left > endOfLeft) {
      setLeft(endOfLeft);
    }

    switch (listTitle) {
      case "movie":
        setTitle("熱門電影");
        break;
      case "kr":
        setTitle("熱門韓劇");
        break;
      case "us":
        setTitle("熱門美劇");
        break;
      case "ch":
        setTitle("熱門陸劇、台劇");
        break;
      case "ani":
        setTitle("熱門動畫");
        break;
    }
  }, [left, endOfLeft]);

  return (
    <MovieListContainer isShowBg={isShowBg} isDetail={isDetail}>
      <ListTitle>{title}</ListTitle>
      <ListContainer>
        {device === "pc" && (
          <IconBackground onClick={onLeftClick}>
            <Icon name={"arrowLeft"} fill="white" width={48} height={27} />
          </IconBackground>
        )}
        <ScrollContainer>
          <ScrollList ref={scroll}>
            {data?.results.map((item) => (
              <MovieListCard
                movie={item}
                type={title === "movie" ? "movie" : "tv"}
              />
            ))}
          </ScrollList>
        </ScrollContainer>
        {device === "pc" && (
          <IconBackground onClick={onRightClick}>
            <Icon name={"arrowRight"} fill="white" width={48} height={27} />
          </IconBackground>
        )}
      </ListContainer>
    </MovieListContainer>
  );
}
