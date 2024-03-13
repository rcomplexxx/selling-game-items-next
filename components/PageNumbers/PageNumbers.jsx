
import Link from 'next/link';
import styles from './pagenumber.module.css'
import Image from 'next/image';


export default function PageNumber({ mainLink, links, pageId}){



    return <div className={styles.linkDiv}>
    {pageId > 1 && (
      <Link
        href={`${mainLink=='/products/page/' && pageId==2?'/products/':mainLink+(pageId - 1)}`}
        className={`${styles.pageLink} ${styles.arrowLink}`}
      >
       
      
        <Image className={`${styles.rightArrowImg} ${styles.leftArrowImg}`} src={"/images/greater.svg"} alt="Back" height={0} width={0} sizes='32px' />
       
      </Link>
    )}
    {links.length>1 && links.map((link, index) => {
      return pageId == link ? (
   
          <Link  className={`${styles.pageLink} ${styles.currentPageLink}`} key={index} href={`${mainLink}${link}`}>{link}</Link>
       
      ) : (
        <Link 
        
        key={index} 
        className={styles.pageLink}
        href={`${mainLink=='/products/page/' && link==1?'/products/':mainLink+link}`}>
          {link}
        </Link>
      );
    })}
    {pageId < links.length && (
      <Link
        href={`${mainLink}${pageId + 1}`}
        className={`${styles.pageLink} ${styles.arrowLink}`}
      >
       
       
          <Image className={styles.rightArrowImg} src={"/images/greater.svg"} alt="Next" height={0} width={0} sizes='32px' />
       
      </Link>
    )}
  </div>
}