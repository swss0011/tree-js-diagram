import React from "react";

export default function({ nodes }) {
  const stats = React.useMemo(() => {
    const all =
      nodes.length - nodes.filter(n => n.DeathType === "Before").length;

    const holocaust = nodes.filter(n => n.DeathType === "Holocaust").length;

    return { all, holocaust };
  }, [nodes]);

  return <div />;

  // return (
  //   <div style={{ textAlign: "center" }}>
  //     נספו {stats.holocaust} מתוך {stats.all}
  //   </div>
  // );
}
