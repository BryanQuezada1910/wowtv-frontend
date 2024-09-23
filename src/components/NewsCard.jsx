const NewsCard = ({ image, title, description, href }) => {
  return (
    <div className="card">
      <a href={href}>
        <figure>
          <img
            className="w-full h-56 object-cover rounded"
            src={image ?? "/image-not-found.png"}
            alt={title}
          />
        </figure>
      </a>
      <div className="card-body w-full bg-base-300 shadow-xl hover:text-red-600">
        <a href={href}>
          <h3 className="card-title hover:text-red-600 cursor-pointer mb-3">{title}</h3>
          <p>{description}</p>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
