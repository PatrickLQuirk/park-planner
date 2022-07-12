import { Stack, Container, Image, Heading } from "@chakra-ui/react";
import ReactImage from "../reactImage.svg";

const Hero = () => (
  <Stack
    spacing={2}
    backgroundColor="teal.400"
    pt={12}
    pb={12}
    border={0}
    alignItems="center"
    justifyContent="center"
  >
    <Container
      display="block"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxW={["sm", "4xl"]}
    >
      <Stack spacing={12} alignItems="center">
        <Image height="sm" src={ReactImage} />
        <Stack spacing={2} alignItems="center">
          <Heading size="2xl" color="white" textAlign="center">
            Park Planner
          </Heading>
          <Heading as="h2" size="md" color="white">
            Plan your trip ahead so you're not lost in the wilderness without your itinerary. 
          </Heading>
        </Stack>
      </Stack>
    </Container>
  </Stack>
);

export default Hero;