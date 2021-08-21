import Feathers from "@feathersjs/feathers";
import FeathersAuth from "@feathersjs/authentication-client";
import FeathersSocketIOClient from "@feathersjs/socketio-client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";


const host = new URL(window.location.origin);
host.hostname = process.env["REACT_APP_SERVER_HOST"];
host.port = process.env["REACT_APP_SERVER_PORT"];

const socket = io(host.toString());

const feathers = Feathers();
feathers.configure(FeathersSocketIOClient(socket))
feathers.configure(FeathersAuth({
  storageKey: "accessToken"
}))

export const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const listener = [
      () => { setIsConnected(true); },
      () => { setIsConnected(false); }
    ]
    socket.on("connect", listener[0]);
    socket.on("disconnect", listener[1]);
    return () => {
      socket.off("connect", listener[0]);
      socket.off("disconnect", listener[1]);
    }
  }, []);

  async function authenticate(data, params) {
    try {
      const res = await feathers.authenticate(data, params);
      console.log(res);
      setAccount(res.users);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error(err);
    }
  }

  const client = useMemo(() => {
    return {
      feathers,
      account,

      authenticate,
      logout: () => { return feathers.logout() },
      reAuthenticate: (force) => { return feathers.reAuthenticate(force) },

      isAuthenticated() { return isAuthenticated },
      isConnected() { return isConnected },
      __connected: isConnected,
      __authenticated: isAuthenticated,

      get: (name) => { return feathers.get(name) },

      // Services
      "users": () => { return feathers.service("users") },
      "rooms": () => { return feathers.service("rooms") },
      "semesters": () => { return feathers.service("semesters") },
      "students": () => { return feathers.service("students") },
      "lecturers": () => { return feathers.service("lecturers") },
      "subjects": () => { return feathers.service("subjects") },
      "majors": () => { return feathers.service("majors") },
      "study-programs": () => { return feathers.service("study-programs") },
      "schedules": () => { return feathers.service("schedules") },
      "hours": () => { return feathers.service("hours") },
      "classes": () => { return feathers.service("classes") },
      "curriculums": () => { return feathers.service("curriculums") },
    }
  }, [isConnected, isAuthenticated, account]);

  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  const client = useContext(ClientContext);
  return client;
}