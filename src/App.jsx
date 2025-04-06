import AppRouter from "./AppRouter";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
