'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MenuItem, getMinPrice } from './menu-data';

export type CartItem = {
  item: MenuItem;
  quantity: number;
  selectedSize: string;   // e.g. '10"', 'Large', 'Regular'
  unitPrice: number;      // exact price for chosen size
};

// Unique key per item+size combo
export const cartKey = (itemId: string, size: string) => `${itemId}::${size}`;

type CartState = { items: CartItem[]; isOpen: boolean };

type CartAction =
  | { type: 'ADD_ITEM';    payload: { item: MenuItem; size: string; price: number } }
  | { type: 'REMOVE';      payload: string }
  | { type: 'SET_QTY';     payload: { key: string; qty: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = cartKey(action.payload.item.id, action.payload.size);
      const existing = state.items.find(i => cartKey(i.item.id, i.selectedSize) === key);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map(i =>
            cartKey(i.item.id, i.selectedSize) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, {
          item: action.payload.item,
          quantity: 1,
          selectedSize: action.payload.size,
          unitPrice: action.payload.price,
        }],
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => cartKey(i.item.id, i.selectedSize) !== action.payload) };
    case 'SET_QTY': {
      const next = state.items
        .map(i => cartKey(i.item.id, i.selectedSize) === action.payload.key ? { ...i, quantity: action.payload.qty } : i)
        .filter(i => i.quantity > 0);
      return { ...state, items: next };
    }
    case 'TOGGLE_CART': return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':  return { ...state, isOpen: false };
    case 'CLEAR_CART':  return { items: [], isOpen: false };
    default: return state;
  }
}

type Ctx = {
  state: CartState;
  addItem: (item: MenuItem, size: string, price: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<Ctx | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  // Round to 2dp to avoid floating point drift
  const totalPrice = Math.round(
    state.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0) * 100
  ) / 100;

  return (
    <CartContext.Provider value={{
      state,
      addItem:    (item, size, price) => dispatch({ type: 'ADD_ITEM', payload: { item, size, price } }),
      removeItem: (key)               => dispatch({ type: 'REMOVE',   payload: key }),
      setQty:     (key, qty)          => dispatch({ type: 'SET_QTY',  payload: { key, qty } }),
      toggleCart: ()                  => dispatch({ type: 'TOGGLE_CART' }),
      closeCart:  ()                  => dispatch({ type: 'CLOSE_CART' }),
      clearCart:  ()                  => dispatch({ type: 'CLEAR_CART' }),
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
