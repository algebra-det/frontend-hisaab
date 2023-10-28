import { Dispatch, SetStateAction, createContext, useState } from "react";
import { User } from "@/types";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const userContext = createContext<UserContextType | null>(null);

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 0,
    name: "g",
    role: "",
    token: "",
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
export default Context;
