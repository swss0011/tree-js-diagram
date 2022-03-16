import React from "react";
import { Dialog } from "@reach/dialog";
import { useContactUsDialog } from "./ContactUsDialog";
import DialogDocs from "./DialogDocs";
import "@reach/dialog/styles.css";

export default function({ isOpen, node, onDismiss }) {
  const { openContactUs } = useContactUsDialog();

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss} style={{ direction: "rtl" }}>
      <h3>{node?.name || ""} </h3>

      <div
        dangerouslySetInnerHTML={{
          __html: node?.Desc
        }}
      />

      <DialogDocs node={node} />
      <button onClick={() => openContactUs(node)}>צור קשר</button>
    </Dialog>
  );
}
