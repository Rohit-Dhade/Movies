import { AuthContextProvider } from "./Feature/auth/auth.context";
import { RouterProvider } from "react-router";
import router from "./Approutes";
import { MovieContextProvider } from "./Feature/Home/movie.context";

const App = () => {
  return (
    <AuthContextProvider>
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </AuthContextProvider>
  );
};
export default App;
