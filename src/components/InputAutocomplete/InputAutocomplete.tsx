import { useState, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Items } from '../../types/Types';

export default function InputAutocomplete({items, loading, label, optionKey}: {
  items: Item[],
  loading: boolean,
  label: string, 
  optionKey: string
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Items[]>([]);

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
      isOptionEqualToValue={(option, value) => option[optionKey] === value[optionKey]}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option[optionKey]}
      options={options.filter((option) => option[optionKey])}
      loading={loading}
      loadingText="Загружаю..."
      noOptionsText="Совпадений не найдено"
      renderInput={(params) => (
        <TextField
          {...params} 
          label={label}
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


