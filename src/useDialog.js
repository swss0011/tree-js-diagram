import React from "react";
import Dialog from "./Dialog";

const initialState = {
  isOpen: false,
  node: null
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "open": {
      return {
        ...state,
        ...payload,
        isOpen: true
      };
    }

    case "close":
      return {
        ...state,
        isOpen: false
      };

    default:
      throw new Error(`invalid action type '${type}'`);
  }
}

export default function() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleDismiss = React.useCallback(
    () => dispatch({ type: "close" }),
    []
  );

  return React.useMemo(() => {
    return {
      open(node) {
        dispatch({ type: "open", payload: { node } });
      },
      Dialog() {
        const { node, isOpen } = state;

        return <Dialog isOpen={isOpen} onDismiss={handleDismiss} node={node} />;
      }
    };
  }, [state, handleDismiss]);
}
