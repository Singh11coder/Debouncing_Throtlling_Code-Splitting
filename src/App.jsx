import React, { useEffect, useState } from 'react';

const App = () => {
  const [products,setProducts] = useState([]);
   const [value,setValue] = useState("");
   const[searchProducts, setSearchProducts] = useState([]);
   const [scrollY,setScrollY] = useState(null);
   
  let throttle = false;
  const fetchData = async() => {
    try{
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
   
      setProducts(data.products);
    }catch(error){
      console.log(error.message);
    }
  }

  const filteredData = () => {
     let ans = products.filter((val) => {
        return val.title.toLowerCase().includes(value.toLowerCase());
     })
     setSearchProducts(ans);
  }

  useEffect(()=>{
      fetchData();
  },[]);

  useEffect(()=>{
    let timeout = setTimeout(()=>{
        filteredData();
    },200);
    
    return ()=> clearTimeout(timeout);

  },[searchProducts]);


  // throtlling....
  useEffect(()=>{
    if(throttle)return;
   let handleScroll = () => {
      console.log("Scrolling ....");
      setScrollY(window.scroll);
   }

    window.addEventListener("scroll",handleScroll);
  },[]);
  
  return (
    <div className="m-4">
        <input 
        value={value}
         className="h-10 w-95 p-4 border-1"
         type="text"
         placeholder='Search Products...' 
         onChange={(e) => {setValue(e.target.value)}}
        />
        <div className='w-screen h-screen  pr-1 bg-gray-200'>
          {searchProducts.map((val) => {
          return <div className="p-2 hover:bg-gray-600 hover:cursor-pointer">
             <h1 className=" ">{val.title}</h1>
          </div>
        })}
        </div>
        
    </div>
  )
}

export default App;
