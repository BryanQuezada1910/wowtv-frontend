const NewsCard = ({ image, title, description, href, category }) => {
  return (
    <div className="card">
      <a href={href}>
        <figure>
          <img
            className="w-full h-56 object-cover"
            src={image ?? "/image-not-found.png"}
            alt={title}
          />
        </figure>
      </a>
      <div className="card-body w-full bg-base-300 shadow-xl hover:text-red-600">
        <span className="font-bold text-primary">{category}</span>
        <a href={href}>
          <h3 className="card-title hover:text-red-600 cursor-pointer mb-3">{title}</h3>
          <p>{description}</p>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
