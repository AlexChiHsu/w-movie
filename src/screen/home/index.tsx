import { styled } from "styled-components";
import tw from "twin.macro";
import MovieList from "../movieList";
import { lists } from "../../components/common/list";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { fetchPopularMovieList } from "../../actions/movieListActions";
import {
  fetchPopularTVListUs,
  fetchPopularTVListKr,
  fetchPopularTVListZh,
  fetchPopularTVAnimationList,
} from "../../actions/tvListsActions";
import Footer from "./footer";
import HomeHeader from "./homeHeader";
import { useNavigate } from "react-router-dom";

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    items-center
    overflow-auto
  `}
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  overflow: auto;
`;

const MovieContainer = styled.div`
  ${tw`
    w-full
    h-full
    relative
    -top-40
    z-10
  `}
`;

const TestButton = styled.button`
  ${tw`
    w-8
    h-8
    z-50
    m-1.5
  `}
`;

function HomeScreen() {
  const dispatch = useAppDispatch();
  const movieData = useAppSelector((state) => state.movieList.data);
  const { usData, zhData, krData, aniData } = useAppSelector(
    (state) => state.tvLists
  );
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(
      fetchPopularTVListUs({ language: "en", country: "US", page: "1" })
    );
    dispatch(
      fetchPopularTVListKr({ language: "ko", country: "KR", page: "1" })
    );
    dispatch(
      fetchPopularTVListZh({ language: "zh", country: "CN", page: "1" })
    );
    dispatch(fetchPopularTVAnimationList());
    dispatch(fetchPopularMovieList({ language: "zh-TW", page: "1" }));
  }, [dispatch]);

  const data = (title: string) => {
    switch (title) {
      case "us":
        return usData;
      case "kr":
        return krData;
      case "ch":
        return zhData;
      case "ani":
        return aniData;
      default:
        return movieData;
    }
  };

  return (
    <>
      <HomeContainer>
        <HomeHeader />
        <MovieContainer>
          {lists.map((item, index) => (
            <MovieList
              listTitle={item.title}
              data={data(item.title)}
              isShowBg={index % 2 !== 1}
              isDetail={false}
            />
          ))}
          <TestButton onClick={() => navigation(`/test`)} />
          <Footer />
        </MovieContainer>
      </HomeContainer>
    </>
  );
}

export default HomeScreen;
