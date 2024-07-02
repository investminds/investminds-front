// app.jsx
import { useAuth } from './context/auth-context';
import { SignedInRoutes, SignedOffRoutes } from './routes';

const App = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <SignedInRoutes /> : <SignedOffRoutes />;
};

export default App;
