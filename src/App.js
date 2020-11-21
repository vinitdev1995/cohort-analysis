import './App.css';
import React from "react";
import { BrowserRouter, Route,Switch } from "react-router-dom"
import CohortForm from "./Pages/CohortForm/CohortForm"

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path ="/" name = "Cohort Form" component={CohortForm}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
