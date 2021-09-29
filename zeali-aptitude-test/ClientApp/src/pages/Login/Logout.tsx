import { Button } from "@material-ui/core";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { logout } from "../../service/utils";

export const Logout = () => {
  const history = useHistory();
  const NavigateTo = useCallback((path) => history.push(path), [history]);

  const handleSubmit = useCallback(() => {
    logout().then((data) => {
      if (data)
        NavigateTo("/Signin")
      else
        NavigateTo("/Signin")
    });
    ;
  }, [NavigateTo]);

  return (
    <Button variant="contained" color="secondary" onClick={handleSubmit}>
      Logout
    </Button>
  );
};
