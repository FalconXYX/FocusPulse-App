import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import styles from "./progressBar.module.css";

const Bar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#484041 ",
    ...theme.applyStyles("dark", {
      backgroundColor: "#484041",
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));
interface ProgressBarProps {
  progress: number;
  name: string;
  time: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, name, time }) => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        <div className={styles.name}>{name}</div>
        <div className={styles.time}>{time}</div>
      </div>
      <div className={styles.bar}>
        <Bar variant="determinate" value={progress} />
      </div>
    </section>
  );
};

export default ProgressBar;
