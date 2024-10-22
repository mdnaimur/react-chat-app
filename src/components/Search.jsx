const Search = () => {
  return (
    <div className="border border-b-slate-800 ">
      <div className="p-3">
        <input
          type="text"
          placeholder="Search"
          className=" bg-yellow-800 text-white rounded-md outline-none p-1"
        />
      </div>
      <div className="flex items-center cursor-pointer p-3 gap-3 hover:bg-yellow-800 hover:text-white">
        <img
          className="w-12 h-12 rounded-full"
          src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_960_720.jpg"
          alt=""
        />
        <div>
          <span className="text-sm font-bold">Naimur</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
