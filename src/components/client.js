import Feathers from "@feathersjs/feathers";
import FeathersAuth from "@feathersjs/authentication-client";
import FeathersSocketIOClient from "@feathersjs/socketio-client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const host = new URL(window.location.origin);
host.protocol = process.env["REACT_APP_SERVER_PROTOCOL"] || "http";
host.hostname = process.env["REACT_APP_SERVER_HOST"];
host.port = process.env["REACT_APP_SERVER_PORT"];

const socket = io(host.toString());

const feathers = Feathers();
feathers.configure(FeathersSocketIOClient(socket))
feathers.configure(FeathersAuth({
  storageKey: "accessToken"
}));

export const ClientContext = createContext(null);

const getAccountRole = (account) => {
  const { lecturer_id, student_id, registration_id } = account;
  if (registration_id) {
    return "Public";
  } else if (lecturer_id) {
    return "Lecturer";
  } else if (student_id) {
    return "Student";
  }
  return "Admin";
}

const populateAccount = async (account) => {
  if (getAccountRole(account) === "Student") {
    account.student = await feathers.service("students").get(account["student_id"], {
      query: { $select: ["id", "name", "study_program_id"] }
    });
  } else if (getAccountRole(account) === "Lecturer") {
    account.lecturer = await feathers.service("lecturers").get(account["lecturer_id"], {
      query: {
        $select: ["id", "nidn", "employee", "employee_id", "study_program_id"],
        $include: [{
          model: "employees",
          $select: ["id", "name", "nip"]
        }]
      }
    });
  } else if (getAccountRole(account) === "Public") {
    account.student = await feathers.service("students").get(account["student_id"], {
      query: {
        $select: ["id", "name", "email", "registration"],
        $include: [{
          model: "registrations",
          $select: ["id", "status"]
        }]
      }
    });
    account.registrations = account.student.registration;
  }
  return account;
}

export const ClientProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const role = useMemo(() => {
    if (account === null) return null;
    return getAccountRole(account);
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
      const account = await populateAccount(res.user);
      setAccount(account);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function reAuthenticate(force = false) {
    try {
      const res = await feathers.reAuthenticate(force);
      const account = await populateAccount(res.user);
      setAccount(account);
      setIsAuthenticated(true);
      return res;
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
      get "classes"() { return feathers.service("classes") },
      get "curriculums"() { return feathers.service("curriculums") },
      get "employees"() { return feathers.service("employees") },
      get "hours"() { return feathers.service("hours") },
      get "lecturers"() { return feathers.service("lecturers") },
      get "majors"() { return feathers.service("majors") },
      get "rooms"() { return feathers.service("rooms") },
      get "subject-lecturers"() { return feathers.service("subject-lecturers") },
      get "semesters"() { return feathers.service("semesters") },
      get "students"() { return feathers.service("students") },
      get "studies"() { return feathers.service("studies") },
      get "study-programs"() { return feathers.service("study-programs") },
      get "study-plans"() { return feathers.service("study-plans") },
      get "study-results"() { return feathers.service("study-results") },
      get "contracts"() { return feathers.service("contracts") },
      get "subjects"() { return feathers.service("subjects") },
      get "users"() { return feathers.service("users") },
      get "registrations"() { return feathers.service("registrations") },
      get "preceptors"() { return feathers.service("preceptors") },
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