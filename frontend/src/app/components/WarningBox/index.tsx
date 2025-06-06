import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function WarningBox() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">A identidade do(s) autor(es) do artigo deve permanecer anônima.</Alert>
     
    </Stack>
  );
}