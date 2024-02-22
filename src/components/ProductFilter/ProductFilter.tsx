import { Button } from "@mui/material"
import { api } from "../../utils/api"

function ProductFilter() {

  const handleClick = () => {
    api.getIds()
    .then((res) => console.log(res))
  }

  return (
    <>
      <Button onClick={handleClick} variant='contained'>click me!</Button>
    </>
  )
}

export default ProductFilter