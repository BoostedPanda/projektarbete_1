import { useDispatch } from "react-redux";
import { removeUser, handleActive } from "../redux/userSlice"
import { Box, createStyles, Modal, Button, SimpleGrid, Container, Text } from "@mantine/core";
import { CheckIcon, TrashIcon, XCircleFillIcon, CheckCircleFillIcon } from "@primer/octicons-react";
import { CreditCard } from "./extras";
import { useState } from "react";
import { useNotifications } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  cardSection: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
    }
  }
}))

const RenderCard = ({ card }) => {
  const dispatch = useDispatch()
  const { classes } = useStyles();
  const notifications = useNotifications();
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);

  const handleRemoveCard = (creditCard) => {
    if (!creditCard.cardStateActive) {
      notifications.showNotification({
        color: "green",
        icon: <CheckCircleFillIcon />,
        title: 'Yay!',
        message: 'Your card has been removed!',
      })
      setOpened(false)
      return dispatch(removeUser(creditCard.cardNumber))
    }

    return notifications.showNotification({
      color: "red",
      icon: <XCircleFillIcon />,
      title: 'Oh no!',
      message: 'You can\'t remove an active card!',
    })
  }

  const handleActivateCard = (creditCard) => {
    if (!creditCard.cardStateActive) {
      notifications.showNotification({
        color: "green",
        icon: <CheckCircleFillIcon />,
        title: 'Yay!',
        message: 'Your card is now active!',
      })
      setOpened(false)
      return dispatch(handleActive(creditCard.cardNumber))
    }

    return notifications.showNotification({
      color: "red",
      icon: <XCircleFillIcon />,
      title: 'Oh no!',
      message: 'Card is already active!',
    })
  }

  return (
    <div>
      <Modal centered opened={opened} onClose={() => setOpened(false)} title="Manage Credit Card">
        <Container sx={() => ({ paddingBottom: 20 })}>
          <Text>Name: {selectedCard?.cardName}</Text>
          <Text>Number: {selectedCard?.cardNumber.match(/.{4}/g).join(' ')}</Text>
          <Text>Expire: {`${selectedCard?.cardMonth}/${selectedCard?.cardYear}`}</Text>
          <Text>CCV: {selectedCard?.ccv}</Text>
          <Text>Active: {selectedCard?.cardStateActive ? 'YES' : 'NO'}</Text>
        </Container>
        <SimpleGrid cols={2}>
          <Button leftIcon={<CheckIcon size={14} />} onClick={() => handleActivateCard(selectedCard)}>
            Set as active
          </Button>

          <Button color="red" leftIcon={<TrashIcon size={14} />} onClick={() => handleRemoveCard(selectedCard)}>
            Delete card
          </Button>
        </SimpleGrid>
      </Modal>

      {card.map((creditCard, i) => {
        return (
          <Box sx={classes.cardSection} onClick={() => { setOpened(true); setSelectedCard(creditCard) }} key={i} >
            <CreditCard
              bankName='Peepo Bank'
              cardHolder={creditCard.cardName}
              cardNumber={creditCard.cardNumber}
              issuer={creditCard.bankName}
              cardExpire={`${creditCard.cardMonth}/${creditCard.cardYear}`}
              theme={creditCard.cardType}
            />
          </Box>
        );
      })}
    </div>
  );
};

export default RenderCard;
