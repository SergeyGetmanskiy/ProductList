import { useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"
import { useSearch } from "../../utils/hooks/useSearch"

function Main() {

  const {items} = useSearch();

  useEffect(() => {
    if(items?.length > 0) {
      console.log(items);
    }
  }, [items]);

  return (
    <>
      <ProductFilter />
      <br />
      <ProductList />
    </>
  )
}

export default Main