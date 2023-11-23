import React, { useEffect } from "react";
import Products from "@/components/Products/Products.jsx";
import collections from "@/data/collections.json";
import products from '@/data/products.json'
import Head from "next/head";

import PageNumber from "@/components/PageNumbers/PageNumbers";
import { useRouter } from "next/router";
import styles from './collectionpage.module.css'

export default function Collection({ collectionName,  pageId, products, links }) {

  



  return (
    <div className={styles.mainDiv}>
      <Head>
        <title>Collection - Gamesmoke shop</title>
      </Head>
      {/* <Products showAll={true} products={products}></Products> */}




    <div className={styles.mainDiv}>
      <Head>
        <title>Products - Page {pageId} - Gamesmoke shop</title>
      </Head>
      <Products
        showAll={true}
        products={products}
      />
       <PageNumber mainLink={`/collection/${collectionName}/page/`} links={links} pageId={pageId} />
    </div>
 









   
   </div>
  );
}


export async function getStaticPaths() {




  const paths = collections.reduce((acc, collection) => {
    const pages=Math.floor(collection.products.length/6)+ 1;


    let collectionPaths=[]
    for(let i =1; i<pages+1;i++){
      collectionPaths.push({params: { collectionName: collection.name.toLowerCase().replace(/ /g, '-'), pageId: i.toString() }})
    }
  
    return acc.concat(collectionPaths);
  }, []);

 


  return {
    paths,
    fallback: false, // Or true if you want to handle undefined paths
  };







}


export async function getStaticProps({params}) {

 
  const collection = collections.find(c => c.name.toLowerCase().replace(/ /g, '-') === params.collectionName);


  let collectionProducts= products.filter((p)=>{
    return collection.products.includes(p.id);
  });


  const totalPageNumber= Math.floor(collectionProducts.length/6);

  

  const pageId=parseInt(params.pageId,10);
 
  collectionProducts=collectionProducts.slice((pageId-1)*6,pageId*6);


  const links = [];


  for (let i = 1; i <= totalPageNumber; i++) {
    links.push(i);
  }



  return {
    props: {
      pageId:pageId,
      products:collectionProducts,
      links,
      collectionName: params.collectionName
    },
  };
}



