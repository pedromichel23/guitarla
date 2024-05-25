import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

const MIN_ITEMS = 1

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('guitarLa')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)
  
  useEffect(() => {
    setData(db)
  }, [])

  useEffect(() => {
    saveLocalStorage()
  }, [cart])

  function addCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id)
  {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        item.quantity++
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        item.quantity--
      }
      return item
    })
    setCart(updateCart)
  }

  function clearCart(){
    setCart([])
  }

  function saveLocalStorage() {
    localStorage.setItem('guitarLa', JSON.stringify(cart))
  }

  return (
    <>
    <Header 
    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}
    />  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map(guitar => <Guitar 
            key={guitar.id}
            id= {guitar.id}
            name={guitar.name}
            image={guitar.image}
            description={guitar.description}
            price={guitar.price}
            addCart={addCart} 
            />)}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
