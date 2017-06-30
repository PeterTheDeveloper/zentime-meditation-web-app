import { observable, action } from 'mobx';
import axios from 'axios';

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable items;
  @observable item;

  // Observables for timer
  @observable time;
  @observable timerIsFinished;
  @observable timerIsRunning;
  @observable timerIsStopped;
  @observable timerHours;
  @observable timerMinutes;
  @observable timerSeconds;

  // Observables for register
  @observable registerPassword;
  @observable registerUsername;
  @observable passwordIsVisible;

  @observable testval;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.items = [];
    this.item = {};

    // Variables for timer
    this.time = {};
    this.timerIsFinished = false;
    this.timerIsRunning = false;
    this.timerIsStopped = false;
    this.timerHours = 0;
    this.timerMinutes = 0;
    this.timerSeconds = 0;

    // Variables for register
    this.registerPassword = '';
    this.registerUsername = '';
    this.passwordIsVisible = false;

    this.testval = 'Created by ';
  }

  async fetchData(pathname, id) {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com${pathname}`
    );

    console.log(data);

    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }

  @action authenticate() {
    return new Promise((resolve, reject) => {
      this.authenticating = true;

      setTimeout(() => {
        this.authenticated = !this.authenticated;

        this.authenticating = false;

        resolve(this.authenticated);
      }, 0);
    });
  }
}
