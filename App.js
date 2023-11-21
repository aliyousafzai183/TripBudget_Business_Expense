
import React from 'react';
import { LogBox } from 'react-native';
import AppNavigation from './navigation/appNavigation';

LogBox.ignoreAllLogs(true);

function App() {
  return (
    <AppNavigation />
  );
}


export default App;
