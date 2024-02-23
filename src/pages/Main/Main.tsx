import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"
import { useSearch } from "../../utils/hooks/useSearch"

function Main() {

  const {Ids, Items} = useSearch();
  console.log(Ids);
  console.log(Items);
  
  return (
    <>
      <ProductFilter />
      <ProductList />
    </>
  )
}

export default Main