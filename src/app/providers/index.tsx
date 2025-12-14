import { Toaster } from "sonner";
import ReactQueryProvider from "./components/react-query-provider";
import NextAuthProvider from "./components/session-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster position="top-right" />
      <NextAuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextAuthProvider>
    </>
  );
}
