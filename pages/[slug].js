import React from "react";
import Head from "next/head";
import { client } from "../config/contentfulConfig";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { format, toDate } from "date-fns-tz";
export async function getStaticProps(context) {
  const { slug } = context.params;
  const { items } = await client.getEntries({
    content_type: "cuisine",
    "fields.slug": slug,
  });
  if (items.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      cuisine: { ...items[0].fields, createdAt: items[0].sys.createdAt },
    }, // will be passed to the page component as props
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { items } = await client.getEntries({
    content_type: "cuisine",
  });
  const paths = items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });
  return {
    paths,
    fallback: true,
  };
}
const Detail = ({ cuisine }) => {
  if (!cuisine) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Loading...</p>;
  }
  const { title, image, createdAt, content } = cuisine;
  const date = toDate(createdAt);
  const formatedDate = format(date, "dd/MM/yyyy-HH:mm");
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={title} />
      </Head>
      <div style={{ padding: "2rem" }}>
        <Image
          src={"https:" + image.fields.file.url}
          width={1000}
          height={600}
        />
        <h2>{title}</h2>
        <p className="date">Publish at: {formatedDate}</p>
        <div style={{ padding: "1rem" }}>
          {documentToReactComponents(content)}
        </div>
      </div>
    </>
  );
};

export default Detail;
