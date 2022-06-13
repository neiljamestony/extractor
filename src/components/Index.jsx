import { Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";
import Tesseract from "tesseract.js";
import FileComponent from "./FileComponent";
import ExtractedFileComponent from "./ExtractedFileComponent";

const ExtractorButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#1c7ed9",
  textTransform: "none",
});

const Title = styled(Box)({
    fontFamily: 'Poppins',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
    color: '#1c7ed9'
})

const Index = () => {
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const extractFile = () => {
    setLoader(true);
    Tesseract.recognize(file).then(function (result) {
      setLoader(false);
      const {
        data: { lines },
      } = result;
      setExtractedText(lines);
    });
  };

  const reset = () => {
    setExtractedText("");
    setFile("");
    setLoader(false);
  };

  return (
    <Box mt={10} p={2}>
        <Title>EXTRACT TEXT FROM IMAGE USING TESSERACT.js</Title>
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={6}>
                <FileComponent setFile={setFile} file={file} />
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
                <ExtractedFileComponent loader={loader} data={extractedText} />
                <Box width="80%" justifyContent="space-between" mt={2}>
                    <Grid container spacing={2}>
                        <Grid item lg={4} md={4} xs={4}>
                            <ExtractorButton
                            variant="contained"
                            disabled={file === "" || loader || extractedText !== ""}
                            onClick={() => extractFile()}
                            fullWidth
                            >
                            {loader ? "SCANNING" : "EXTRACT"}
                            </ExtractorButton>
                        </Grid>
                        <Grid item lg={4} md={4} xs={4}>
                            <ExtractorButton
                            variant="contained"
                            disabled={extractedText === ""}
                            onClick={() => reset()}
                            fullWidth
                            >
                            RESET
                            </ExtractorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    </Box>
  );
};

export default Index;