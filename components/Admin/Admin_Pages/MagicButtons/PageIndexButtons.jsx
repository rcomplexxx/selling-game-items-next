import Image from "next/image";
import styles from "./pageindexbuttons.module.css";

export default function PageIndexButtons({ data, page, setPage }) {
  if (data.length == 0) return;

  return (
    <div className={styles.linkDiv}>
      {page !== 0 && (
        <div
          className={styles.linkDivPageNumber}
          onClick={() => setPage(page - 1)}
        >
          <span className={styles.arrowSpan}>
            <Image
              src={"/images/greater.svg"}
              alt="Black"
              className={styles.leftArrowImg}
              fill
            />
          </span>
        </div>
      )}
      {Array.from({ length: Math.ceil(data.length / 10) }).map((_, i) =>
        page === i ? (
          <span key={i} className={styles.linkDivPageNumber}>
            <div className={styles.pageLink} onClick={() => setPage(i)}>
              {i + 1}
            </div>
          </span>
        ) : (
          <div
            key={i}
            className={styles.linkDivPageNumber}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </div>
        ),
      )}
      {page !== Math.ceil(data.length / 10) - 1 && (
        <div
          className={styles.linkDivPageNumber}
          onClick={() => setPage(page + 1)}
        >
          {" "}
          <span className={styles.arrowSpan}>
            <Image src={"/images/greater.svg"} alt="Black" fill />
          </span>
        </div>
      )}
    </div>
  );
}
