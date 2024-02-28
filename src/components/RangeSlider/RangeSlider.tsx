import { Dispatch, SetStateAction, useMemo } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, Stack, Typography } from '@mui/material';

export default function RangeSlider({range, loading, setValue, value}: {range: number[], loading: boolean, setValue: Dispatch<SetStateAction<number>>, value: number[] | number}) {
  // @ts-expect-error: event declared but never used
  const handleChange = (event: Event, newValue: number[] | number) => {
    setValue(newValue as number);
  };
  const marks = useMemo(() => range.map(price => { return {"value": price}}), [range]);
  return (
    <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Stack sx={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2}}>
        <Typography align='center'>Выберите цену</Typography>
        <Button onClick={() => setValue(0)} size='sm' variant='outlined'>Сброс</Button>
      </Stack>
      <Slider
        value={value}
        min={range[0]}
        max={range[range.length - 1]}
        defaultValue={0}
        marks={marks}
        step={null}
        onChange={handleChange}
        valueLabelDisplay="on"
        disabled={loading}
      />
    </Box>
  );
}