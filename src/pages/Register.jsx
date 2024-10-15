const Register = () => {
  return (
    <div className=" h-min-[100vh] flex justify-center items-center p-4  bg-slate-600  ">
      <div className="flex flex-col items-center gap-3 ">
        <span className="text-3xl"> Chat App </span>
        <span> Register </span>
        <form>
          <input type="text" placeholder="enter your name " />
          <input type="email" placeholder="enter your email" />
          <input type="password" placeholder="enater your password" />
          <input type="file" />
        </form>
        <p> You do have an account? Login </p>
      </div>
    </div>
  );
};

export default Register;
