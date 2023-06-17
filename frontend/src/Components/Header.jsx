import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  async function getProducts() {
    try {
      const response = await axios.get("/products");
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const searchProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`/products/?keyword=${keyword}`);
      console.log(res.data);
      setKeyword("");
    } catch (e) {
      console.log(e);
    }
  };

  const productsName = products.map((product) => ({
    label: product.productName
  }));

  return (
    <div className='top-0 fixed w-full bg-slate-600 px-2 py-4 text-white flex flex-wrap justify-between items-center sm:flex-col sm:gap-6 md:flex-row'>
      <h1 className='font-semibold text-2xl ml-4 tracking-wide w-full sm:w-auto'>ShopIt</h1>
      <div className='nav_links flex gap-5 ml-4 mt-4 md:mt-0'>
        <Link to='/' className='font-semibold tracking-wider text-1xl'>
          Home
        </Link>
        <Link to='/products' className='font-semibold tracking-wider text-1xl'>
          Products
        </Link>
        <Link to='/about' className='font-semibold tracking-wider text-1xl'>
          About Us
        </Link>
        <Link to='/contact' className='font-semibold tracking-wider text-1xl'>
          Contact
        </Link>
      </div>
      <div className='search border px-2  w-full sm:w-auto mt-3 sm:mt-0'>
        <form className='flex justify-between items-center' onSubmit={(e) => searchProduct(e)}>
          <Autocomplete
            disablePortal
            options={productsName}
            getOptionLabel={(option) => option.label}
            sx={{
              width: 300,
              padding: 0,
              border: 'none',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderWidth: 0,
                },
                '&:hover fieldset': {
                  borderWidth: 0,
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 0,
                },
                '& input': {
                  outline: 'none',
                  color: 'white',
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Search Your Products'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onSelect={(e) => setKeyword(e.target.value)}
              />
            )}
            popupIcon=''
            clearIcon={null}
            PaperComponent={(props) => (
              <Paper {...props} style={{ maxHeight: 200, overflow: 'auto', width: 258, border: "none", position: "relative", left: "-10px", top: "20px" }} />
            )}
          />
          <SearchIcon fontSize='medium' onClick={(e) => searchProduct(e)} />
        </form>
      </div>
      <div className="flex gap-5 mr-5 mt-3  ">
        <ShoppingCartIcon className='cursor-pointer ' fontSize='medium' />
        <AccountCircleIcon className='cursor-pointer ' fontSize='medium' />
      </div>
    </div>
  );
};

export default Header;
