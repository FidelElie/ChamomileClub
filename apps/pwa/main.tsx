import React from "react"
import ReactDOM from "react-dom/client";

import "./main.css";

import { APIProvider, QueryClient, useGetUsers } from "@chamomileclub/api";

const routes = import.meta.glob("./routes/*.tsx");

console.log(routes);

const queryClient = new QueryClient();

const App = () => {
  return (
    <APIProvider client={queryClient}>
      <HelloUsers/>
    </APIProvider>
  )
}

const HelloUsers = () => {
  const usersQuery = useGetUsers();

  return (
    <code>
      <pre>
        { usersQuery.isSuccess && JSON.stringify(usersQuery.data.items[0], null, 2) }
      </pre>
    </code>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
