import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* Products */}
      {/* Users */}
      {children}
    </AuthProvider>
  );
}
