import { css, styled } from "styled-components";
import tw from "twin.macro";
import { imagePath } from "../../../components/helper/media";
import { useAppSelector } from "../../../app/hooks";
import LabelButton from "./labelButton";
import Text from "../../../components/common/text";
import AddListButton from "../../../components/common/button/addListButton";

const PosterContainer = styled.div`
  ${tw`
    w-full
    max-h-[470px]
    bg-[#686B721A]
    rounded-[20px]
    flex
    flex-row
    items-center
    pl-4
    pr-4
    pt-5
    pb-5
    mb-3
  `}
`;

const LeftContainer = styled.div`
  ${tw`
    h-[430px]
    w-[323px]
    bg-amber-100
    rounded-[20px]
    overflow-hidden
    mr-[35px]
  `}
  box-shadow: 0px 2px 8px 0px #0000007A;
`;

const Image = styled.button<{ path?: any }>`
  ${tw`
    w-full
    h-full
    bg-cover
    bg-no-repeat
    bg-center
  `}

  ${({ path }) =>
    css`
      background-image: url(${path});
    `}
`;

const RightContainer = styled.div`
  ${tw`
    h-[430px]
    w-full
    flex
    flex-col
  `}
`;

const RightHeader = styled.div`
  ${tw`
    flex
    flex-row
    justify-between
    items-center
    mb-3
  `}
`;
const DivContainer = styled.div`
  ${tw`
    flex
    flex-row
    items-center
    mb-3
  `}
`;

const DramaTitle = styled.h1`
  ${tw`
      text-white
      font-medium
      text-[38px]
      leading-[55px]
  `}
`;

const Rated = styled.h2`
  ${tw`
		text-[50px]
		leading-none
		font-bold
		bg-clip-text
		text-transparent
    ml-[18px]
	`}
  font-family: "Roboto";
  background-image: linear-gradient(91.47deg, #c10171 3.73%, #5c00f2 100%);
`;

interface IPorsterProp {
  type: string;
}

export default function Poster(props: IPorsterProp) {
  const { type } = props;
  const { detail, credits } = useAppSelector((state) => state.detail);
  const wishList = useAppSelector((state) => state.user.userWishList);
  const data = detail;
  const director = credits?.crew?.find(
    (item: any) => item.job === "Director" ?? item.job === "Writer"
  );

  const wishListId =
    wishList.find((i: { id: number }) => i.id === data?.id)?.id.toString() ??
    "0";

  return (
    <PosterContainer>
      <LeftContainer>
        <Image path={imagePath(data?.backdrop_path)} />
      </LeftContainer>
      <RightContainer>
        <RightHeader>
          <DivContainer>
            {data?.genres &&
              data?.genres?.map((item: { name: string }) => (
                <LabelButton name={item?.name} />
              ))}
          </DivContainer>
          <DivContainer>
            <AddListButton item={detail} type={type} wishListId={wishListId} />
          </DivContainer>
        </RightHeader>
        <DivContainer>
          <DramaTitle>{data.name ?? data.title}</DramaTitle>
          <Rated>{Math.round(data?.vote_average * 10) / 10}</Rated>
        </DivContainer>
        <DivContainer>
          <Text
            text={data?.release_date ?? data?.first_air_date}
            index={0}
          ></Text>
          {data?.spoken_languages[0]?.name && (
            <Text text={data?.spoken_languages[0]?.name} index={1}></Text>
          )}
          {data?.runtime && data?.episode_run_time && (
            <Text
              index={2}
              text={
                "0" +
                Math.floor((data?.runtime ?? data?.episode_run_time) / 60) +
                "時" +
                Math.floor((data?.runtime ?? data?.episode_run_time) % 60) +
                "分"
              }
            ></Text>
          )}
        </DivContainer>
        <DivContainer>
          <Text
            index={0}
            text={`${director?.job === "Writer" ? "創作者" : "導演"} ${
              director?.name
            }`}
          />
        </DivContainer>
        <DivContainer>
          <Text index={0} text={"劇情介紹"} />
        </DivContainer>
        <DivContainer>
          <Text index={-1} text={data?.overview} />
        </DivContainer>
        {/* <DivContainer>
          <Text index={0} text={"播放平台"} />
        </DivContainer>
        <DivContainer>
          <Button
            onClick={() => {}}
            component={<Icon name={"appletv"} width={36} height={36} />}
            isOpenBottomBar={false}
          />
        </DivContainer> */}
      </RightContainer>
    </PosterContainer>
  );
}
