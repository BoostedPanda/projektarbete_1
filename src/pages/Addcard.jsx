import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Container, Input, InputWrapper, SegmentedControl, Button, Card, Image, createStyles, SimpleGrid } from "@mantine/core";
import { CreditCardIcon, PersonIcon, CalendarIcon, NoteIcon, XCircleFillIcon, CheckCircleFillIcon } from "@primer/octicons-react";
import { HeaderTitle, CreditCard } from "../components/extras";
import { Link } from "react-router-dom";
import { useNotifications } from '@mantine/notifications';

const headerImages = [
  "https://i.redd.it/5hox9ss0wdl51.jpg",
  "https://static-cdn.jtvnw.net/jtv_user_pictures/f09cc2ba-1703-4348-a094-dd950c657c6c-profile_banner-480.png",
  "https://www.streamscheme.com/wp-content/uploads/2020/04/emote-list-banner.jpg"
]

const useStyles = createStyles((theme) => ({
  textOverlay: {
    position: "absolute",
    zIndex: 1,
    left: "32%",
    top: "7%",
    color: "white"
  },
  cardPosition: {
    marginTop: "10%"
  },
  rowPadding: {
    paddingBottom: 8
  }
}))

function Addcard() {

  const dispatch = useDispatch();
  const { classes } = useStyles();
  const notifications = useNotifications();
  const { cardInformation } = useSelector((state) => state.userList);
  const [cardNumber, setCardNumber] = useState("#### #### #### ####")
  const [cardMonth, setCardMonth] = useState(12)
  const [cardYear, setCardYear] = useState(22)
  const [cardCcv, setCardCcv] = useState("123")
  const [cardIssuer, setCardIssuer] = useState("visa")
  const [cardType, setCardType] = useState("light")
  const [headerImageId, setHeaderImageId] = useState(0)

  if (cardInformation.length === 0) {
    window.location.href = window.location.origin;
  }

  useEffect(() => {
    setHeaderImageId(Math.floor(Math.random() * (headerImages.length - 0) + 0))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardExists = cardInformation.filter((value) => {
      return value.cardNumber === cardNumber;
    }).length > 0;

    if (cardExists) {
      return notifications.showNotification({
        color: "red",
        icon: <XCircleFillIcon />,
        title: 'Error!',
        message: 'A card with the same number already exists!',
      })
    }

    const card = {
      cardName: cardInformation[0].cardName,
      cardNumber: cardNumber,
      cardMonth: cardMonth,
      cardYear: cardYear,
      ccv: cardCcv,
      bankName: cardIssuer,
      cardType: cardType,
      cardStateActive: false,
    };

    if (cardInformation.length <= 3 && cardNumber.length === 16 && cardCcv.length === 3) {
      dispatch(addUser(card));

      const inputElements = document.getElementsByTagName('input');

      for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type === 'text' && !inputElements[i].readOnly) {
          inputElements[i].value = '';
        }
      }

      setCardNumber("#### #### #### ####")
      setCardMonth(12)
      setCardYear(22)
      setCardCcv("123")

      return notifications.showNotification({
        color: "green",
        icon: <CheckCircleFillIcon />,
        title: 'Yay!',
        message: 'Your card was added to your E-wallet!',
      })
    } else if (cardNumber.length < 16 || cardCcv.length < 3) {
      return notifications.showNotification({
        color: "red",
        icon: <XCircleFillIcon />,
        title: 'Error!',
        message: 'Credit card number/ccv is invalid!',
      })
    }

    return notifications.showNotification({
      color: "red",
      icon: <XCircleFillIcon />,
      title: 'Oh no!',
      message: 'Your E-wallet is full!',
    })
  };
  return (
    <Card shadow="sm" padding="lg" sx={classes.cardPosition}>
      <Card.Section>
        <HeaderTitle size={1} sx={classes.textOverlay}>
          Projekt Arbete PogU
        </HeaderTitle>
        <Image src={headerImages[headerImageId]} height={160} />
      </Card.Section>

      <Container sx={() => ({ marginBlock: 50, display: "flex", justifyContent: "center" })}>
        <CreditCard
          bankName='Peepo Bank'
          cardHolder={cardInformation[0].cardName}
          cardNumber={cardNumber}
          issuer={cardIssuer}
          cardExpire={`${cardMonth}/${cardYear}`}
          theme={cardType}
        />
      </Container>

      <form onSubmit={handleSubmit}>
        <Container>
          <InputWrapper label="Credit Card Number" description="Your credit card number" size="sm" sx={classes.rowPadding}>
            <Input maxLength={16} icon={<CreditCardIcon />} placeholder="Please enter your credit card number!" required onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
              e.target.value = value
              setCardNumber(value)
            }} />
          </InputWrapper>

          <InputWrapper label="Creditholder Name" description="Your full name" size="sm" sx={classes.rowPadding}>
            <Input icon={<PersonIcon />} defaultValue={cardInformation[0].cardName} readOnly />
          </InputWrapper>

          <SimpleGrid cols={2}>
            <InputWrapper label="Expire month" description="The month the credit card expires" size="sm" sx={classes.rowPadding}>
              <Input maxLength={2} icon={<CalendarIcon />} placeholder="12" required onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
                e.target.value = value
                setCardMonth(value)
              }} />
            </InputWrapper>

            <InputWrapper label="Expire year" description="The year the credit card expires" size="sm" sx={classes.rowPadding}>
              <Input maxLength={2} icon={<CalendarIcon />} placeholder="22" required onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
                e.target.value = value
                setCardYear(value)
              }} />
            </InputWrapper>
          </SimpleGrid>

          <InputWrapper label="Credit Card CCV Number" description="Your credit card CCV number" size="sm" sx={classes.rowPadding}>
            <Input maxLength={3} icon={<NoteIcon />} placeholder="Please enter your 3 digit CCV code!" required onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
              e.target.value = value
              setCardCcv(value)
            }} />
          </InputWrapper>

          <InputWrapper label="Credit Card Vendor" description="Your credit card Vendor" size="sm" sx={classes.rowPadding}>
            <SegmentedControl
              onChange={(e) => setCardIssuer(e)}
              data={[
                { label: 'Visa', value: 'visa' },
                { label: 'Mastercard', value: 'mastercard' },
                { label: 'American Express', value: 'american' },
              ]}
            />
          </InputWrapper>

          <InputWrapper label="Credit Card Type" description="Please select your desired card type" size="sm">
            <SegmentedControl
              onChange={(e) => setCardType(e)}
              data={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
              ]}
            />
          </InputWrapper>

          <SimpleGrid cols={2} sx={() => ({ marginTop: 20 })}>
            <Button type="submit" fullWidth>Add card</Button>
            <Button color="red" component={Link} to="/" fullWidth>Go back</Button>
          </SimpleGrid>
        </Container>
      </form>
    </Card>
  );
}

export default Addcard;
