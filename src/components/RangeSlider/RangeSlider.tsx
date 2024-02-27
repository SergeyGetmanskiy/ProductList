import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export default function RangeSlider() {
  const [value, setValue] = useState<number[]>([10, 40]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Typography align='center'>Диапазон цен</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
      />
    </Box>
  );
}