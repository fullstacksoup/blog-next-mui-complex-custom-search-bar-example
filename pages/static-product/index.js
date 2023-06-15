import {useEffect, useRef, useState, useContext} from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { getAllProductsHandles } from '@/lib/ShopifyProductQueries'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import DialogReviews from '@/components/products/DialogReviews'
import DialogGuide from '@/components/products/DialogGuide'
import { CartContext } from "@/context/shopContext"
import axios from "axios"
import useSWR from 'swr'
// import RecommendedList from '@/components/products/RecommendedList'
// import { getProduct } from '@/lib/ShopifyProductQueries'
import Button  from '@mui/material/Button';
import Link from 'next/link';
import BackIcon from '@mui/icons-material/ArrowBack';
//import DialogWishlist from '@/components/single-product/DialogWishlist';
import DialogWishList from '@/components/search/wishlist/DialogWishList';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function ProductPage({product}) {
  console.log(' ProductPage', product)
  const addButtonRef = useRef(null)
  // CART LOGIC SECTION
  const router = useRouter()
  const { addToCart } = useContext(CartContext)
  
  const { id, title, images, variants, handle } = product
  const { src: productImage } = images.edges[0].node
  const { price } = variants.edges[0].node.priceV2
  
  const [shoppingCartData, setShoppingCartData] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [removeId, setRemoveId] = useState(null)

  const [selectedProductId,  setSelectedProductId] = useState(null)
  const [selectedProductTitle,  setSelectedProductTitle] = useState(null)
  const [selectedProductVariantId,  setSelectedProductVariantId] = useState(null)
  const [selectedProductHandle,  setSelectedProductHandle] = useState(null)
  
  const [selectedImageURL, setSelectedImageURL] = useState(null)
  const [selectedProductPrice, setSelectedProductPrice] = useState(null)
  const [openWishListDialog, setOpenWishListDialog] = useState(false);

  useEffect(() => {
    // localStorage.setItem('teststoragecart', JSON.stringify(products))
    setIsLoadingData(true)
    
    const productData = localStorage.getItem('teststorageshopifycart')
    // console.log('productData', JSON.parse(productData))
    setShoppingCartData(JSON.parse(productData))
    // addButtonRef.current.focus();
  }, [])
  
  const handleOpenWishListDialog = (id, handle, title, variantId, price, imgURL) => {
    
    
    // SaveToLocalStorage("searchHistory", id, title, imgURL, 30);

    setSelectedProductHandle(handle)
    setSelectedProductId(id)
    setSelectedProductTitle(title)
    setSelectedImageURL(imgURL)
    setSelectedProductPrice(price)    
    setSelectedProductVariantId(variantId)    
    setTimeout(() => {
      setOpenWishListDialog(true)  
    }, 1000);
    
  };

  const handleClickOpenWishListDialog = () => {
    setOpenWishListDialog(true);
  };

  const handleCloseWIshListDialog = () => {
    setOpenWishListDialog(false);
  };

  console.log(' product.options[1].colors', product.options[1].values)
  
  const [selectedSize, setSelectedSize] = useState(product.options[0].value)

  const [selectedColor, setSelectedColor] = useState(product.options[1].values)

  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges)

  return (
    <>
    <div className="bg-white">

        {/* <Button startIcon={<BackIcon/>} sx={{fontSize: 18, fontWeight: 'bold'}} component={Link}  href={'/shopify-product-list'} >
        Back to Product List
        </Button> */}
        

    </div>

    <DialogWishList selectedProductId={selectedProductId}
     selectedProductTitle={selectedProductTitle}
     selectedImageURL={selectedImageURL}                              
     selectedProductPrice={selectedProductPrice}
     selectedProductVariantId={selectedProductVariantId}                          
     selectedProductHandle={selectedProductHandle}
     handleClickOpen={handleClickOpenWishListDialog}                            
     handleClose={handleCloseWIshListDialog}                            
     open={openWishListDialog} />
     </>
  )
}


// export const getServerSideProps = async ({params}) => {
//   const { productHandle } = params
//   // Fetch one product
//   const product = await getProduct(productHandle)
  

//   return {
//    props: {
//     product: product,
//   },
//  };
// };

// Define a function to read and parse the JSON data
export const getStaticProps = async (req, res) => {

  return {
    props: {
      product: singleProduct,
    },
  };
};

const singleProduct = 
{
  "collections": {
      "edges": [
          {
              "node": {
                  "products": {
                      "edges": [
                          {
                              "node": {
                                  "priceRange": {
                                      "minVariantPrice": {
                                          "amount": "19.99"
                                      }
                                  },
                                  "handle": "example-t-shirt",
                                  "title": "Example T-Shirt",
                                  "id": "gid://shopify/Product/8077715964178",
                                  "images": {
                                      "edges": [
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                                                  "altText": null
                                              }
                                          },
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/blackshirt.jpg?v=1674841963",
                                                  "altText": null
                                              }
                                          },
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/redshirt.jpg?v=1674842167",
                                                  "altText": null
                                              }
                                          },
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/redshirt_da8a0477-e0d0-4846-ba7a-c28ac7d4888f.jpg?v=1674842199",
                                                  "altText": null
                                              }
                                          }
                                      ]
                                  }
                              }
                          },
                          {
                              "node": {
                                  "priceRange": {
                                      "minVariantPrice": {
                                          "amount": "50.0"
                                      }
                                  },
                                  "handle": "striped-silk-blouse",
                                  "title": "Striped Silk Blouse",
                                  "id": "gid://shopify/Product/8086645899538",
                                  "images": {
                                      "edges": [
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/striped-blouse-fashion_925x_a4c41476-f28b-4458-9f98-25ee6c52f96e.jpg?v=1673190521",
                                                  "altText": null
                                              }
                                          }
                                      ]
                                  }
                              }
                          },
                          {
                              "node": {
                                  "priceRange": {
                                      "minVariantPrice": {
                                          "amount": "50.0"
                                      }
                                  },
                                  "handle": "ocean-blue-shirt",
                                  "title": "Ocean Blue Shirt",
                                  "id": "gid://shopify/Product/8086645702930",
                                  "images": {
                                      "edges": [
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/young-man-in-bright-fashion_925x_2ab265e7-8ad8-42ad-abcd-2383a1835751.jpg?v=1673190514",
                                                  "altText": null
                                              }
                                          }
                                      ]
                                  }
                              }
                          },
                          {
                              "node": {
                                  "priceRange": {
                                      "minVariantPrice": {
                                          "amount": "50.0"
                                      }
                                  },
                                  "handle": "chequered-red-shirt",
                                  "title": "Chequered Red Shirt",
                                  "id": "gid://shopify/Product/8086646358290",
                                  "images": {
                                      "edges": [
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/red-plaid-shirt_925x_c523c425-b60a-4050-9aa9-18a4e0df451c.jpg?v=1673190536",
                                                  "altText": null
                                              }
                                          }
                                      ]
                                  }
                              }
                          },
                          {
                              "node": {
                                  "priceRange": {
                                      "minVariantPrice": {
                                          "amount": "30.0"
                                      }
                                  },
                                  "handle": "white-cotton-shirt",
                                  "title": "White Cotton Shirt",
                                  "id": "gid://shopify/Product/8086646391058",
                                  "images": {
                                      "edges": [
                                          {
                                              "node": {
                                                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/smiling-woman-poses_925x_381907f0-2e2d-4908-9a8d-142905f048ab.jpg?v=1673190539",
                                                  "altText": null
                                              }
                                          }
                                      ]
                                  }
                              }
                          }
                      ]
                  }
              }
          }
      ]
  },
  "id": "gid://shopify/Product/8077715964178",
  "title": "Example T-Shirt",
  "handle": "example-t-shirt",
  "description": "",
  "images": {
      "edges": [
          {
              "node": {
                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                  "altText": null
              }
          },
          {
              "node": {
                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/blackshirt.jpg?v=1674841963",
                  "altText": null
              }
          },
          {
              "node": {
                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/redshirt.jpg?v=1674842167",
                  "altText": null
              }
          },
          {
              "node": {
                  "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/redshirt_da8a0477-e0d0-4846-ba7a-c28ac7d4888f.jpg?v=1674842199",
                  "altText": null
              }
          }
      ]
  },
  "options": [
      {
          "name": "Size",
          "values": [
              "Lithograph - Height: 9\" x Width: 12\"",
              "Small",
              "Medium",
              "Large",
              "X-Large"
          ],
          "id": "gid://shopify/ProductOption/10258817876242"
      },
      {
          "name": "Color",
          "values": [
              "Black",
              "Blue",
              "Red",
              "Green"
          ],
          "id": "gid://shopify/ProductOption/10303767085330"
      }
  ],
  "variants": {
      "edges": [
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Lithograph - Height: 9\" x Width: 12\""
                      },
                      {
                          "name": "Color",
                          "value": "Black"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/blackshirt.jpg?v=1674841963",
                      "altText": null
                  },
                  "title": "Lithograph - Height: 9\" x Width: 12\" / Black",
                  "id": "gid://shopify/ProductVariant/44295799865618",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Lithograph - Height: 9\" x Width: 12\""
                      },
                      {
                          "name": "Color",
                          "value": "Blue"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Lithograph - Height: 9\" x Width: 12\" / Blue",
                  "id": "gid://shopify/ProductVariant/44417704591634",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Lithograph - Height: 9\" x Width: 12\""
                      },
                      {
                          "name": "Color",
                          "value": "Red"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/redshirt.jpg?v=1674842167",
                      "altText": null
                  },
                  "title": "Lithograph - Height: 9\" x Width: 12\" / Red",
                  "id": "gid://shopify/ProductVariant/44417704624402",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Small"
                      },
                      {
                          "name": "Color",
                          "value": "Black"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Small / Black",
                  "id": "gid://shopify/ProductVariant/44295799931154",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "19.99"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Small"
                      },
                      {
                          "name": "Color",
                          "value": "Green"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Small / Green",
                  "id": "gid://shopify/ProductVariant/44417704657170",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Small"
                      },
                      {
                          "name": "Color",
                          "value": "Blue"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Small / Blue",
                  "id": "gid://shopify/ProductVariant/44417704689938",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Small"
                      },
                      {
                          "name": "Color",
                          "value": "Red"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Small / Red",
                  "id": "gid://shopify/ProductVariant/44417704722706",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Medium"
                      },
                      {
                          "name": "Color",
                          "value": "Black"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Medium / Black",
                  "id": "gid://shopify/ProductVariant/44295799963922",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "19.99"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Medium"
                      },
                      {
                          "name": "Color",
                          "value": "Green"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Medium / Green",
                  "id": "gid://shopify/ProductVariant/44417704755474",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Medium"
                      },
                      {
                          "name": "Color",
                          "value": "Blue"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Medium / Blue",
                  "id": "gid://shopify/ProductVariant/44417704788242",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Medium"
                      },
                      {
                          "name": "Color",
                          "value": "Red"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Medium / Red",
                  "id": "gid://shopify/ProductVariant/44417704821010",
                  "availableForSale": true,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Large"
                      },
                      {
                          "name": "Color",
                          "value": "Black"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Large / Black",
                  "id": "gid://shopify/ProductVariant/44417706295570",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Large"
                      },
                      {
                          "name": "Color",
                          "value": "Green"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Large / Green",
                  "id": "gid://shopify/ProductVariant/44417706361106",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Large"
                      },
                      {
                          "name": "Color",
                          "value": "Blue"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Large / Blue",
                  "id": "gid://shopify/ProductVariant/44417706426642",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "Large"
                      },
                      {
                          "name": "Color",
                          "value": "Red"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "Large / Red",
                  "id": "gid://shopify/ProductVariant/44417706492178",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "X-Large"
                      },
                      {
                          "name": "Color",
                          "value": "Black"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "X-Large / Black",
                  "id": "gid://shopify/ProductVariant/44417706524946",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "X-Large"
                      },
                      {
                          "name": "Color",
                          "value": "Green"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "X-Large / Green",
                  "id": "gid://shopify/ProductVariant/44417706557714",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "X-Large"
                      },
                      {
                          "name": "Color",
                          "value": "Blue"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "X-Large / Blue",
                  "id": "gid://shopify/ProductVariant/44417706590482",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          },
          {
              "node": {
                  "selectedOptions": [
                      {
                          "name": "Size",
                          "value": "X-Large"
                      },
                      {
                          "name": "Color",
                          "value": "Red"
                      }
                  ],
                  "image": {
                      "url": "https://cdn.shopify.com/s/files/1/0697/7067/4450/products/green-t-shirt.jpg?v=1672682441",
                      "altText": null
                  },
                  "title": "X-Large / Red",
                  "id": "gid://shopify/ProductVariant/44417706623250",
                  "availableForSale": false,
                  "priceV2": {
                      "amount": "25.0"
                  }
              }
          }
      ]
  }
}