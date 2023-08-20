import React, { useState } from "react";
import { cartProducts } from "../../Data/ProductData";
import "./Cart.css";
import { DeleteIcon } from "../../Components/SharedIcons";
import {
  Breadcrumbs,
  CustomNumberInput,
  Footer,
  LargeScreenNavbar,
  NavbarTop,
  PopUpButton,
  Prize,
  TotalPrize,
} from "../../Components/SharedComponents";

const CartPage = () => {
  const name = "Cart Page";
  // Calculate the total prize of the products
  return (
    <>
      <NavbarTop />
      <LargeScreenNavbar />
      <Breadcrumbs name={name} />
      <CartSection />
      <Footer />
    </>
  );
};

export function CartSection() {
  const [productQuantities, setProductQuantities] = useState(
    cartProducts.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  // Calculate the total prize of the products with updated quantities
  const updatedCartProducts = cartProducts.map((product) => {
    const updatedProduct = { ...product };
    updatedProduct.quantity = productQuantities[product.id];
    return updatedProduct;
  });

  const totalPrize = updatedCartProducts.reduce((accumulator, product) => accumulator + product.variants[0].price * product.quantity, 0);

  const totalItems = updatedCartProducts.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );

  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleClick = () => {};
  return (
    <div className='row  section-padding '>
      <div className='col-12 col-lg-6 '>
        {cartProducts.map((product) => {
          const { id, name, variants } = product;
          const variant = variants[0]; // Get the first variant

          const isValidPrice = typeof variant.price === "number";

          return (
            <div
              className='border-1 mt-4 rounded-lg'
              key={id}
            >
              <div className='   border-gray-200 dark:border-gray-700 flex'>
                <div className='cart-page  w-1/3 md:mb-0'>
                  <div className=' flex   '>
                    <img
                      src={product.displayImage}
                      alt=''
                      className='object-cover w-full h-32 rounded-md'
                    />
                  </div>
                </div>
                <div className='w-full pl-5 pr-3 pt-2 md:1/3'>
                  <div className='flex justify-between'>
                    <div className='cart-content'>
                      <h5 className='dark:text-gray-400'>{name}</h5>
                      <div className='d-flex'>
                        <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Quantity:</p>
                        <div className='quantity-input ml-3'>
                          <CustomNumberInput
                            size='lg'
                            maxW={40}
                            defaultValue={productQuantities[id]} // Pass the quantity from state
                            min={1}
                            max={10}
                            onQuantityChange={(newQuantity) => handleQuantityChange(id, newQuantity)} // Handle quantity change
                          />
                        </div>
                      </div>
                      <div className='d-flex'>
                        <PopUpButton
                          toastMessage='removed from cart'
                          buttonLabel='Remove'
                          onClick={handleClick}
                          className='wishlist-remove-btn'
                          icon={<DeleteIcon />}
                        />
                      </div>
                    </div>
                    <Prize
                      prize={isValidPrice ? variant.price : 0}
                      mrp={variant.mrp}
                      h4ClassName='prize'
                      parentDivClassName='prize-style'
                      pClassName='mrp-style'
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='col-12 col-lg-6'>
        <TotalPrize totalPrize={totalPrize} totalItems ={totalItems} />
      </div>
    </div>
  );
}

export default CartPage;
