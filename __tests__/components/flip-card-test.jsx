import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import FlipCard from '../../src/components/flip-card';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<FlipCard />);
});
