declare module "firebase/auth/react-native" {
  import { initializeAuth } from "firebase/auth";
  export function getReactNativePersistence(storage: any): Auth.Persistence;
}
