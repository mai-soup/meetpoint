import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { User, UserAction } from "../types/User";
import axios from "axios";

type UsersContextType = User | null;
type UsersDispatchContextType = Dispatch<UserAction> | null;
const UsersContext = createContext<UsersContextType>(null);
const UsersDispatchContext = createContext<UsersDispatchContextType>(null);

export const useUsers = () => useContext(UsersContext);

export const useUsersDispatch = () => useContext(UsersDispatchContext);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, initialUser);

  useEffect(() => {
    checkUserSession(dispatch);
  }, [dispatch]);

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
        username: action.user.username,
        displayName: action.user.displayName,
      };
    }
    case "loggedOut": {
      return initialUser;
    }
    default: {
      throw Error("Unknown action.");
    }
  }
}

const initialUser: User = {
  username: null,
  displayName: null,
};

const checkUserSession = async (dispatch: Dispatch<UserAction>) => {
  try {
    const response = await axios.get("/loggedInUser");
    if (response.status === 200 && response.data.user) {
      dispatch({ type: "loggedIn", user: response.data.user });
    } else {
      dispatch({ type: "loggedOut" });
    }
  } catch (error) {
    dispatch({ type: "loggedOut" });
  }
};
