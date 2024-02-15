import { useState, useEffect } from "react";

function Java() {
  let [totalAmount, setTotalAmount] = useState(0);

  let [products, setProducts] = useState([
    {
      id: 1,
      name: "Television",
      price: 400000,
      total: 0,
      selectedQuantity: 0,
    },
    {
      id: 2,
      name: "Washing machine",
      price: 35000,
      total: 0,
      selectedQuantity: 0,
    },
  ]);

  function increment(id, ind) {
    let prs = [...products];

    if (prs[ind].id === id)
      prs.splice(ind, 1, {
        ...prs[ind],
        selectedQuantity: prs[ind].selectedQuantity + 1,
        total: prs[ind].total + 1,
      });

    // console.log(prs)

    setProducts(prs);
   
    // setTotalAmount(totalAmount=>{
    //   let amt = 0;
    //   for (let pr of products) {
    //     amt = totalAmount + pr.total * pr.price;
    //   }
    //   return amt
    // });
  }


  useEffect(() => {
    let amt = 0;
    for (let pr of products) {
      amt = amt + pr.total * pr.price;
    }
    setTotalAmount(amt);
  }, [products]);

  return (
    <>
      <table className="table text-center table-borderless w-75 mx-auto mt-5">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pr, index) => (
            <tr key={pr.id}>
              <td>{pr.name}</td>
              <td>{pr.price}</td>
              <td>
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="First group"
                >
                  <button type="button " className="btn btn-danger text-white">
                    -
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    {pr.selectedQuantity}
                  </button>
                  <button
                    type="button "
                    className="btn btn-success text-white"
                    onClick={() => increment(pr.id, index)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{pr.total * pr.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-end me-5">{totalAmount}</h1>
    </>
  );
}

export default Java;
