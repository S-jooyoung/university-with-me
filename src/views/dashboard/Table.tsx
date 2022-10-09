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

interface RowType {
  university: string;
  area: string;
  recruitment: number;
  department: string;
  support: number;
  competition: string;
  competitionValue: string;
}

interface competitionObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const rows: RowType[] = [
  {
    competition: "professional",
    competitionValue: "2.5 : 1",
    recruitment: 5,
    university: "신안산대학교",
    support: 52,
    department: "경호경찰행정학과",
    area: "충주",
  },
  {
    recruitment: 6,
    support: 52,
    competition: "professional",
    competitionValue: "1.2 : 1",
    university: "신안산대학교",
    department: "사회복지학과",
    area: "충주",
  },
  {
    recruitment: 7,
    university: "신안산대학교",
    competition: "rejected",
    competitionValue: "6.9 : 1",
    support: 52,
    department: "아동보육과",
    area: "충주",
  },
  {
    recruitment: 7,
    competition: "resigned",
    competitionValue: "4.7 : 1",
    support: 52,
    university: "신안산대학교",
    department: "바이오생명공학과",
    area: "충주",
  },
  {
    competition: "professional",
    competitionValue: "3.1 : 1",
    recruitment: 7,
    support: 52,
    university: "신안산대학교",
    area: "충주",
    department: "웹디자인과",
  },
  {
    recruitment: 7,
    support: 52,
    university: "신안산대학교",
    competition: "professional",
    competitionValue: "2.5 : 1",
    department: "반려동물과",
    area: "충주 ",
  },
  {
    competition: "professional",
    competitionValue: "3.1 : 1",
    recruitment: 7,
    support: 52,
    university: "신안산대학교",
    area: "충주",
    department: "동물보건과",
  },
  {
    recruitment: 7,
    support: 52,
    university: "신안산대학교",
    competition: "professional",
    competitionValue: "2.1 : 1",
    area: "충주",
    department: "호텔조리과",
  },
];

const competitionObj: competitionObj = {
  rejected: { color: "error" },
  resigned: { color: "warning" },
  professional: { color: "success" },
};

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>대학</TableCell>
              <TableCell>모집학과</TableCell>
              <TableCell align="center">모집인원</TableCell>
              <TableCell align="center">지원인원</TableCell>
              <TableCell align="center">경쟁률</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow
                hover
                key={row.university}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}>
                <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}>
                      {row.university}
                    </Typography>
                    <Typography variant="caption">{row.area}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell align="center">{row.recruitment}</TableCell>
                <TableCell align="center">{row.support}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.competitionValue}
                    color={competitionObj[row.competition].color}
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
