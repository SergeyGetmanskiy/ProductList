import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"
import { useSearch } from "../../utils/hooks/useSearch"

function Main() {

  const {ids, items} = useSearch();
  console.log(ids);
  console.log(items);

/*   useEffect(() => {
    if(ids) {
      getItems.mutate()
    }
  }, [ids]); */


 /*  
  useEffect(() => {
  if(!getIds.isLoading) {
    const chunks = chunk(ids, 100);
    chunks.forEach((chunk) => {
      getItems.mutate(chunk);
    })
  } else return
}, [getIds.isLoading, ids, getItems]); */

  return (
    <>
      <ProductFilter />
      <br />
      <ProductList />
    </>
  )
}

export default Main