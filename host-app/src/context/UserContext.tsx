import React, {
  createContext,

  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";

export interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  isAuth: boolean;
  btnLoading: boolean;
  loginUser: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    role: "admin" | "user",
    navigate: (path: string) => void
  ) => Promise<void>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const LOCAL_USERS_KEY = "registered_users";
  const LOCAL_LOGGED_IN_KEY = "logged_in_user";

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: "admin" | "user",
    navigate: (path: string) => void
  ) => {
    setBtnLoading(true);

    const storedUsers: User[] = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");

    const alreadyExists = storedUsers.some((u) => u.email === email);
    if (alreadyExists) {
      toast.error("User already exists.");
      setBtnLoading(false);
      return;
    }

    const newUser: User = { name, email, password, role };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(LOCAL_LOGGED_IN_KEY, JSON.stringify(newUser));

    setUser(newUser);
    setIsAuth(true);
    setBtnLoading(false);
    toast.success("Registered Successfully!");
    navigate("/dashboard");
  };

  const loginUser = async (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => {
    setBtnLoading(true);
    const storedUsers: User[] = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const foundUser = storedUsers.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      toast.error("Invalid credentials.");
      setBtnLoading(false);
      return;
    }

    localStorage.setItem(LOCAL_LOGGED_IN_KEY, JSON.stringify(foundUser));
    setUser(foundUser);
    setIsAuth(true);
    setBtnLoading(false);
    toast.success("Logged in successfully!");
    navigate("/dashboard");
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem(LOCAL_LOGGED_IN_KEY);
    toast.success("Logged out!");
  };

  const fetchUserFromLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_LOGGED_IN_KEY);
    if (data) {
      setUser(JSON.parse(data));
      setIsAuth(true);
    }
  };

  useEffect(() => {
    fetchUserFromLocalStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        btnLoading,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
