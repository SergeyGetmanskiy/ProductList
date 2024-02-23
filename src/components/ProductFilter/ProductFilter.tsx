import { Button } from "@mui/material"
import { useSearch } from "../../utils/hooks/useSearch"

function ProductFilter() {

  const { getIds } = useSearch();
  const handleIdsClick = () => {
    getIds.mutate();
  }

  return (
    <>
      <Button onClick={handleIdsClick} variant='contained'>get Ids</Button>
    </>
  )
}

export default ProductFilter