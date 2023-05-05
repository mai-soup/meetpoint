export type User = {
  username: string | null;
  displayName: string | null;
  avatar?: {
    name: string;
    url: string;
  };
};

export type LoggedInAction = {
  type: "loggedIn";
  user: User;
};

export type UserAction =
  | LoggedInAction
  | {
      type: "loggedOut";
      user?: null;
    };
