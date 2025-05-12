import { create } from "zustand";
import { toast } from "sonner";

// Mock user type
export interface User {
  id: string;
  email: string;
  name: string;
  geminiKey: string;
}

// Auth store interface
interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    geminiKey: string
  ) => Promise<void>;
  logout: () => void;
}

// Mock API delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Create auth store with Zustand
export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to login");
      }
      const data = await res.json();
      set({
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          geminiKey: data.geminiKey,
        },
        isLoading: false,
      });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoading: false });
      toast.error(error instanceof Error ? error.message : "Failed to login");
      throw error;
    }
  },

  register: async (
    email: string,
    password: string,
    name: string,
    geminiKey: string
  ) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, geminiKey }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to register");
      }
      const data = await res.json();
      set({
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          geminiKey: data.geminiKey,
        },
        isLoading: false,
      });
      toast.success("Registered successfully");
    } catch (error) {
      set({ isLoading: false });
      toast.error(
        error instanceof Error ? error.message : "Failed to register"
      );
      throw error;
    }
  },

  logout: () => {
    set({ user: null });
    toast.success("Logged out successfully");
  },
}));

// Protected route guard hook
export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  return { user, isLoading, isAuthenticated: !!user };
}

// Get Gemini AI feedback for pseudocode
export async function getGeminiFeedback({
  pseudocode,
  geminiKey,
  questionDetail,
}: {
  pseudocode: string;
  geminiKey: string;
  questionDetail?: string;
}): Promise<string> {
  try {
    let prompt = pseudocode;
    if (questionDetail) {
      prompt = `Question: ${questionDetail}\n\nPseudocode: ${pseudocode}`;
    }
    const res = await fetch("/api/gemini-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudocode: prompt, geminiKey }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to get feedback");
    }
    const data = await res.json();
    return data.feedback;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to get feedback");
  }
}
