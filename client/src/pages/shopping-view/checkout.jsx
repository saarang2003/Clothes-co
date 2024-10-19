import { useSelector } from "react-redux"


function ShoppingCheckout() {
  const {cartItems} = useSelector((state)=> state.shopCart)
  const {user} = useSelector((state) =>state.auth);
  

  return (
    <div>ShoppingCheckout</div>
  )
}

export default ShoppingCheckout