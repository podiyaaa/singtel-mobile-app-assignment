import React from 'react';
import { SafeAreaView } from 'react-native';
import FlipCard from './components/flip-card';

function App() {
  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <FlipCard />
    </SafeAreaView>
  );
}

export default App;
