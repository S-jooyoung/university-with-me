// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

const handleCompetitionColor = (competitionRatio: number): ThemeColor => {
  if (competitionRatio >= 0.0 && competitionRatio <= 3.2) return "success";
  else if (competitionRatio >= 3.3 && competitionRatio <= 6.2) return "warning";
  else if (competitionRatio >= 6.3) return "error";
  else return "success";
};

const DashboardTable = ({ datas, status, error }: any) => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 200 }}>대학</TableCell>
              <TableCell>전형명﹒모집단위</TableCell>
              <TableCell align="center" sx={{ width: 80 }}>
                모집인원
              </TableCell>
              <TableCell align="center" sx={{ width: 80 }}>
                지원인원
              </TableCell>
              <TableCell align="center" sx={{ width: 150 }}>
                경쟁률
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status === "loading" && <TableRow></TableRow>}
            {status === "error" && <TableRow>{error.message}</TableRow>}
            {status == "success" && (
              <>
                {datas?.pages.map((group: any) =>
                  group.result.map((data: any, index: any) => (
                    <TableRow hover key={index} sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}>
                      <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography sx={{ fontWeight: 700 }}>{data.universityName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 700 }}>{data.admissionType}</Typography>
                        {data.departmentName}
                      </TableCell>

                      <TableCell align="center">{data.recruitmentCount}</TableCell>
                      <TableCell align="center">{data.applicantsCount}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${data.competitionRatio} : 1`}
                          color={handleCompetitionColor(data.competitionRatio)}
                          sx={{
                            height: 24,
                            fontSize: "0.75rem",
                            minWidth: "67px",
                            textTransform: "capitalize",
                            "& .MuiChip-label": { fontWeight: 500 },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
