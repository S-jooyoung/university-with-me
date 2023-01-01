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

import Link from "next/link";

import { useMediaQuery } from "react-responsive";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";
import { UseAdsense } from "src/hooks/useAdsense";
import { useEffect, useState } from "react";

const handleCompetitionColor = (competitionRatio: number): ThemeColor => {
  if (competitionRatio >= 0.0 && competitionRatio <= 3.2) return "success";
  else if (competitionRatio >= 3.3 && competitionRatio <= 6.2) return "warning";
  else if (competitionRatio >= 6.3) return "error";
  else return "default";
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
  const [isMobile, setIsMobile] = useState(false);

  const mobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  useEffect(() => {
    if (mobile) setIsMobile(true);
  }, [mobile]);

  return (
    <Card>
      <TableContainer>
        {isMobile ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 160 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    대학
                  </Typography>
                  <Typography variant="body1">전형명</Typography>
                  <Typography variant="caption">모집단위</Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: 65, minWidth: 65 }}>
                  <p>모집</p>
                  <p>﹒</p>
                  <p>지원</p>
                </TableCell>
                <TableCell align="center">
                  <p>경쟁률</p>
                </TableCell>
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
                        <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {data.universityName}
                          </Typography>
                          {handledepartmentName(data.departmentName).map((departmentName, index) => {
                            return (
                              <div key={index}>
                                <Typography variant="body1">{departmentName}</Typography>
                              </div>
                            );
                          })}
                          <Typography variant="caption">{data.admissionType}</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ width: 65, minWidth: 65 }}>
                          <Typography variant="body2">{data.recruitmentCount}</Typography>
                          <Typography variant="body2">-</Typography>
                          {handleApplicantsCount(data.applicantsCount).map((applicantsCount, index) => {
                            return (
                              <div key={index}>
                                <Typography variant="body2">{applicantsCount}</Typography>
                              </div>
                            );
                          })}
                        </TableCell>
                        <TableCell align="center" sx={{ width: 67, minWidth: 67 }}>
                          <Chip
                            label={data.competitionRatio === -1 ? `제공안함` : `${data.competitionRatio} : 1`}
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
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 230 }}>대학</TableCell>
                <TableCell>전형명﹒모집단위</TableCell>
                <TableCell align="center" sx={{ width: 90 }}>
                  모집인원
                </TableCell>
                <TableCell align="center" sx={{ width: 90 }}>
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
                    group.result.list.map((data: any, index: any, id: number) => (
                      <Link href={data.receptionUrl ? data.receptionUrl : ""} key={data.id}>
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
                                  <Typography sx={{ fontWeight: 700 }}>{departmentName}</Typography>
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
                              label={data.competitionRatio === -1 ? `제공안함` : `${data.competitionRatio} : 1`}
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
        )}
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
