import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingOverlay from 'react-loading-overlay';
// Material UI
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Components
import App from './components/app.jsx';

const ThemedIndex = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>
);

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingOverlay active={true} spinner text="Saving..." />} persistor={persistor}>
      <ThemedIndex />
    </PersistGate>
  </Provider>, document.getElementById('app'),
);
