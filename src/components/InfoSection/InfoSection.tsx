import { Card, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

export default function InfoSection({text}: {text: string}) {
  return (
    <Card sx={{position: 'absolute', bottom: 0, width: '100%', border: 'none'}} >
      <Typography color={red[800]} align='center' variant="body1" fontSize="xl" sx={{ mb: 0.5 }}>
        {text}
      </Typography>
    </Card>
  );
}