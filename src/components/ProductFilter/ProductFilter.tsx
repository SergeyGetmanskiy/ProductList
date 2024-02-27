import { Button, Paper } from "@mui/material"
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete"
import RangeSlider from "../RangeSlider/RangeSlider";
import { useSearch } from "../../utils/hooks/useSearch"

function ProductFilter() {
  const {products, brands, prices, getProducts, getBrands, getPrices} = useSearch();
  return (
    <Paper sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, gap: 4}}>
      <InputAutocomplete items={products} loading={getProducts.isLoading} label="Поиск по названию"/>
      <InputAutocomplete items={brands} loading={getBrands.isLoading} label="Поиск по бренду"/>
      <RangeSlider range={prices} loading={getPrices.isLoading} />
      <Button variant="contained">Поиск</Button>
    </Paper>
  )
}

export default ProductFilter