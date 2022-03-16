import * as React from "react";
import { Formik, Form } from "formik";
import FormContent from "./ContactUsDialogForm";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Context = React.createContext();

export const useContactUsDialog = () => React.useContext(Context);

const initalState = {
  isOpen: false,
  node: null
};

const initialValues = {
  name: "",
  email: "",
  message: ""
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "open": {
      return {
        ...state,
        isOpen: true,
        node: payload
      };
    }

    case "close": {
      return {
        isOpen: false,
        node: null
      };
    }

    default:
      throw new Error(`invalid action type '${type}'`);
  }
}

export default function(props) {
  const [state, dispatch] = React.useReducer(reducer, initalState);

  const value = React.useMemo(() => {
    return {
      openContactUs(node) {
        dispatch({ type: "open", payload: node });
      }
    };
  }, []);

  const handleSubmit = React.useCallback(
    values => {
      axios
        .get(
          `//sherut-leumi.co.il/datiot/ddmail.aspx?sendername=${
            values.name
          }&senderemail=${values.email}&personname=${state?.node?.name ||
            ""}&message=${values.message}`
        )
        .then(() => {
          dispatch({ type: "close" });
          toast("תודה");
        })
        .catch(e => {
          console.log(e);
        });
    },
    [state]
  );

  return (
    <>
      <Context.Provider {...props} value={value} />
      <Dialog
        isOpen={state.isOpen}
        onDismiss={() => dispatch({ type: "close" })}
      >
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <FormContent node={state.node} />
            </Form>
          )}
        </Formik>
      </Dialog>
      <ToastContainer autoClose={4000} />
    </>
  );
}
