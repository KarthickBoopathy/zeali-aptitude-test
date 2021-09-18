import { Button } from "@material-ui/core";

export const Logout = () => {
  const handleSubmit = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleSubmit}>
      Logout
    </Button>
  );
};
