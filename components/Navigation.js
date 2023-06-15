import * as React from 'react';
import { useContext } from 'react'
import { CartContext } from '@/context/shopContext'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MiniCart from './MiniCart'

export default function Navigation() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" underline="none" color="inherit"><Typography mr={2}>All products</Typography></Link>
        <Link href="/collections/women" underline="none" color="inherit"><Typography mr={2}>Women</Typography></Link>
        <Link href="/collections/men" underline="none" color="inherit"><Typography>Men</Typography></Link>
        
        <Link
          
          onClick={() => setCartOpen(!cartOpen)}
          >
          Cart ({cartQuantity})
        </Link>
        <MiniCart cart={cart} />
      </Toolbar>
    </AppBar>
  )
};
