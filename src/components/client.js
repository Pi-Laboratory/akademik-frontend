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

  const role = useMemo(() => {
    if (account === null) return null;
    const { lecturerId, studentId } = account;
    return !studentId ? !lecturerId ? "Admin" : "Lecture" : "Student";
  }, [account]);

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
      setAccount(res.user);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function reAuthenticate(force) {
    try {
      const ret = await feathers.reAuthenticate(force);
      // console.log(ret);
      setAccount(ret.user);
      setIsAuthenticated(true);
      return ret;
    } catch (err) {
      setIsAuthenticated(false);
      throw new Error(err);
    }
  }

  async function logout() {
    const ret = await feathers.logout()
    setIsAuthenticated(false);
    return ret;
  }

  const client = useMemo(() => {
    return {
      feathers,
      account,
      role,

      authenticate,
      logout,
      reAuthenticate,

      isAuthenticated() { return isAuthenticated },
      isConnected() { return isConnected },
      __connected: isConnected,
      __authenticated: isAuthenticated,

      get: (name) => { return feathers.get(name) },

      // Services
      get "users"() { return feathers.service("users") },
      get "rooms"() { return feathers.service("rooms") },
      get "semesters"() { return feathers.service("semesters") },
      get "students"() { return feathers.service("students") },
      get "lecturers"() { return feathers.service("lecturers") },
      get "subjects"() { return feathers.service("subjects") },
      get "majors"() { return feathers.service("majors") },
      get "study-programs"() { return feathers.service("study-programs") },
      get "schedules"() { return feathers.service("schedules") },
      get "hours"() { return feathers.service("hours") },
      get "classes"() { return feathers.service("classes") },
      get "curriculums"() { return feathers.service("curriculums") },
    }
  }, [isConnected, isAuthenticated, account, role]);

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