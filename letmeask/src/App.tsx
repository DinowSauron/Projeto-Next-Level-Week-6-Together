import { Home } from "./pages/Home"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import { AdminRoom } from "./pages/AdminRoom";
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room";

import { AuthContextProvider } from "./contexts/AuthContext"


function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch> {/* apenas 1 rota é acessada */}
            <Route path="/" exact={true} component={Home}></Route>
            <Route path="/rooms/new" exact component={NewRoom}></Route>
            <Route path="/rooms/join/:id" component={Room}></Route>
            <Route path="/rooms/admin/:id" component={AdminRoom}></Route>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
