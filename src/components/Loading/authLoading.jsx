
import { CircularProgress } from "@mui/material";
export const AuthLoadingUI = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-slate-300">
      <CircularProgress></CircularProgress>
    </div>

  );
}