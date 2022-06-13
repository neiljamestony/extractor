import { useCallback } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AttachFile } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

export default function FileComponent({ setFile, file }) {
  const useStyle = makeStyles(() => ({
    fileComponent: {
      borderStyle: "dashed",
      border: "2px solid #1c7ed9",
      borderRadius: 20,
      fontFamily: "Poppins",
      height: '400px'
    },
    selectedImage: {
      backgroundImage: `url(${file})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "400px",
      width: "100%",
    },
  }));
  const styles = useStyle();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    getBase64(acceptedFiles[0]).then((res) => setFile(res));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      {file === "" ? (
        <Box
          className={styles.fileComponent}
          {...getRootProps()}
        >
          <Box
            mt={23}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <input {...getInputProps()} />
            <Box>
              <AttachFile sx={{ color: "#1c7ed9" }} size="medium" />
            </Box>
            <Box fontSize={14} color="#1c7ed9">
              Click to Select / Drag your files here
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box height="400px" className={styles.selectedImage}></Box>
        </>
      )}
    </>
  );
}