import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min'
import reportWebVitals from './reportWebVitals';
import { App } from './components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { WebSocketProvider } from './components/WebSocketsContext';
import { Rooms } from './components/room/Rooms';
import { Room } from './components/room/Room';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Rooms />
      },
      {
        path: "/room/current",
        element: <Room />
      }
    ]
  }
])

root.render(
    <React.StrictMode>
      <WebSocketProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </WebSocketProvider>
    </React.StrictMode>
);


reportWebVitals();
