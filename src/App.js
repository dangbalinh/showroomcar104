import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import { publicRoutes } from './routes'

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
