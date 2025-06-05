import "./App.css";
import { PaginatedBackLog } from "./App/PaginatedBacklog/paginated-Backlog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <PaginatedBackLog />
      </>
    </QueryClientProvider>
  );
}

export default App;
