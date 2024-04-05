import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

// 3️⃣ Router singleton created
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

// 4️⃣ RouterProvider added
export default function App() {
  return <ChakraProvider theme={theme}>
  <RouterProvider router={router} />
  </ChakraProvider>;
}

// 1️⃣ Changed from App to Root
function Root() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
