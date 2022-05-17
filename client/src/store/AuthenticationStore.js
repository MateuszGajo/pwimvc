import { makeAutoObservable } from "mobx";
import agent from "../api/agent.js";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
    if (localStorage.getItem("token")) this.isAuthenticated = true;
  }

  isAuthenticated = false;

  signIn = async (creds) => {
    try {
      const resp = await agent.Authentication.login(
        creds.username,
        creds.password
      );
      const { token } = resp.data;
      localStorage.setItem("token", token);
      this.isAuthenticated = true;
    } catch (error) {}
  };

  signUp = async (creds) => {
    try {
      const resp = await agent.Authentication.signup(
        creds.username,
        creds.password
      );
      const { token } = resp.data;
      localStorage.setItem("token", token);
      this.isAuthenticated = true;
    } catch (error) {}
  };

  logout = () => {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
  };
}
