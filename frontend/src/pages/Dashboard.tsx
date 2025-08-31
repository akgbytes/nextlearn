import { Button } from "@/components/ui/button";
import { useSnackbar } from "notistack";
const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div>
      Dashboard
      <Button
        onClick={() => {
          console.log("clicked");
          enqueueSnackbar("I love hooks", { variant: "success" });
        }}
      >
        Show snackbar
      </Button>
    </div>
  );
};

export default Dashboard;
