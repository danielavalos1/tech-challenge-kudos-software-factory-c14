import { router } from "./router/Router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
