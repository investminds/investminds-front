import { Grid, FormControlLabel, FormGroup, Checkbox, FormLabel, Button } from "@mui/material"
import React from 'react'
import Pilars from "./Pilars";
import AiText from "./AiText";

const Plan = () => {
  return (
    <>
      <Grid>
        <Pilars />
        <FormGroup>
          <FormLabel component="legend">Audit of current capabilities</FormLabel>
          <FormControlLabel required control={<Checkbox />} label="Do you have a defined, integrated digital marketing plan?" />
          <FormControlLabel required control={<Checkbox />} label="Do you have a defined marketing strategy?" />
          <FormControlLabel required control={<Checkbox />} label="Do you have a digital transformation change management plan?" />
          <FormControlLabel required control={<Checkbox />} label="Have you conducted an employee skills gap analysis?" />
          <FormControlLabel required control={<Checkbox />} label="Do you have employee development plans in place?" />
          <FormControlLabel required control={<Checkbox />} label="Is your AI and MarTech stack defined?" />
        </FormGroup>
        <Grid>
          <Grid>
            <Button>Send Request</Button>
          </Grid>
          <Grid>
            <AiText />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Plan;
