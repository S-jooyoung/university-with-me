// ** MUI Components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Img = styled("img")(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("lg")]: {
    height: 400,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 320,
  },
  [theme.breakpoints.up("lg")]: {
    height: 450,
    marginTop: theme.spacing(13),
  },
}));
const Temporary = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <BoxWrapper>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Coming Soon
        </Typography>
        <Typography variant="h5" sx={{ mb: 1, fontSize: "1.5rem !important" }}>
          곧 출시 예정입니다.
        </Typography>
        <Typography variant="body2">출시일: 2022.12.29. ~ 2023.01.02</Typography>
      </BoxWrapper>
      <Img alt="error-illustration" src="/images/pages/404.png" />
    </Box>
  );
};

export default Temporary;
