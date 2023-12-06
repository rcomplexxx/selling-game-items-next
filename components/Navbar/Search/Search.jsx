
import { useEffect, useRef, useState } from 'react';
import styles from './search.module.css';
import collections from '@/data/collections.json'
import products from '@/data/products.json'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';



export default function Search({searchOpen, setSearchOpen}){


    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    

    const isMounted=useRef(false)
  
    useEffect(()=>{
       if(!isMounted.current) {isMounted.current=true;return;}
        const inputElement = document.getElementById('search');
        if (inputElement) {
            isMounted.current=false;
          inputElement.focus();
        }
    },[searchOpen])

    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  
    const filteredProducts = products.filter((product) =>
      searchTerm!=='' && product.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const filteredcollections = collections.filter((collection) =>
      searchTerm!=='' && collection.name.toLowerCase().includes(searchTerm.toLowerCase()));

      


    return <div className={`${styles.custom_search_bar} ${searchOpen && styles.custom_search_bar_open}`}>
      <div className={styles.searchBarWrapper}>
          <input
          id='search'
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onFocus={()=>{setSearchOpen(true)}}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={()=>{setSearchOpen(false)}}
          />
          <Image src={`/images/searchIcon.png`} className={styles.searchIcon} height={0} width={0} sizes='20px' onClick={()=>{setSearchOpen(!searchOpen);
        }}/>
          {/* Custom results section */}
          <div className={`${styles.custom_results} ${searchOpen && styles.itemsVisible}` }>


          {filteredcollections.length>0 && <div className={styles.resultProductsLabel}>Collections</div>}
            {filteredcollections.map((collection, index) => (
              <Link href={`/collection/${collection.name.toLowerCase().replace(/ /g, '-')}/page/1`} key={index} className={styles.result_item} onClick={()=>{setSearchOpen(false);setSearchTerm('')}}
              onMouseDown={(event)=>{event.preventDefault()}}
              >
                <Image height={36} width={64} src={`/images/${collection.image}`} className={styles.searchItemImg}/>
                <strong>{collection.name}</strong>
                
              </Link>
            ))}





            {filteredProducts.length>0 && <div className={styles.resultProductsLabel}>Products</div>}
            {filteredProducts.map((product, index) => (
              <Link href={`/products/${product.id}`} key={index} className={styles.result_item} onClick={()=>{setSearchOpen(false); setSearchTerm('');}}
              onMouseDown={(event)=>{event.preventDefault()}}
              >
                <Image height={36} width={64} src={`/images/${product.images[0]}`} className={styles.searchItemImg}/>
                <strong>{product.name}</strong>
                
              </Link>
            ))}
          </div>
         
          </div>
          {searchOpen && <span onClick={()=>{setSearchOpen(false)}} className={styles.searchCancel}>X</span>}
        </div>
    
    
    
    
            
    
    
}