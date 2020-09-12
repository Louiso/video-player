import React from 'react';
import VideoPlayer from './src/components/VideoPlayer';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <VideoPlayer src="https://krowdy-vod-destination.s3.amazonaws.com/production/5f1a0d28b1d2520028b68b4b/5f1a0d28b1d2520028b68b4e-0" />
    </ApplicationProvider>
  );
};

export default App;
