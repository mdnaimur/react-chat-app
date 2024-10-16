import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="basis-[25%] bg-yellow-400 text-blue-900">
      <Navbar />
      <Search />
    </div>
  );
};

export default Sidebar;
