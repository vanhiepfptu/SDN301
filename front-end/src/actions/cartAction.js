export const addToCart = (cart)  => {
    return {
        type: "ADD_TO_CART",
        payload: cart
    }
}

export const addDetail = (cart) => {
    return{
        type: "ADD_DETAIL",
        payload: cart
    }
}


export const removeItem = (cart) => {
  return{
    type: "REMOVE_ITEM",
    payload: cart
  }
}
export const increaseItem = (cart) => {
    return{
        type: 'INCREASE_ITEM',
        payload: cart
    }
}

export const decreaseItem = (cart) => {
  return {
    type: "DECREASE_ITEM",
    payload: cart,
  };
};

export const resetItem = () => {
  return {
    type: "RESET_ITEM",
    payload: null,
  }
}