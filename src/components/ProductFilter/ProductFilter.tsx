import { Button } from "@mui/material"
import { api } from "../../utils/api"

function ProductFilter({setProductList}) {

  const handleClick = () => {
    api.getIds()
    .then((res) => {
      console.log(res);
      api.getItems(res)
      .then((res) => {
        console.log(res.result);
        setProductList(res.result);
      })
    })
  }

  return (
    <>
      <Button onClick={handleClick} variant='contained'>click me!</Button>
    </>
  )
}

export default ProductFilter