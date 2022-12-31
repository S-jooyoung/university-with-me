// ** MUI Imports
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

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
  const [keyword, setKeyword] = useState("");
  const [competition, setCompetition] = useState("competitionRatio,DESC");
  const [degree, setDegree] = useState("전체");
  const [area, setArea] = useState("전체");

  const bottom: React.MutableRefObject<null> = useRef(null);

  const { data, fetchNextPage, isFetchingNextPage, status, error, refetch } = usePosts("[last]", keyword, "last/department", competition, degree, area);

  const handleEnter = (e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const handleChangeCompetition = (e: SelectChangeEvent) => {
    e.preventDefault();
    setCompetition(e.target.value as string);
  };

  const handleChangeDegree = (e: SelectChangeEvent) => {
    e.preventDefault();
    setDegree(e.target.value as string);
  };

  const handleChangeArea = (e: SelectChangeEvent) => {
    e.preventDefault();
    setArea(e.target.value as string);
  };

  useEffect(() => {
    refetch();
  }, [keyword, competition, degree, area]);

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
            <Select label="competition" value={competition} onChange={handleChangeCompetition}>
              <MenuItem value="competitionRatio,DESC">높은순</MenuItem>
              <MenuItem value="competitionRatio,ASC">낮은순</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>대학별</InputLabel>
            <Select label="university" value={degree} onChange={handleChangeDegree}>
              <MenuItem value="전체">전체</MenuItem>
              <MenuItem value="4년제">4년제</MenuItem>
              <MenuItem value="전문대">전문대</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>지역</InputLabel>
            <Select label="region" value={area} onChange={handleChangeArea}>
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
            size="medium"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleEnter(e);
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
          <Table datas={data} status={status} error={error} />
          <div ref={bottom} />
        </Grid>
        <Grid item xs={12} sm={12}>
          {isFetchingNextPage && <Skeleton />}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
}
