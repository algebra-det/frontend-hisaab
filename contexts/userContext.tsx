import { createContext, useState } from "react";

export const userContext = createContext({});

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    name: "guest",
    token: "",
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
export default Context;
