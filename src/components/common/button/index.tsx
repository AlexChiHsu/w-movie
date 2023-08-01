import { styled } from "styled-components";
import tw from "twin.macro";
import Icon from "../icons/icon";

interface IButtonProps {
  text?: string;
  onClick: Function;
  isFill?: boolean;
  component?: JSX.Element;
}

const BaseButton = styled.button`
  ${tw`
    outline-none
    text-black
    text-xs
    font-semibold
    focus:outline-none
    transition-all
    duration-200
    ease-in-out
    justify-center
    items-center
    text-center
    pr-1
    pl-1
    pb-2
  `};

  &:focus {
    border-bottom-color: #2550bd;
    border-bottom-width: 2px;
  }
`;

const ListButton = styled(BaseButton)`
  ${tw`
    bg-transparent
    justify-center
    items-center
  `};
  &:hover {
    background-color: transparent;
    color: #5799c8;
  }
`;

const FillButton = styled(BaseButton)`
  ${tw`
    pt-1.5
    pb-1.5
    pr-2.5
    pl-2.5
    flex
    flex-row
    rounded
    bg-blue-700
    text-white
    justify-center
    items-center
    text-center
  `}
`;

export default function Button(props: IButtonProps) {
  const { text, onClick, isFill, component } = props;
  const handle = () => {
    onClick();
  };

  return (
    <>
      {isFill ? (
        <FillButton>
          {text && text}
          {component && component}
        </FillButton>
      ) : (
        <ListButton autoFocus={text === "清單"} onClick={handle}>
          {text && text}
          {component && component}
        </ListButton>
      )}
    </>
  );
}
