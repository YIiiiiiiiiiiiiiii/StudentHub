import { createHashRouter } from "react-router";
import App from '../view/App';
import CreateStudent from '../view/Create';
import FindStudent from '../view/Find';
import DeleteStudent from '../view/Delete';
import UpdateStudent from '../view/Update';

export const router = createHashRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/create",
      element: <CreateStudent />,
    },
    {
      path: "/find",
      element: <FindStudent />,
    },
    {
      path: "/delete",
      element: <DeleteStudent />,
    },
    {
        path: "/update",
        element: <UpdateStudent />,
      },
  ]);


