const initState = [];

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newList = [...state];
      const newCartItem = {
        _id: action.payload._id,
        productId: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        description: action.payload.description,
        quantity: 1,
        total: 1,
        totalPrice: action.payload.price,
      };
      const findProduct = newList.find((e) => e._id === action.payload._id);
      if (findProduct !== undefined) {
        const index = newList.findIndex((e) => e._id === findProduct._id);
        const newItem = {
          _id: findProduct._id,
          productId: action.payload._id,
          name: findProduct.name,
          price: findProduct.price,
          image: findProduct.image,
          description: action.payload.description,
          quantity: findProduct.total + 1,
          total: findProduct.total + 1,
          totalPrice: findProduct.price * (findProduct.total + 1),
        };
        newList.splice(index, 1, newItem);
      } else {
        newList.push(newCartItem);
      }

      return [...newList];
    }
    case "ADD_DETAIL": {
      const newList = [...state];
      const newItem = action.payload;
      const findIndex = newList.findIndex((item) => item._id === newItem._id);
      if (findIndex === -1) {
        newList.push(newItem);
      } else {
        const newTotal = newList[findIndex].total;
        const newCardItem = {
          _id: newItem._id,
          productId: action.payload._id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          description: newItem.description,
          quantity: +newItem.total + +newTotal,
          total: +newItem.total + +newTotal,
          totalPrice: newItem.price * (+newItem.total + +newTotal),
        };
        newList.splice(findIndex, 1, newCardItem);
      }
      return [...newList];
    }
    case "INCREASE_ITEM": {
      const newList = [...state];
      const newCartItem = {
        _id: action.payload._id,
        productId: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        description: action.payload.description,
        quantity: action.payload.total + 1,
        total: action.payload.total + 1,
        totalPrice: action.payload.price * (action.payload.total + 1),
      };
      const index = newList.findIndex(
        (item) => item._id === action.payload._id
      );
      newList.splice(index, 1, newCartItem);
      return [...newList];
    }
    case "DECREASE_ITEM": {
      const newList = [...state];
      if (action.payload.total === 0) {
        return [...state];
      } else {
        const newCartItem = {
          _id: action.payload._id,
          productId: action.payload._id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          description: action.payload.description,
          quantity: action.payload.total - 1,
          total: action.payload.total - 1,
          totalPrice: action.payload.price * (action.payload.total - 1),
        };
        const index = newList.findIndex(
          (item) => item._id === action.payload._id
        );
        newList.splice(index, 1, newCartItem);
        return [...newList];
      }
    }
    case "REMOVE_ITEM": {
      const newList = [...state];
      const index = newList.findIndex(
        (item) => item._id === action.payload._id
      );
      newList.splice(index, 1);
      return [...newList];
    }
    case "RESET_ITEM": {
      return [];
    }
    default:
      return state;
  }
};

export default cartReducer;
