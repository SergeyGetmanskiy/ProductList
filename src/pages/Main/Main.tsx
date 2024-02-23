import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"
import { useSearch } from "../../utils/hooks/useSearch"

function Main() {

  const {ids, items} = useSearch();
  console.log(ids);
  console.log(items);

  return (
    <>
      <ProductFilter />
      <ProductList />
    </>
  )
}

export default Main