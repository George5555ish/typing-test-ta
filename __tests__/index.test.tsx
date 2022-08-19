import renderer from "react-test-renderer";
import Header from "../components/Header";
import SingleWordFragment from "../components/TestBlock/components/TypingContainer/fragments/SingleWordFragment";
import { DESKTOP_SCREEN_WIDTH } from "../constants";
it("renders header component correctly", () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders dynamically rendered word fragment correctly", () => {
  const tree = renderer
    .create(
      <SingleWordFragment
        key={0}
        word={""}
        isCurrentWordInTypedWords={undefined}
        widthFromWindow={DESKTOP_SCREEN_WIDTH}
        isCurrentTypedWordIncorrect={false}
        currentWordObject={{
          word: "",
          currentDiv: 0,
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
