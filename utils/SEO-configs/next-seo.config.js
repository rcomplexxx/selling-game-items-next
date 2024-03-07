import products from '../../data/products.json'






// const getImageSize = (url) =>
//    {
//     const img = new ImageData();
//     img.onload = () => resolve(img);
//     img.onerror = (err) => reject(err);
//     img.src = url;
//     return {height: img.height, width: img.width}
//   };




const siteUrl = 'https://selling-game-items-next.vercel.app/';






export default {
    titleTemplate: '%s - Gamebuff',
      defaultTitle: "Gamebuff",
    
   
      description: "As graduation loomed, we collectively decided to channel our passion into something greater, the Gamebuff! Our mission is promoting the amazing gaming night experience with friends, and enhancing that experience by providing exceptional gaming equipment. Join us in utilizing technology to create the sureally joyful experience noone has ever had a chance to experience throughout history. Happy shopping!",
      themeColor: "red",
    openGraph: {
      type: 'website',
      
      url: '/products/page/',
      siteName: 'Gamebuff',
      title: "Gamebuff",
      description: 'Buy perfect equipment for deep-night gaming',
      images: [
        {
        url: 'https://selling-game-items-next.vercel.app/images/gameGirl2.png',
      width: 737,
      height: 737,
      alt: 'Gamebuff',
      type: 'image/png',
        }
      ]
      
    
      
    },
    twitter: {
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
      title: "Gamebuff",
      description: 'Buy perfect equipment for deep-night gaming',
      image: 'https://selling-game-items-next.vercel.app/images/gameGirl2.png',
    },
    canonical: 'https://selling-game-items-next.vercel.app/',
  };

  export function productPageSeo(productId){

    const product = products.find((p) => {
      return p.id == productId;
    });

    return {
      title: product.name,
      description: product.description,
      url:`https://selling-game-items-next.vercel.app/products/page/${product.id}`,
      openGraph:{
        title: product.name,
        
       
        url:`https://selling-game-items-next.vercel.app/products/page/${product.id}`,
        images: [
          {
            url:`https://selling-game-items-next.vercel.app/images/${product.images[0]}`,
            height: 600,
            width: 600,
            alt: 'Gamebuff',
            type: 'image/png',
          } 
      ],
      }
    }

  }



