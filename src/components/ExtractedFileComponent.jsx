import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  fileComponent: {
    borderStyle: "dashed",
    border: "2px solid #1c7ed9",
    borderRadius: 20,
    fontFamily: "Poppins",
    height: '400px',
    overflowY: 'scroll'
  },
}));

export default function ExtractedFileComponent({ loader, data }) {
  const styles = useStyle();

  return (
    <Box className={styles.fileComponent}>
      {loader ? (
        <Box>
          <CircularProgress size={50} color="primary" />
        </Box>
      ) : (
        <>{data !== "" && data.map((v, i) => <Box key={i} p={1}>{v.text}</Box>)}</>
      )}
    </Box>
  );
}