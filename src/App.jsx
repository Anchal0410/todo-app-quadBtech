import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isSidebarOpen = useSelector((state) => state.tasks.isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#FBFDFC] dark:bg-[#232323] ">
      <div className="flex flex-col w-full">
        {/* Header takes full width */}
        <Header />

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden p-4">
          {/* Sidebar - hidden on mobile when closed */}
          {isSidebarOpen && (
            <aside className="hidden md:block md:w-64 dark:border-gray-800">
              <Sidebar />
            </aside>
          )}

          {/* Main content area */}
          <main className="flex-1 flex flex-col overflow-hidden ml-4">
            <TaskInput />
            <div className="flex-1 overflow-y-auto">
              <TaskList />
            </div>
          </main>

          {/* Task Details - hidden on mobile */}
          <aside className="hidden lg:block dark:border-gray-800">
            <TaskDetails />
          </aside>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};
export default App;
