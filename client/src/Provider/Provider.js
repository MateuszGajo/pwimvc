import { createContext, useContext } from "react";
import AuthenticationStore from "../store/AuthenticationStore";
import ActivityStore from "../store/ActivityStore.js";

export const stores = {
  activityStore: new ActivityStore(),
  authenticationStore: new AuthenticationStore(),
};

export const Context = createContext(stores);

export const useStore = () => {
  const appContext = useContext(Context);
  return appContext;
};

export const useActivityStore = () => {
  const { activityStore } = useStore();
  return activityStore;
};

export const useAuthenticationStore = () => {
  const { authenticationStore } = useStore();
  return authenticationStore;
};
