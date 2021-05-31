import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ProgressBar from './src/components/ProgressBar';
import Basics from './src/scenes/Basics';
import Health from './src/scenes/Health';
import Confirm from './src/scenes/Confirm';
import { store, persistor } from './src/store';
import { colors } from './src/constants/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <ProgressBar>
            <Basics label="Basics" />
            <Health label="Health" />
            <Confirm label="Confirm" />
          </ProgressBar>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
