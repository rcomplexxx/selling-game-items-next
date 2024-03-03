
import Link from 'next/link';
import styles from './pagenumber.module.css'
import Image from 'next/image';


export default function PageNumber({ mainLink, links, pageId}){



    return <div className={styles.linkDiv}>
    {pageId > 1 && (
      <Link
        href={`${mainLink=='/products/page/' && pageId==2?'/products/':mainLink+(pageId - 1)}`}
        className={styles.arrowLink}
      >
       
        <span className={styles.arrowSpan}>
          <Image
            src={"/images/greater.svg"}
            alt="Black"
            className={styles.leftArrowImg}
            fill
          />
        </span>
      </Link>
    )}
    {links.length>1 && links.map((link, index) => {
      return pageId == link ? (
        <span className={styles.pageLink} key={index}>
          <Link href={`${mainLink}${link}`}>{link}</Link>
        </span>
      ) : (
        <Link key={index} href={`${mainLink=='/products/page/' && link==1?'/products/':mainLink+link}`}>
          {link}
        </Link>
      );
    })}
    {pageId < links.length && (
      <Link
        href={`${mainLink}${pageId + 1}`}
        className={styles.arrowLink}
      >
        {" "}
        <span className={styles.arrowSpan}>
          <Image src={"/images/greater.svg"} alt="Black" fill />
        </span>
      </Link>
    )}
  </div>
}