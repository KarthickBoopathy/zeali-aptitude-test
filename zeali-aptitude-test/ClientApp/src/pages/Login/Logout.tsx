import { Button } from "@material-ui/core";

export const Logout = () => {
  const handleSubmit = () => {
    localStorage?.clear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" variant="contained" color="secondary">
        Logout
      </Button>
    </form>
  );
};
