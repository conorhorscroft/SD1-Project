import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for user data
type User = {
  id: number;
  email: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  experience: number;
};

type LoginResponse = {
  token: string;
  expiresIn: number;
  userId: number;
  email: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  experience: number;
};

// Define the context type
type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (loginResponse: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  isLoading: boolean;
  updateToken: (newToken: string) => Promise<void>;
};

// Create the context with a more explicit type
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  fetchUser: async () => {},
  isLoading: true,
  updateToken: async () => {},
});

// Authentication Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedUserJson = await AsyncStorage.getItem("userData");

        if (storedToken && storedUserJson) {
          setToken(storedToken);
          setUser(JSON.parse(storedUserJson));
        }
      } catch (e) {
        console.error("Failed to restore token", e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return null;
  }

  // Add token update function
  const updateToken = async (newToken: string) => {
    try {
      await AsyncStorage.setItem("authToken", newToken);
      setToken(newToken);
    } catch (e) {
      console.error("Failed to update token", e);
      throw e;
    }
  };

  const fetchUser = async () => {
    try {
      const storedUserJson = await AsyncStorage.getItem("userData");
      if (storedUserJson) {
        const userData = JSON.parse(storedUserJson);
        setUser(userData);
      }
    } catch (e) {
      console.error("Failed to fetch user data", e);
      throw e;
    }
  };

  const login = async (loginResponse: LoginResponse) => {
    try {
      await AsyncStorage.setItem("authToken", loginResponse.token);
      const userData: User = {
        id: loginResponse.userId,
        email: loginResponse.email,
        name: loginResponse.name,
        age: loginResponse.age,
        weight: loginResponse.weight,
        height: loginResponse.height,
        experience: loginResponse.experience,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      setToken(loginResponse.token);
    } catch (e) {
      console.error("Failed to save login data", e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["authToken", "userData"]);
      setUser(null);
      setToken(null);
    } catch (e) {
      console.error("Failed to remove token or user data", e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        fetchUser,
        isLoading,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
