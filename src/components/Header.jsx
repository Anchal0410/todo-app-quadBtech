import React from "react";
import { Search, LayoutGrid, List, Sun, Moon, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleView, toggleTheme } from "../store/taskSlice";

const Header = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.tasks.view);
  const isDark = useSelector((state) => state.tasks.isDark);

  return (
    <header className="h-14 bg-[#FBFDFC] dark:bg-[#232323]">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg"
          >
            <img
              src="menu.svg"
              style={{ stroke: "#7a4242", fill: "#7a4242" }}
            />
          </button>
          <button className="w-20">
            <img src="logo.svg" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <button className="p-2 rounded-lg" aria-label="Toggle view">
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => dispatch(toggleView())}
            className="p-2 rounded-lg"
            aria-label="Toggle view"
          >
            {view === "grid" ? (
              <List className="w-5 h-5" />
            ) : (
              <LayoutGrid className="w-5 h-5" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5">
                <img src="darkmode.svg" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
