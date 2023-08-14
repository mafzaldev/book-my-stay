import { create } from "zustand";

interface UserState {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
  login: (name: string, email: string, role: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  name: "",
  email: "",
  role: "",
  isLoggedIn: false,
  login: (name, email, role) => {
    if (name === "" || email === "" || role === "") return;
    set({ name, email, role, isLoggedIn: true });
  },
  logout: () => set({ name: "", email: "", role: "", isLoggedIn: false }),
}));

export default useUserStore;
