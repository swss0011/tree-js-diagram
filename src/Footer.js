import React from "react";
import { useContactUsDialog } from "./ContactUsDialog";
import styles from "./Footer.module.css";
import Stats from "./Stats";

export default function({ toggle, markHolucost, nodes }) {
  const { openContactUs } = useContactUsDialog();
  return (
    <footer className={styles.footer}>
      <div className={styles.help}>
        <div>
          הקטן או הגדל את העץ בעזרת גלגלת העכבר
          <br />
          לחיצה על ריבוע תפתח את חלון המסמכים
          <br />
          לחיצה על הכפתור "סמן נספים שואה" תסמן את אלו שלא שרדו את השואה
          <br />
          כדי לבחון את הענף של סבא פרינס יש ללחוץ על הריבוע הקטן שמימין לשם שלו
        </div>

        <div />

        <div>
          <button
            onClick={toggle}
            style={{
              width: 160,
              height: 60,
              color: "blue",
              backgroundColor: "lightgray",
              fontSize: 20
            }}
          >
            {markHolucost ? "הצג רגיל" : "סמן נספים בשואה"}
          </button>

          <Stats nodes={nodes} />
        </div>
      </div>
      <div className={styles.contact}>
        דוד דיאמנט 2020 -
        <button
          onClick={openContactUs}
          style={{
            color: "#404040",
            border: "none",
            background: "none",
            fontSize: 16
          }}
        >
          צור קשר
        </button>
      </div>
    </footer>
  );
}
