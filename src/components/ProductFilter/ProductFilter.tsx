import { useState, FormEvent } from "react";
import { Button, Paper } from "@mui/material"
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete"
import RangeSlider from "../RangeSlider/RangeSlider";
import LoadingPopup from "../LoadingPopup/LoadingPopup";
import { useSearch } from "../../utils/hooks/useSearch"
import InfoSection from "../InfoSection/InfoSection";

function ProductFilter() {
  const {getOptions, getSearchResults, isLoading} = useSearch();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const handleSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    getSearchResults.mutate(selectedProduct, selectedBrand, selectedPrice)
  }
  return (
    <Paper onSubmit={handleSubmit} component={'form'} sx={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', p: '30px', gap: 4}}>
      <InputAutocomplete items={getOptions.products} loading={getOptions.isLoading} label="Поиск по названию" setValue={setSelectedProduct}/>
      <InputAutocomplete items={getOptions.brands} loading={getOptions.isLoading} label="Поиск по бренду" setValue={setSelectedBrand}/>
      <RangeSlider range={getOptions.prices} loading={getOptions.isLoading} setValue={setSelectedPrice} value={selectedPrice} />
      <Button type="submit" variant="contained" disabled={isLoading}>Поиск</Button>
      <LoadingPopup open={getSearchResults.isLoading} />
      {
        getSearchResults.message && <InfoSection text={getSearchResults.message}/>
      }
      {
        getOptions.message && <InfoSection text={getOptions.message}/>
      }
    </Paper>
  )
}

export default ProductFilter