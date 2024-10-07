import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import TabBar from "./TabBar";

function App() {
  return (
    <Container maxWidth='x1'>
      <CssBaseline />
      <TabBar />
    </Container>
  );
}

export default App;
