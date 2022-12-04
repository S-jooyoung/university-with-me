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
import { ThemeColor, CompetitionData, GetCompetitionResponse } from "src/@core/layouts/types";
import { useState, useEffect } from "react";

const handleCompetitionColor = (competitionRatio: number): ThemeColor => {
  if (competitionRatio >= 0.0 && competitionRatio <= 3.2) return "success";
  else if (competitionRatio >= 3.3 && competitionRatio <= 6.2) return "warning";
  else if (competitionRatio >= 6.3) return "error";
  else return "success";
};

const DashboardTable = ({ datas, loading, error }: GetCompetitionResponse) => {
  let [dataParse, setDataParse] = useState<CompetitionData[]>([]);

  useEffect(() => {
    const data = datas.map((data) => {
      if (data.admissionType) {
        data.admissionType = data.admissionType.replace(/경쟁률 현황/gi, "");
      }
    });
  }, [datas]);
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>대학</TableCell>
              <TableCell>전형</TableCell>
              <TableCell>모집학과</TableCell>
              <TableCell align="center">모집인원</TableCell>
              <TableCell align="center">지원인원</TableCell>
              <TableCell align="center">경쟁률</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data: CompetitionData) => (
              <TableRow hover key={data.id} sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}>
                <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}>{data.universityName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{data.admissionType}</TableCell>
                <TableCell>{data.departmentName}</TableCell>
                <TableCell align="center">{data.recruitmentCount}</TableCell>
                <TableCell align="center">{data.applicantsCount}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${data.competitionRatio} : 1`}
                    color={handleCompetitionColor(data.competitionRatio)}
                    sx={{
                      height: 24,
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                      "& .MuiChip-label": { fontWeight: 500 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
