import store from "store";
import React from "react";


const USER_KEY = 'user_kay';

export default {

  saveUser(user) {
    store.set(USER_KEY, user);
  },


  getUser() {
    return store.get(USER_KEY) || {}
  },

  removeUser() {
    store.remove(USER_KEY);
    // window.location.reload();
  }
}