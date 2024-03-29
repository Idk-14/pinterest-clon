import { useEffect, useRef, useState } from "react";
import { createApi } from "unsplash-js";

import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component';



import Header from './components/Header'
import Cards from "./components/Cards";
import { useBookStore } from "./store/bookStore";
import './App.css'

const api = createApi({
  accessKey: import.meta.env.VITE_ACCESKEY
});


function App() {

  const [data, setData] = useState([]);
  const [hasMore, setHasmore] = useState(true);
  let index = useRef(1);

  const val = useBookStore(state => state.value)

  console.log('data: ', data);

  useEffect(() => {
    index.current = 1;
    setHasmore(true);

    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then(result => {
        setData(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [val]);
  

  const moreData = () =>{
    index.current = index.current + 1;
  
    if(index.current === 3){
      setHasmore(false);
    }

    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then(result => {
        setData(data.concat(result.response.results));
      })
      .catch(() => {
        console.log("something went wrong!");
    });
} 


  return (
    <div className="container">
      <Header/>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        next={moreData}
        loader={<h4>Loading...</h4>}
        style={{overflow:'none'}}
        >

        <Masonry 
        columns={{ xs: 2, sm:3, md: 5}} 
        spacing={{ xs: 1, sm:2, md: 3}} 
        className="masonry">
        {
          data.map(item => (
            <Cards key={item.id} item={item}/>
            ))}
          </Masonry>
      </InfiniteScroll>
    </div>
  )
}

export default App
