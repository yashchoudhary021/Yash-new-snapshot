import './App.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function App() {
  const searchData = useRef(null);
  const [data, setData] = useState('montaines');
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "7e30084d2e70f75cc0e78e5ae7bc1273",
      text: data,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    const parametes = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parametes}`
    axios.get(url)
      .then((res) => {
        console.log(res.data)
        const arr = res.data.photos.photo.map((img) => {
          return Images(img, 'q')
        });
        setImageData(arr);
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [data])
  const Images = (picture, size) => {
    let url = `https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}`
    if (size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }

  return (<div>
    <i><h1 className='header'>SnapShot</h1></i>
    <input type="text" placeholder='search...' className='input-feild' onChange={(e)=> {searchData.current = e.target.value} } />
    <button className="btn-color" onClick={() => setData(searchData.current)}>search</button>
    <section className='btn-section'>
      <button className='btn-all' onClick={() => setData("Mountains")}>Mountains</button>
      <button className='btn-all' onClick={() => setData("Beaches")}>Beaches</button>
      <button className='btn-all' onClick={() => setData("Birds")}>Birds</button>
      <button className='btn-all' onClick={() => setData("Food")}>Food</button>
    </section>
    <section className='container'>
      <h3>{`${data} Pictures`}</h3>
    </section>
    <section className='images-section'>
      {imageData.map((img, key) => {
        return (
          <div>
            <img src={img} key={key} alt="" />
          </div>
        )
      })}
    </section>
  </div>)
}
export default App;