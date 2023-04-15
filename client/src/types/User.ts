export type User = {
  username: string | null;
  displayName: string | null;
};

export type UserAction = {
  type: string;
  user?: User;
};
