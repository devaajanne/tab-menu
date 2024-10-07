import "./App.css";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TodoList from "./TodoList";

function TabBar() {
  const [tab, setTab] = useState(0);

  // Todos-tilamuuttuja määritellään tässä ja annetaan TodoList-komponentille propseina
  // Tabien vaihtaminen aiheuttaa komponentin unmounttaamisen ja mounttaamisen
  // Jos todos-tilamuuttuja olisi TodoList-komponentissa, se alustettaisiin tabin vaihdon aikana tyhjäksi
  // Ja tällöin tallennetut todot katoavat
  // Tähän ehkä on fiksumpi tapa, mutta tämän keksin tähän hätään
  // Ratkaisu mukailtu tämän mukaan: https://stackoverflow.com/questions/75633868/react-setstate-not-when-switching-between-tabs-in-material-ui-applied-div-with
  const [todos, setTodos] = useState([]);

  // Vaihtaa indeksin arvoa sen mukaan mitä tabia klikataan
  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Tabs value={tab} onChange={changeTab}>
        <Tab label='Home' /> {/* Home-tab indeksissä 0 */}
        <Tab label='Todos' /> {/* Todos-tab indeksissä 1 */}
      </Tabs>
      {/* Näytetään Home-tab jos tab-tilamuuttujan arvo on 0 */}
      {tab == 0 && (
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6'>My home</Typography>
            </Toolbar>
          </AppBar>
          <h1>Hello! Welcome!</h1>
        </div>
      )}
      {/* Näytetään Todos-tab jos tab-tilamuuttujan arvo on 1 */}
      {tab == 1 && (
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6'>My todos</Typography>
            </Toolbar>
          </AppBar>
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      )}
    </div>
  );
}

export default TabBar;
