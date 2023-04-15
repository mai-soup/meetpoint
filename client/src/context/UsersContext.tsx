import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { User, UserAction } from "../types/User";

type UsersContextType = User | null;
type UsersDispatchContextType = Dispatch<UserAction> | null;
const UsersContext = createContext<UsersContextType>(null);
const UsersDispatchContext = createContext<UsersDispatchContextType>(null);

export const useUsers = () => useContext(UsersContext);

export const useUsersDispatch = () => useContext(UsersDispatchContext);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, initialUser);

  return (
    <UsersContext.Provider value={user}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
};

function userReducer(user: User, action: UserAction): User {
  switch (action.type) {
    case "loggedIn": {
      return {
        username: action.user!.username,
        displayName: action.user!.displayName,
      };
    }
    case "loggedOut": {
      return initialUser;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialUser: User = {
  username: null,
  displayName: null,
};
