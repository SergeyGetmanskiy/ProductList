import { Paper } from "@mui/material"
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete"

function ProductFilter() {


  return (
    <Paper sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4}}>
      <InputAutocomplete />
      
    </Paper>
  )
}

export default ProductFilter