import Chat from "./Chat";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="basis-[25%] bg-blue-500 text-black">
      <Navbar />
      <Search />
      <Chat />
    </div>
  );
};

export default Sidebar;
