export type User = {
  username: string | null;
  displayName: string | null;
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
