import Chats from "../components/Chats";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-slate-600 min-h-screen flex items-center justify-center">
      <div className="text-white h-[80vh] w-[80%] border rounded-lg flex overflow-hidden">
        <Chats />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
