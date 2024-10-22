const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-white bg-yellow-900 p-3 h-14 rounded-sm">
      <span className="text-md font-bold "> Chat App </span>
      <div className="flex gap-2 mr-4">
        <img
          src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_960_720.jpg"
          alt=""
          className="w-6 h-6 bg-slate-200 rounded-full cursor-pointer hover:bg-transparent"
        />
        <span className="capitalize">naimur</span>
        <button className="bg-slate-400 p-1 rounded-md text-black cursor-pointer hover:bg-yellow-400 text-sm  font-bold capitalize">
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
