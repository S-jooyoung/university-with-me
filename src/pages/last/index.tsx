// ** MUI Imports
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

// ** Components Imports
import Table from "src/views/dashboard/Table";

// ** Icons Imports
import Magnify from "mdi-material-ui/Magnify";

// ** Custom Hooks
import usePosts from "src/hooks/usePosts";

import React, { useState } from "react";

export default function Last() {
  const [keyword, setKeyword] = useState("");
  const { datas, loading, error } = usePosts(keyword, "department/last/", "");

  const handleEnter = (e: any) => {
    setKeyword(e.target.value);
  };

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>경쟁률</InputLabel>
            <Select label="Status" defaultValue="competitionRatio,ASC">
              <MenuItem value="competitionRatio,DESC">낮은순</MenuItem>
              <MenuItem value="competitionRatio,ASC">높은순</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>대학별</InputLabel>
            <Select label="Status" defaultValue="">
              <MenuItem value=""></MenuItem>
              <MenuItem value=""></MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>지역</InputLabel>
            <Select label="Status" defaultValue="전체">
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="">전체</MenuItem>
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
        <Grid item xs={12}>
          <Table datas={datas} loading={loading} error={error} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
}
