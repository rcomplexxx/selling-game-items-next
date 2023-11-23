
import { useEffect, useRef, useState } from 'react';
import styles from './search.module.css'
import products from '@/data/products.json'
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function Search(){


    const [searchTerm, setSearchTerm] = useState('');
    const [searchOpen, setSearchOpen]= useState(false);
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



      const handleBlur = (event) => {
        const clickedElement = event.relatedTarget;
        if (clickedElement && clickedElement.classList.contains(styles.searchCancel)) {
          // Clicked on the "X" button, don't close the results
          return;
        }
    
        // Clicked outside the input, the results, and the "X" button, close the results
        if (!searchResultsRef.current || !searchResultsRef.current.contains(clickedElement)) {
          setSearchOpen(false);
        }
      };



    return <div className={`${styles.custom_search_bar} ${searchOpen && styles.custom_search_bar_open}`}>
          <input
          id='search'
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onFocus={()=>{setSearchOpen(true)}}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={()=>{setSearchOpen(false)}}
          />
          <img src={`/images/searchIcon.png`} className={styles.searchIcon} onClick={()=>{setSearchOpen(!searchOpen);
        }}/>
          {/* Custom results section */}
          <div className={`${styles.custom_results} ${searchOpen && styles.itemsVisible}` }>
            {filteredProducts.map((product, index) => (
              <Link href={`/products/${product.id}`} key={index} className={styles.result_item} onClick={()=>{setSearchTerm('')}}
              onMouseDown={(event)=>{event.preventDefault()}}
              >
                <img src={`/images/${product.images[0]}`} className={styles.searchItemImg}/>
                <strong>{product.name}</strong>
                
              </Link>
            ))}
          </div>
          {searchOpen && <span onClick={()=>{setSearchOpen(false)}} className={styles.searchCancel}>X</span>}
        
        </div>
    
    
    
    
            
    
    
}