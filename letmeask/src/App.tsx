import { Home } from "./pages/Home"

import { BrowserRouter, Route } from "react-router-dom"
import { NewRoom } from "./pages/NewRoom"

import { AuthContextProvider } from "./contexts/AuthContext"


function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/rooms/new" component={NewRoom}></Route>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
