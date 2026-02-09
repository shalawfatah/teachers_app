import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(
  "https://qadzczixuenexacbpmui.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZHpjeml4dWVuZXhhY2JwbXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDkxNjgsImV4cCI6MjA4NjIyNTE2OH0.nkQwXflGDF0w3ec5wqEN6D0mqsB-UVqsAdAEycKcvxw",
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
