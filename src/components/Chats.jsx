import Add from "../img/add.png";
import Cam from "../img/cam.png";
import More from "../img/more.png";
import Input from "./Input";
import Messages from "./Messages";

const Chats = () => {
  return (
    <div className="basis-[75%] bg-slate-900 ">
      <div className="h-12 bg-yellow-800 flex items-center justify-between p-3 border-r-2 ">
        <span>Jim</span>
        <div className="flex gap-3">
          <img
            className="h-6 cursor-pointer hover:bg-yellow-400"
            src={Cam}
            alt=""
          />
          <img
            className="h-6 cursor-pointer hover:bg-yellow-400"
            src={Add}
            alt=""
          />
          <img
            className="h-6 cursor-pointer hover:bg-yellow-400"
            src={More}
            alt=""
          />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
export default Chats;
