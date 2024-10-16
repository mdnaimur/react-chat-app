import Add from "../img/addAvatar.png";

const Register = () => {
  return (
    <div className=" min-h-[100vh] flex justify-center items-center p-4  bg-slate-600  ">
      <div className="flex flex-col items-center gap-3 bg-white rounded-lg py-8 px-16  shadow-lg">
        <span className="text-3xl font-bold text-yellow-400"> Chat App </span>
        <span className="text-2xl mb-10"> Register </span>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter Your Name "
            className="w-full p-3  border border-b-yellow-300 rounded-md placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full p-3  border border-b-yellow-300 rounded-md placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full p-3  border border-b-yellow-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
          />
          <input type="file" id="file" className="hidden" />
          <label
            htmlFor="file"
            className="flex items-start  gap-3 text-gray-400 text-md cursor-pointer"
          >
            <img src={Add} alt="Image" className="w-8" />
            <span>Add an avatar</span>
          </label>
          <button className="w-full bg-yellow-500 p-3 rounded-lg font-bold hover:bg-yellow-700 transition">
            Sing Up
          </button>
        </form>
        <p className="w-full p-3 border border-gray-300 rounded-md">
          You do have an account?
          {/* <Link to="/">Login</Link> */}
        </p>
      </div>
    </div>
  );
};

export default Register;
