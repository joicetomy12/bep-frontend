import React from 'react';

import { useCountry } from '../providers/countryProvider';

const Cart = ({ labelData, cartData, updateCartItem, cartPricewithSymbol }) => {
  const { genUrl } = useCountry();
  const redirectToCart = () => {
    // window.location = `https://www.fjallraven.com` + genUrl('checkout');
    window.open(`https://www.fjallraven.com` + genUrl('checkout'), '_blank');
  };

  return (
    <>
      <div className="cart--root">
        {labelData && (
          <div
            className="cart--cart"
            role="dialog"
            aria-labelledby="cartDialogTitle"
          >
            <div id="mini-cart" className="v-cloak">
              <div className="cart--wrapper">
                <span id="cartDialogTitle" className="cart--title">
                  {labelData.yourCartLabel}
                </span>
                {cartData && cartData.cart && cartData.cart.lineItems && (
                  <ul className="product-list--root">
                    {cartData.cart.lineItems.map(item => (
                      <li className="product-list--item" key={item.id}>
                        <span
                          tabIndex={0}
                          className="product-list--remove"
                          onClick={() => updateCartItem(item, 0)}
                        />{' '}
                        <a href={item.url} className="product-list--image">
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlternateText}
                          />
                        </a>
                        <div className="product-list--wrapper">
                          <a href={item.url} className="product-list--title">
                            {item.name}
                          </a>
                          <div className="product-list--content">
                            <div className="product-list--info">
                              <div className="product-list--color">
                                <span>
                                  {item.colorCode} - {item.color}
                                </span>{' '}
                                <span
                                  className="product-list--color-code"
                                  style={{
                                    backgroundColor: `${item.colorHex}`
                                  }}
                                />
                              </div>
                              <div>
                                <span>{item.displaySize}</span>
                              </div>
                            </div>
                            <div className="select--root product-list--select">
                              <label htmlFor="qty0">
                                {' '}
                                {labelData.quantityLabel}
                              </label>{' '}
                              <select
                                id="qty0"
                                aria-label="Quantity"
                                className="select--select"
                                onChange={e =>
                                  updateCartItem(item, e.target.value)
                                }
                                value={item.quantity}
                              >
                                {[...Array(item.maxQuantity).keys()].map(x => (
                                  <option key={x + 1}>{x + 1}</option>
                                ))}
                              </select>
                            </div>
                            <span className="product-list--price">
                              {item.placedPriceFormatted}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <dl className="totals--root">
                  <dt>{labelData.shippingCalculatedAtCheckoutLabel}</dt>
                  <dd />
                  <dt>{labelData.taxCalculatedAtCheckoutLabel}</dt>
                  <dd />
                  <dt>{labelData.subTotalLabel}</dt>
                  <dd>
                    {cartData && cartData.cart
                      ? cartData.cart.subTotalFormatted
                      : 0.0 + ',00 ' + cartPricewithSymbol}
                  </dd>
                  {/**/} {/**/}
                  <hr />
                  <dt>
                    <strong>{labelData.totalLabel}</strong> {/**/}
                  </dt>
                  <dd>
                    <strong>
                      {cartData && cartData.cart
                        ? cartData.cart.totalFormatted
                        : 0.0 + ',00 ' + cartPricewithSymbol}
                    </strong>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="cart--checkout">
              <button
                id="btnCheckout"
                className="button--root button--red cart--button"
                data-url={genUrl('/checkout')}
                onClick={redirectToCart}
              >
                {labelData.checkoutLabel}
              </button>
              <div className="cart--methods">
                <span className="secure-payment">
                  {labelData.weAcceptLabel}
                </span>
                {/* {labelData.paymentMethodImageUrls && (
                  <div className="cart-icons-list">
                    {labelData.paymentMethodImageUrls.map(img => (
                      <img src={img} alt={''} key={img} />
                    ))}
                  </div>
                )} */}
                {labelData.paymentMethodImageUrls && (
                  <div className="cart-icons-list">
                    {labelData.paymentMethodImageUrls.map(img => {
                      return (
                        <img
                          key={img}
                          src={`https://www.fjallraven.com/${img}`}
                          alt=""
                          className="cartCard"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
