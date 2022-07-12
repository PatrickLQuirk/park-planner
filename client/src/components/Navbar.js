import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  import {
    Flex,
    Container,
    Link,
    Stack,
    Box,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton
  } from "@chakra-ui/react";
  
  const NavigationMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Flex
        backgroundColor="blue.800"
        justifyContent="space-between"
        alignItems="center"
        pt=".5rem"
        pb=".5rem"
        position="sticky"
        top="0"
        zIndex={1}
        boxShadow="base"
        as="nav"
      >
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          maxW={["sm", "4xl"]}
        >
          <Link fontWeight="bold" color="white" fontSize="2xl">
            LANDING PAGE
          </Link>
          <Box onClick={onOpen} display={{ base: "block", md: "none" }}>
            <svg
              fill="white"
              width="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>
          <Drawer onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent backgroundColor="blue.800">
                <DrawerCloseButton color="white" />
                <DrawerHeader
                  borderBottomWidth="2px"
                  borderBottomColor="blue.700"
                  backgroundColor="blue.900"
                  color="blue.100"
                >
                  Menu
                </DrawerHeader>
                <DrawerBody p="0">
                  <Stack spacing={0}>
                    <Link
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                      p=".8rem"
                      paddingLeft="1.5rem"
                      _hover={{
                        backgroundColor: "blue.700"
                      }}
                    >
                      PARKS
                    </Link>
                    <Link
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      p=".8rem"
                      paddingLeft="1.5rem"
                      _hover={{
                        backgroundColor: "blue.700"
                      }}
                    >
                      ABOUT
                    </Link>
                    <Link
                      fontWeight="bold"
                      fontSize="lg"
                      color="white"
                      p=".8rem"
                      paddingLeft="1.5rem"
                      _hover={{
                        backgroundColor: "blue.700"
                      }}
                    >
                      CONTACT
                    </Link>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          <Stack
            display={{ base: "none", md: "flex" }}
            spacing={12}
            isInline
            ml="auto"
            alignItems="center"
          >
            <Link
              color="white"
              fontWeight="bold"
              fontSize="lg"
              p=".8rem"
              borderRadius=".5rem"
              _hover={{
                backgroundColor: "teal.400"
              }}
            >
              PARKS
            </Link>
            <Link
              fontSize="lg"
              fontWeight="bold"
              color="white"
              p=".8rem"
              borderRadius=".5rem"
              _hover={{
                backgroundColor: "teal.400"
              }}
            >
              ABOUT
            </Link>
            <Link
              fontWeight="bold"
              fontSize="lg"
              color="white"
              p=".8rem"
              borderRadius=".5rem"
              _hover={{
                backgroundColor: "teal.400"
              }}
            >
              CONTACT
            </Link>
          </Stack>
        </Container>
      </Flex>
    );
  };
  export default NavigationMenu;
  