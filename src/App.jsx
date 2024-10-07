import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import TodoList from "./TodoList";

function App() {
  return (
    <Container maxWidth="x1">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My todos</Typography>
        </Toolbar>
      </AppBar>
        <TodoList />
    </Container>
  );
}

export default App;
