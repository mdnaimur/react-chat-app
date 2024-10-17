import Attach from "../img/attach.png";
import Img from "../img/img.png";

const Input = () => {
  return (
    <div className="flex h-12 bg-white text-black items-center justify-between p-3">
      <input
        className="  outline-none border-none text-xl"
        type="text"
        placeholder="Type something..."
      />

      <div className="flex items-center gap-2">
        <img className="h-6 cursor-pointer" src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img className="h-6 cursor-pointer" src={Img} alt="" />
        </label>

        <button className="bg-[#8da4f1] py-2 px-3 border-none cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
