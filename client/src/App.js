import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider>
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={<SearchBooks />} 
            />
            <Route 
              path="/saved" 
              element={<SavedBooks />} 
            />
            <Route 
              path="*" 
              element={<h1 className="display-2">Wrong page!</h1>} 
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;



import React from "react";
import { Flex } from "@chakra-ui/react";

import NavigationMenu from "./components/NavigationMenu";
import Hero from "./components/Hero";
import Copyright from "./components/Copyright";
import Footer from "./components/Footer";
import About from "./components/About";
import Portfolio from "./components/Portfolio";

const App = () => (
  <Flex minHeight="100vh" flexDirection="column">
    <NavigationMenu />
    <Hero />
    <Portfolio />
    <About />
    <Footer />
    <Copyright />
  </Flex>
);
export default App;
