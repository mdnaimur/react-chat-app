const Message = () => {
  return (
    <div className=" ">
      <div className="flex gap-5">
        <img
          className="w-12 h-12 rounded-full order-2"
          src="https://cdn.pixabay.com/photo/2017/11/06/13/45/cap-2923682_960_720.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="min-w-[80%] flex gap-3">
        <p className="max-h-screen py-3 px-5 rounded-r rounded-b rounded-br-2xl">
          lorem some text some text some test
        </p>
      </div>
    </div>
  );
};

export default Message;
