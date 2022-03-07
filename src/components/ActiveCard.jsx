import { useSelector } from "react-redux";
import RenderCard from "./RenderCard";
import { Container, Center, Divider } from "@mantine/core";
import { HeaderTitle } from "./extras";

function ActiveCard() {
  const { cardInformation } = useSelector((state) => state.userList);

  const activeCard = cardInformation.filter((value) => {
    return value.cardStateActive === true;
  });

  const inactiveCards = cardInformation.filter((state) => {
    return state.cardStateActive !== true;
  });

  return (
    <Center>
      <Container>
        <HeaderTitle size={2} align="center" sx={(theme) => ({ paddingBlock: 20 })}>
          My E-Wallet
        </HeaderTitle>

        <RenderCard card={activeCard} />
        {inactiveCards.length !== 0 && (
          <>
            <Divider my="md" label="Inactive Cards" labelPosition="center"/>
            <RenderCard card={inactiveCards} />
          </>
        )}
      </Container>
    </Center>
  );
}

export default ActiveCard;
