import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import { ChakraProvider } from '@chakra-ui/react';

export function App() {
  return (
    <ChakraProvider>
      <HomeScreen />
    </ChakraProvider>
  );
}
