import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { useAuth } from "./contexts/authentication";
import { SocketProvider } from "./contexts/socketContext";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? (
    <SocketProvider>
      <AuthenticatedApp />
    </SocketProvider>
  ) : (
    <UnauthenticatedApp />
  );
}
export default App;
