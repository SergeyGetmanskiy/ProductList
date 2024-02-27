import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export default function RangeSlider({range, loading}: {range: number[], loading: boolean}) {
  const [value, setValue] = useState<number>(0);
  // @ts-expect-error: event declared but never used
  const handleChange = (event: Event, newValue: number[] | number) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Typography align='center'>Выберите цену</Typography>
      <Slider
        value={value}
        min={range[0]}
        max={range[1]}
        onChange={handleChange}
        valueLabelDisplay="on"
        disabled={loading}
      />
    </Box>
  );
}