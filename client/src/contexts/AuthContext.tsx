import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import JWTManager from "../utils/jwt";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  checkAuth: () => Promise<void>;
}

const defaultAuthenticated = false;

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthenticated);

  const checkAuth = async () => {
    const token = JWTManager.getToken();

    if (token) {
      setIsAuthenticated(true);
    } else {
      const success = await JWTManager.getRefreshToken();
      if (success) setIsAuthenticated(true);
    }
  };

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: defaultAuthenticated,
  setIsAuthenticated: () => {},
  checkAuth: () => Promise.resolve(),
});

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
