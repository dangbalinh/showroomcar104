import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import { publicRoutes } from './routes'
// import { Fraction } from 'react's

function App() {

  return (
      <div className="App">
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                } /> 
              )
            })
          }
        </Routes>
      </div>
  );
}

export default App;
