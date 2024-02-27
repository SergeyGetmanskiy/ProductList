import { Paper } from "@mui/material"
import { useSearch } from "../../utils/hooks/useSearch"
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete"

function ProductFilter() {

    const {getItems} = useSearch();

  return (
    <Paper sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4}}>
      <InputAutocomplete />
      <Paper>{getItems.isLoading ? "Загрузка" : null}</Paper>
    </Paper>
  )
}

export default ProductFilter