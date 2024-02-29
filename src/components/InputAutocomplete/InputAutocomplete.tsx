import { useState, useEffect, Fragment, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function InputAutocomplete({items, loading, label, setValue}: {
  items: string[],
  loading: boolean,
  label: string,
  setValue: Dispatch<SetStateAction<string | ''>> 
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly string[]>([]);
  
  useEffect(() => {
    if (items?.length > 0) {
      setOptions([...items]);
    }
  }, [items]);

  return (
    <Autocomplete
    // @ts-expect-error: event declared but never used
      onChange={(event: SyntheticEvent<Element, Event>, newValue: string | null) => {
        if(newValue) {
          setValue(newValue);
        } else {
          setValue('');
        }
      }}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionKey={(option) => option}
      getOptionLabel={(option) => option}
      options={options.filter((option) => option)}
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


