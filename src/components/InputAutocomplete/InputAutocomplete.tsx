import { useState, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearch } from '../../utils/hooks/useSearch';
import { Items } from '../../types/Types';

export default function InputAutocomplete() {
  const {items, getItems} = useSearch();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Items[]>([]);
  const loading = getItems.isLoading;

  useEffect(() => {
    console.log(loading, items)
    let active = true;
    if (!loading) {
      return undefined;
    } 
    if (active) {
      setOptions([...items as Items[]]);
    }
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.product === value.product}
      getOptionLabel={(option) => option.product}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params} 
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}


