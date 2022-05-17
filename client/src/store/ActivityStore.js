import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent.js";

export default class ActivityStore {
  constructor() {
    makeAutoObservable(this);
  }

  activities = new Map();
  acitivity = null;

  addActivity = async (title, description) => {
    try {
      await agent.Acitivty.add(title, description);
    } catch (error) {}
  };

  loadActivities = async () => {
    try {
      const resp = await agent.Acitivty.list();
      const { data } = resp;
      data.forEach((item) => {
        this.activities.set(item._id, item);
      });
    } catch (error) {}
  };

  loadActivity = async (id) => {
    try {
      const resp = await agent.Acitivty.details(id);
      const { data } = resp;
      this.acitivity = data;
      return data;
    } catch (erorr) {}
  };

  deleteActivity = async (id) => {
    try {
      await agent.Acitivty.delete(id);
      const copy = this.activities;
      runInAction(() => {
        copy.delete(id);
        this.activities = copy;
      });
    } catch (error) {}
  };

  editActivity = async (id, title, description) => {
    try {
      await agent.Acitivty.edit(id, title, description);
      const newActivity = {
        _id: id,
        title,
        description,
      };
      this.activities.set(id, newActivity);
    } catch (error) {}
  };
}
