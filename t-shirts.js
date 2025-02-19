const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'grey-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

// need to make a card component for each shirt to handle things independently

// ShirtCard component
const ShirtCard = ({shirt, onBuy}) => {
  // default on select should be 1; will always be at least one, if zero or less we don't display the select anyways
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  const handleBuy = () => {
    onBuy(shirt.title, selectedQuantity);
  };

  return (
    <div className="card">
      <img src={`images/${shirt.image}`} alt={shirt.title} />
      <div className="container">
        <h2>{shirt.title}</h2>
        <p><b>${shirt.price}</b></p>
        {/* Displays the stock, select, and button if the stock is above 0. Otherwise simply displays the out of stock message */}
        {shirt.stock > 0 ? (
          <div>
            <p>{shirt.stock} left!</p>
            <div className = "buy">
              {/* iterates through numbers down to 1 to create select options for numbers */}
              <select value={selectedQuantity} onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}>
                {[...Array(shirt.stock).keys()].map(n => (
                  <option key={n + 1} value={n + 1}>{n + 1}</option>
                ))}
              </select>
              {/* tiggers the Buy handler on click, which reduces the stock by the number given by the select which determines the tshirts item quantity. */}
              <button onClick={handleBuy}>Buy</button>
            </div>
          </div>
        ) : (
          // displays red out of stock message if the shirt's stock is 0.
          <p className="outOfStock">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

// App function
const App = () => {
  // Variables
  const [shirtList, setShirtList] = React.useState(tshirts);
  // Functions

  // handleBuy
  // grab title and quantity
  // find and update shirt stock with the title by the stock minus the quantity
  const handleBuy = (title, quantity) => {
    setShirtList(prevList => prevList.map(shirt =>
      shirt.title === title ? { ...shirt, stock: shirt.stock - quantity } : shirt
    ));
  };

// need to display all shirts in a list
// map all shirts from tshirts into their own shirtCard
  return (
    <div>
      <h1>T-Shirts</h1>
      <div className="shirts">
        {
          shirtList.map((shirt) => (
          <ShirtCard key={shirt.title} shirt={shirt} onBuy={handleBuy} />
        ))
        }
      </div>
    </div>
  )
}

// Set ROOT
const root = ReactDOM.createRoot(document.getElementById('root'))

// render App
root.render(<App />);