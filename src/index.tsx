import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  },
});

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const App = () => <div>App</div>;

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
