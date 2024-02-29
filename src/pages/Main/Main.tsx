import { Box } from "@mui/material";
import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"

function Main() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'flex-start'}}>
      <ProductFilter />
      <ProductList />
    </Box>
  )
}

export default Main