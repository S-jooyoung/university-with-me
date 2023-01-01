// ** MUI Imports
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import moment from "moment";
import "moment/locale/ko";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Components Imports
import Table from "src/views/dashboard/Table";

// ** Icons Imports
import Magnify from "mdi-material-ui/Magnify";

// ** Custom Hooks
import usePosts from "src/hooks/usePosts";

import React, { useEffect, useRef, useState } from "react";
import { useObserver } from "src/hooks/useObserver";

export default function Last() {
  const [universityKeyword, setUniversityKeyword] = useState("");
  const [departmentKeyword, setDepartmentKeyword] = useState("");
  const [sort, setSort] = useState("competitionRatio,DESC");
  const [universityDegree, setUniversityDegree] = useState("전체");
  const [universityArea, setUniversityArea] = useState("전체");

  const bottom: React.MutableRefObject<null> = useRef(null);

  const { data, fetchNextPage, isFetchingNextPage, status, error, refetch, hasNextPage } = usePosts("[real]", universityKeyword, departmentKeyword, universityDegree, universityArea, sort, "department");

  const date = new Date(data?.pages[0].result.endTime);

  const endTime = moment(date).calendar();

  const handleEnterUniversity = (e: any) => {
    e.preventDefault();
    setUniversityKeyword(e.target.value);
  };

  const handleEnterDepartment = (e: any) => {
    e.preventDefault();
    setDepartmentKeyword(e.target.value);
  };

  const handleChangeSort = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSort(e.target.value as string);
  };

  const handleChangeDegree = (e: SelectChangeEvent) => {
    e.preventDefault();
    setUniversityDegree(e.target.value as string);
  };

  const handleChangeArea = (e: SelectChangeEvent) => {
    e.preventDefault();
    setUniversityArea(e.target.value as string);
  };

  useEffect(() => {
    refetch();
  }, [universityKeyword, departmentKeyword, sort, universityDegree, universityArea]);

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>경쟁률</InputLabel>
            <Select fullWidth label="competition" value={sort} onChange={handleChangeSort}>
              <MenuItem value="competitionRatio,DESC">높은순</MenuItem>
              <MenuItem value="competitionRatio,ASC">낮은순</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>대학별</InputLabel>
            <Select fullWidth label="university" value={universityDegree} onChange={handleChangeDegree}>
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="4년제">4년제</MenuItem>
              <MenuItem value="전문대">전문대</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>지역</InputLabel>
            <Select fullWidth label="region" value={universityArea} onChange={handleChangeArea}>
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="서울">서울</MenuItem>
              <MenuItem value="경기">경기</MenuItem>
              <MenuItem value="경남">경남</MenuItem>
              <MenuItem value="강원">강원</MenuItem>
              <MenuItem value="충북">충북</MenuItem>
              <MenuItem value="충남">충남</MenuItem>
              <MenuItem value="대구">대구</MenuItem>
              <MenuItem value="경북">경북</MenuItem>
              <MenuItem value="부산">부산</MenuItem>
              <MenuItem value="세종">세종</MenuItem>
              <MenuItem value="광주">광주</MenuItem>
              <MenuItem value="전북">전북</MenuItem>
              <MenuItem value="충북">충북</MenuItem>
              <MenuItem value="전남">전남</MenuItem>
              <MenuItem value="대전">대전</MenuItem>
              <MenuItem value="울산">울산</MenuItem>
              <MenuItem value="인천">인천</MenuItem>
              <MenuItem value="제주">제주</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            type="search"
            placeholder="대학교 이름을 검색해보세요!"
            size="medium"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleEnterUniversity(e);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Magnify fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            type="search"
            placeholder="학과 이름을 검색해보세요!"
            size="medium"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleEnterDepartment(e);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Magnify fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} justifyContent="flex-end">
          <Alert variant="filled" sx={{ backgroundColor: "#a883ed", color: "white", fontWeight: 600 }}>
            {endTime} 현황
          </Alert>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: "0" }}>
          <Table datas={data} status={status} error={error} />
          <div ref={bottom} />
        </Grid>
        {isFetchingNextPage && <p>계속 불러오는 중</p>}
      </Grid>
    </ApexChartWrapper>
  );
}
