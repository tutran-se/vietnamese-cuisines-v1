import Link from "next/link";
import React from "react";
import Image from "next/image";
import { format, toDate } from "date-fns-tz";
const CuisineItem = ({ cuisine }) => {
  const { title, slug, image, createdAt } = cuisine;
  const date = toDate(createdAt);
  const formatedDate = format(date, "dd/MM/yyyy-HH:mm");
  return (
    <div className="cuisine-item">
      <div className="cuisine-cover">
        <Link href={`/${slug}`}>
        <a>
          <Image
            src={"https:" + image.fields.file.url}
            alt={image.fields.title}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}
          />
          </a>
        </Link>
      </div>
      <Link href={`/${slug}`}>
        <a>
          <h2 className="title">{title}</h2>
        </a>
      </Link>
      <p className="date">Publish at: {formatedDate}</p>
    </div>
  );
};

export default CuisineItem;
