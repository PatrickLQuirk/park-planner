import {
    Flex,
    Container,
    SimpleGrid,
    Stack,
    Heading,
    Text,
    Link,
    IconButton
  } from "@chakra-ui/react";
  import {
    FaTwitter,
    FaFacebookF,
    FaInstagram,
    FaLinkedin
  } from "react-icons/fa";
  
  const Footer = () => (
    <Flex pt="4rem" pb="4rem" backgroundColor="twitter.900">
      <Container maxW={["sm", "4xl"]}>
        <SimpleGrid
          columns={[1, 3]}
          spacingX={10}
          spacingY={{ base: "2rem", md: 0 }}
        >
          <Stack spacing={2}>
            <Heading as="h3" color="white" size="md" textAlign="center">
              LOCATION
            </Heading>
            <Text textAlign="center" color="white">
              2215 John Daniel Drive Clark, MO 65243
            </Text>
          </Stack>
          <Stack spacing={2}>
            <Heading color="white" textAlign="center" size="md">
              SOCIAL MEDIA
            </Heading>
            <SimpleGrid columns={4} spacingX={1} spacingY={1}>
              <IconButton
                aria-label="icon"
                icon={<FaTwitter />}
                size="md"
                colorScheme="telegram"
                isRound
                w={12}
                h={12}
              />
              <IconButton
                colorScheme="telegram"
                aria-label="icon"
                icon={<FaFacebookF />}
                size="md"
                isRound
                w={12}
                h={12}
              />
              <IconButton
                colorScheme="telegram"
                aria-label="icon"
                icon={<FaInstagram />}
                size="md"
                isRound
                w={12}
                h={12}
              />
              <IconButton
                colorScheme="telegram"
                aria-label="icon"
                icon={<FaLinkedin />}
                size="md"
                isRound
                w={12}
                h={12}
              />
            </SimpleGrid>
          </Stack>
          <Stack spacing={2}>
            <Heading size="md" textAlign="center" color="white">
              ABOUT THIS
            </Heading>
            <Text color="white" textAlign="center">
              Based on bootstrap freelancer theme.{" "}
              <Link
                textAlign="center"
                color="blue.200"
                href="https://startbootstrap.com/previews/freelancer"
                target="_blank"
              >
                Go to Freelancer theme
              </Link>
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Flex>
  );
  
  export default Footer;
  