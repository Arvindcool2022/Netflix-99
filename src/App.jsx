import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Header, Body } from './components';
import { Suspense, lazy } from 'react';
const MovieDetails = lazy(() => import('./components/MovieDetails'));

function App() {
  return (
    <main className="">
      <Header />
      <Outlet />
    </main>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Body /> },
      {
        path: '/details/:id',
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <MovieDetails />
          </Suspense>
        )
      }
    ],
    errorElement: <Error />
  }
]);

export default AppRouter;
