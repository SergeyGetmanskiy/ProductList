import { Button, Paper } from "@mui/material"
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete"
import RangeSlider from "../RangeSlider/RangeSlider";
import { useSearch } from "../../utils/hooks/useSearch"
import { useState } from "react";

function ProductFilter() {
  const {getProducts, getBrands, getPrices, getSearchResults, buttonDisabled} = useSearch();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchResults.mutate(selectedProduct, selectedBrand, selectedPrice)
  }
  return (
    <Paper onSubmit={handleSubmit} component={'form'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, gap: 4}}>
      <InputAutocomplete items={getProducts.products} loading={getProducts.isLoading} label="Поиск по названию" setValue={setSelectedProduct}/>
      <InputAutocomplete items={getBrands.brands} loading={getBrands.isLoading} label="Поиск по бренду" setValue={setSelectedBrand}/>
      <RangeSlider range={getPrices.prices} loading={getPrices.isLoading} setValue={setSelectedPrice} value={selectedPrice} />
      <Button type="submit" variant="contained" disabled={buttonDisabled}>Поиск</Button>
    </Paper>
  )
}

export default ProductFilter