import { useState, useEffect } from "react";
import { getParse } from "./parseClient";

const STORAGE_KEY = "device_credentials";

function getOrCreateCredentials() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  const username = "device_" + crypto.randomUUID();
  const password = crypto.randomUUID();
  const credentials = { username, password };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  return credentials;
}

export function useAutoAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ensureUser() {
      const Parse = await getParse();
      const { username, password } = getOrCreateCredentials();

      let currentUser = Parse.User.current();
      if (!currentUser) {
        try {
          currentUser = await Parse.User.logIn(username, password);
        } catch {
          const newUser = new Parse.User();
          newUser.set("username", username);
          newUser.set("password", password);
          currentUser = await newUser.signUp();
        }
      }

      setUser(currentUser);
      setLoading(false);
    }

    ensureUser();
  }, []);

  return { user, loading };
}
