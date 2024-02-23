import { Button } from "@mui/material"
import { useSearch } from "../../utils/hooks/useSearch"

function ProductFilter() {

  const { Ids, getIds, getItems} = useSearch();
  const handleIdsClick = () => {
    getIds.mutate();
  }
  const handleItemsClick = () => {
    getItems.mutate(Ids);
  }

  return (
    <>
      <Button onClick={handleIdsClick} variant='contained'>get Ids</Button>
      <Button onClick={handleItemsClick} variant='contained'>get Items</Button>
    </>
  )
}

export default ProductFilter