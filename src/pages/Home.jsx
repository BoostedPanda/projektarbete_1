import React from "react";
import { Link } from "react-router-dom";

import { HeaderTitle } from "../components/extras";
import { Card, Image, createStyles, Button } from "@mantine/core";
import ActiveCard from "../components/ActiveCard";


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
    top: "10%",
    color: "white"
  },
  cardPosition: {
    marginTop: "10%"
  }
}))

function Home() {
  const { classes } = useStyles();
  return (
    <Card shadow="sm" padding="lg" sx={classes.cardPosition}>
      <Card.Section>
        <HeaderTitle size={1} sx={classes.textOverlay}>
          Projekt Arbete PogU
        </HeaderTitle>
        <Image src={headerImages[Math.floor(Math.random() * (headerImages.length - 0) + 0)]} height={160} />
      </Card.Section>

      <ActiveCard/>

      <Button component={Link} to="/addcard" variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Add new card
      </Button>
    </Card>
  );
}

export default Home;
