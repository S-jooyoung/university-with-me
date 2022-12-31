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
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { MobileOnlyView, BrowserView } from "react-device-detect";
import Link from "next/link";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

const handleCompetitionColor = (competitionRatio: number): ThemeColor => {
  if (competitionRatio >= 0.0 && competitionRatio <= 3.2) return "success";
  else if (competitionRatio >= 3.3 && competitionRatio <= 6.2) return "warning";
  else if (competitionRatio >= 6.3) return "error";
  else return "success";
};

const handledepartmentName = (departmentName: string) => {
  let departmentNameList = departmentName.split("|");

  return departmentNameList;
};

const handleApplicantsCount = (applicantsCount: string) => {
  let applicantsCountList = applicantsCount.split("|");

  return applicantsCountList;
};

const DashboardTable = ({ datas, status, error }: any) => {
  return (
    <Card>
      <TableContainer>
        <MobileOnlyView>
          <Table sx={{ minWidth: 350 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">대학﹒전형명﹒모집단위</TableCell>
                <TableCell>
                  <p>모집</p>
                  <p>-</p>
                  <p>지원</p>
                </TableCell>
                <TableCell align="center">경쟁률</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "loading" && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {status === "error" && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Alert severity="error">데이터를 불러올 수 없습니다.</Alert>
                  </TableCell>
                </TableRow>
              )}
              {status == "success" && (
                <>
                  {datas?.pages.map((group: any) =>
                    group.result.list.map((data: any, index: any) => (
                      <TableRow hover key={index} sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}>
                        <TableCell>
                          <Typography sx={{ fontWeight: 700 }}>{data.universityName}</Typography>
                          {handledepartmentName(data.departmentName).map((departmentName, index) => {
                            return (
                              <div key={index}>
                                <Typography>{departmentName}</Typography>
                              </div>
                            );
                          })}
                          {data.admissionType}
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{data.recruitmentCount}</Typography>-
                          {handleApplicantsCount(data.applicantsCount).map((applicantsCount, index) => {
                            return (
                              <div key={index}>
                                <Typography>{applicantsCount}</Typography>
                              </div>
                            );
                          })}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={data.competitionRatio === -1 ? `0` : `${data.competitionRatio} : 1`}
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
        </MobileOnlyView>

        <BrowserView>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 225 }}>대학</TableCell>
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
              {status === "loading" && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}

              {status === "error" && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Alert severity="error">데이터를 불러올 수 없습니다.</Alert>
                  </TableCell>
                </TableRow>
              )}
              {status == "success" && (
                <>
                  {datas?.pages.map((group: any) =>
                    group.result.list.map((data: any, index: any) => (
                      <Link href={data.receptionUrl ? data.receptionUrl : ""}>
                        <TableRow hover key={index} sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}>
                          <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                              <Typography sx={{ fontWeight: 700 }}>{data.universityName}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {handledepartmentName(data.departmentName).map((departmentName, index) => {
                              return (
                                <div key={index}>
                                  <Typography>{departmentName}</Typography>
                                </div>
                              );
                            })}
                            {data.admissionType}
                          </TableCell>

                          <TableCell align="center">
                            <Typography>{data.recruitmentCount}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            {handleApplicantsCount(data.applicantsCount).map((applicantsCount, index) => {
                              return (
                                <div key={index}>
                                  <Typography>{applicantsCount}</Typography>
                                </div>
                              );
                            })}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={data.competitionRatio === -1 ? `0` : `${data.competitionRatio} : 1`}
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
                      </Link>
                    ))
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </BrowserView>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
