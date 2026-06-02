import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { MessagesProvider } from './src/context/MessagesContext';

export default function App() {
  return (
    <MessagesProvider>
      <AppNavigator />
    </MessagesProvider>
  );
}
