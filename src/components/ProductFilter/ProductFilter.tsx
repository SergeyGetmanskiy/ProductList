import { Button, Paper } from "@mui/material"
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete"
import RangeSlider from "../RangeSlider/RangeSlider";
import { useSearch } from "../../utils/hooks/useSearch"

function ProductFilter() {
  const {items, getItems} = useSearch();
  const loading = getItems.isLoading;

  return (
    <Paper sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, gap: 4}}>
      <InputAutocomplete items={items} loading={loading} label="Поиск по названию" optionKey="product" />
      <InputAutocomplete items={items} loading={loading} label="Поиск по бренду" optionKey="brand" />
      <RangeSlider />
      <Button variant="contained">Поиск</Button>
    </Paper>
  )
}

export default ProductFilter