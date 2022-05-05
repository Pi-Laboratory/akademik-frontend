import Feathers from "@feathersjs/feathers";
import FeathersAuth from "@feathersjs/authentication-client";
import FeathersSocketIOClient from "@feathersjs/socketio-client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { Box } from "./Grid";
import { useDebounce } from "./helper";

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

const ClientStatus = () => {
  const client = useClient();
  console.log(client.__connected);

  const hide = useDebounce(client.__connected, 1000);

  return (
    <Box
      className={hide ? "hide" : undefined}
      sx={{
        position: "fixed",
        top: "0%",
        right: 0,
        mt: 2,
        mr: 2,
        py: 2,
        px: 2,
        backgroundColor: client.__connected ? "green.3" : "red.3",
        borderRadius: 4,
        transition: "top 1000ms ease, background-color 250ms ease",
        "&.hide": {
          top: "-100%"
        }
      }}>
      {client.__connected ? `Connected` : `Not Connected`}
    </Box>
  )
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
      host,
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
      get "employees"() { return feathers.service("employees") },
      get "lecturers"() { return feathers.service("lecturers") },
      get "students"() { return feathers.service("students") },

      get "classes"() { return feathers.service("classes") },
      get "contracts"() { return feathers.service("contracts") },
      get "curriculums"() { return feathers.service("curriculums") },
      get "hours"() { return feathers.service("hours") },
      get "majors"() { return feathers.service("majors") },
      get "notifications"() { return feathers.service("notifications") },
      get "preceptors"() { return feathers.service("preceptors") },
      get "rooms"() { return feathers.service("rooms") },
      get "registrations"() { return feathers.service("registrations") },
      get "semesters"() { return feathers.service("semesters") },
      get "subject-lecturers"() { return feathers.service("subject-lecturers") },
      get "studies"() { return feathers.service("studies") },
      get "study-programs"() { return feathers.service("study-programs") },
      get "study-plans"() { return feathers.service("study-plans") },
      get "study-results"() { return feathers.service("study-results") },
      get "subjects"() { return feathers.service("subjects") },
      get "users"() { return feathers.service("users") },

      get "cities"() { return feathers.service("cities") },
      get "districts"() { return feathers.service("districts") },
      get "neighbors"() { return feathers.service("neighbors") },
      get "provinces"() { return feathers.service("provinces") },
      get "subdistricts"() { return feathers.service("subdistricts") },
    }
  }, [isConnected, isAuthenticated, account, role]);

  return (
    <ClientContext.Provider value={client}>
      <ClientStatus />
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  const client = useContext(ClientContext);
  return client;
}