export default function Card({
  imgSrc,
  title,
  overview,
  releaseDate,
  rating,
  cardDarkProp
}) {
  const dark = cardDarkProp;

  return (
    <div
      style={
        dark ? { color: "white", background: "#1F2937" } : { color: "black" }
      }
      className="card  rounded-xl shadow-xl overflow-hidden"
    >
      <div>
        <img
          src={imgSrc}
          alt={title + " Poster"}
          className="h-60 w-full max-w-sm object-containe"
        />
      </div>
      <div className="p-8">
        <h1 className="text-red-500  text-lg font-medium">{title}</h1>
        <p className="mt-2  text-justify font-small">{overview}</p>
        <div className="flex justify-between pt-4">
          <div>
            <p className="text-blue-500">Release data</p>
            <span className={dark ? "text-white" : "text-black"}>
              {releaseDate || "N/A"}
            </span>
          </div>
          <div>
            <p className="text-blue-500">Rating</p>
            <span className={dark ? "text-white" : "text-black"}>
              {rating || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
