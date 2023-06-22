const Post = () => {
  return (
    <div className="flex gap-4 mb-4">
        <div className=" w-2/5">
          <img
            src="https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
            alt="random"
            className=" rounded-lg h-36 w-full object-cover"
          />
        </div>
        <div className=" w-3/5 flex flex-col justify-around">
          <h2 className="font-bold text-lg text-ellipsis line-clamp-2 ">Title of a blog post </h2>
          <p className="text-gray-500 text-xs">
            John Doe , <span>2023-06-21 13:26</span>
          </p>
          <p className=" text-sm text-ellipsis line-clamp-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum
            dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </div>
      </div>
  )
}

export default Post