import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ModeToggle />
      </div>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
