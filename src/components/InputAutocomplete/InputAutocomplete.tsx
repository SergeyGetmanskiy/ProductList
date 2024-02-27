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
    if (items?.length > 0) {
      setOptions([...items as Items[]]);
    }
  }, [items]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.product === value.product}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.product}
      options={options}
      loading={loading}
      loadingText="Загружаю..."
      renderInput={(params) => (
        <TextField
          {...params} 
          label="Поиск по названию"
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


