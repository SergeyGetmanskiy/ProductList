import ProductList from "../../components/ProductList/ProductList"
import ProductFilter from "../../components/ProductFilter/ProductFilter"
import { useState } from "react"

function Main() {

  const [productList, setProductList] = useState([]);

  return (
    <>
      <ProductFilter setProductList={setProductList} />
      <ProductList productList={productList} />
    </>
  )
}

export default Main