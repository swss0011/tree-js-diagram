import React from "react";
import ReactImageFallback from "react-image-fallback";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "./DialogDocs.module.css";

export default function({ node }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [lightboxIsOpen, setLightboxIsOpen] = React.useState(false);

  const toggleLightbox = React.useCallback(
    () => setLightboxIsOpen(s => !s),
    []
  );

  const { images, links } = React.useMemo(() => {
    if (!node?.docs) {
      return { images: [], links: [] };
    }

    return node.docs.reduce(
      (acc, doc) => {
        if (doc.img) {
          acc.images.push({
            ...doc,
            caption: doc.desc,
            source: `http://digisoft.co.il/docs/${doc.img}`
          });
        } else {
          acc.links.push(doc);
        }

        return acc;
      },
      { images: [], links: [] }
    );
  }, [node]);

  if (!node?.docs) {
    return null;
  }

  return (
    <>
      {images ? (
        <div className={styles.gallery}>
          <div> מסמכים:</div>
          {images.map((doc, index) => (
            <div
              className={styles.image}
              key={index}
              ס
              onClick={() => {
                setSelectedIndex(index);
                setLightboxIsOpen(true);
              }}
            >
              <ReactImageFallback src={doc.source} />
            </div>
          ))}
        </div>
      ) : null}

      {links.length ? (
        <div>
          קישורים:
          {links.map(link => (
            <div>
              <a target="_blank" rel="noopener noreferrer" href={link.link}>
                {link.title}
              </a>
            </div>
          ))}
        </div>
      ) : null}

      {lightboxIsOpen && (
        <div className={styles.lightbox}>
          <Lightbox
            wrapperClassName={` ${styles.lightbox} `}
            imageTitle={images[selectedIndex].title}
            imageCaption={(() => (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: images[selectedIndex].desc
                  }}
                />
                {images[selectedIndex].link ? (
                  <a href={images[selectedIndex].link} target="_blank" rel="noopener noreferrer">מקור</a>
                ) : null}
              </>
            ))()}
            mainSrc={images[selectedIndex].source}
            nextSrc={images[(selectedIndex + 1) % images.length].source}
            prevSrc={
              images[(selectedIndex + images.length - 1) % images.length]
                ?.source
            }
            onCloseRequest={toggleLightbox}
            onMovePrevRequest={() =>
              setSelectedIndex(
                (selectedIndex + images.length - 1) % images.length
              )
            }
            onMoveNextRequest={() =>
              setSelectedIndex((selectedIndex + 1) % images.length)
            }
          />
        </div>
      )}
    </>
  );
}
