import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const Pilars = () => {
  return (
    <FormControl>
      <FormLabel id="pillars-group-label">Pillars of Digital Success</FormLabel>
      <RadioGroup row aria-labelledby="pillars-group-label" name="pillars-group-label">

        <FormControlLabel value="planing" control={<Radio />} label="Planning and governance" />
        <FormControlLabel value="goals" control={<Radio />} label="Goals and measurement" />
        <FormControlLabel value="media" control={<Radio />} label="Media" />
        <FormControlLabel value="content" control={<Radio />} label="Content" />
        <FormControlLabel value="experience" control={<Radio />} label="Experience" />
        <FormControlLabel value="conversational" control={<Radio />} label="Conversational messaging" />

      </RadioGroup>
    </FormControl>
  );
}
export default Pilars;