//import { useEffect } from "react";
import { Box } from "@mui/material";
import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"
//import { useSearch } from "../../utils/hooks/useSearch"

function Main() {

/*   const {items} = useSearch();

  useEffect(() => {
    if(items?.length > 0) {
      console.log(items);
    }
  }, [items]); */

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'flex-start'}}>
      <ProductFilter />
      <ProductList />
    </Box>
  )
}

export default Main