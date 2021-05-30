import React from "react";
import {client} from '../config/contentfulConfig'
import CuisineItem from "../components/CuisineItem";
import Head from "next/head";
export async function getStaticProps() {
  const { items } = await client.getEntries({
    content_type: "cuisine",
    select: 'sys,fields.title,fields.image,fields.slug'
  });
  const cuisines = items.map((item) => {
    return { ...item.fields, createdAt: item.sys.createdAt, id: item.sys.id};
  });
  return {
    props: { cuisines },
    revalidate: 1,
  };
}
const Home = ({cuisines}) => {
  return (
    <>
    <Head>
        <title>Vietnamese Cuisines | Homepage</title>
        <meta name="keywords" content="vietnamese cuisine" />
    </Head>
    <div className="home-main">
      {cuisines.map(cuisine => <CuisineItem cuisine={cuisine} key={cuisine.id} />)}
    </div>
    </>
  );
};

export default Home;
