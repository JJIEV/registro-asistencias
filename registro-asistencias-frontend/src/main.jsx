import React from 'react'
import ReactDOM from 'react-dom/client'
import {ReactKeycloakProvider} from '@react-keycloak/web'
import {Provider} from 'react-redux'
import {App} from '../src/App'
import {CookiesProvider} from 'react-cookie'
import '../src/styles.min.css';
import {persistor,store} from '../src/store/store'
import {PersistGate} from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <CookiesProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </CookiesProvider>

  </React.StrictMode>
)
