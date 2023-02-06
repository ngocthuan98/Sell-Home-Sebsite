import '../style/sell.css';
import ContentSell from '../components/ContentSell';
import Detail from '../components/Detail';
import Utilities from '../components/Utility';
import Location from '../components/Location';
import { useParams } from 'react-router-dom';
import SellIndicator from '../listHome/sellIndicator';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Sell() {
  const { type } = useParams();
  const [post, setPost] = useState({
    title: '',
    description: '',
    price: 0,
    priceRent: 0,
    selectHome: '',
    selectBuy: '',
    address: '',
    wards: '',
    city: '',
    area: 0,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
  });
  const [selectedImages, setSelectedImages] = useState(null);
  const [checkbox, setCheckbox] = useState([]);
  const path = post.title.replace(/[., ]+/g, '-').toLowerCase();
  //onChange input
  const handleInput = (e) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  //checkbox
  const handleCheckbox = (e) => {
    setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
  };

  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const submit = () => {
    if (!file) {
      alert('Please upload an image first!');
    }
    const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setSelectedImages([url]);
        });
      },
    );
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sell = {
      content: {
        title: post.title,
        description: post.description,
        price: post.price,
        priceIfRenting: post.priceRent,
        selectHome: post.selectHome,
        selectBuy: post.selectBuy,
        area: post.area,
        path: path,
      },
      location: {
        address: post.address,
        wards: post.wards,
        city: post.city,
      },
      detail: {
        rooms: post.rooms,
        bedrooms: post.bedrooms,
        bathrooms: post.bathrooms,
        image: selectedImages,
      },
      utility: {
        pool: checkbox.Pool ? '1' : '0',
        garage: checkbox.Garage ? '1' : '0',
        backyard: checkbox.Backyard ? '1' : '0',
        playground: checkbox.Playground ? '1' : '0',
        laundry: checkbox.Laundry ? '1' : '0',
        gym: checkbox.Gym ? '1' : '0',
        recreationRoom: checkbox.RecreationRoom ? '1' : '0',
        kitchenEquipment: checkbox.KitchenEquipment ? '1' : '0',
        solarPower: checkbox.SolarPower ? '1' : '0',
        airConditioning: checkbox.AirConditioning ? '1' : '0',
        heater: checkbox.Heater ? '1' : '0',
        ventilation: checkbox.Ventilation ? '1' : '0',
        washerDryer: checkbox.WasherDryer ? '1' : '0',
        smokeExtractor: checkbox.SmokeExtractor ? '1' : '0',
        elevator: checkbox.Elevator ? '1' : '0',
        wifi: checkbox.Wifi ? '1' : '0',
      },
    };
    try {
      const res = await fetch('https://9f89-116-103-16-230.ap.ngrok.io/view/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify(sell),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.description);
        return;
      }

      console.log(data);
      alert('Post successful!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sell-post">
      <div className="sell-container">
        <SellIndicator />
        {type === 'content' && (
          <ContentSell
            postTitle={post.title}
            postDescription={post.description}
            postPrice={post.price}
            postPriceRent={post.priceRent}
            handleInput={handleInput}
            selectHome={post.selectHome}
            selectBuy={post.selectBuy}
          />
        )}
        {type === 'detail' && (
          <Detail
            handleInput={handleInput}
            area={post.area}
            rooms={post.rooms}
            bedRooms={post.bedrooms}
            bathRooms={post.bathrooms}
            onSelectFile={handleChange}
            submit={submit}
          />
        )}
        {type === 'location' && (
          <Location handleInput={handleInput} postAddress={post.address} postWards={post.wards} postCity={post.city} />
        )}
        {type === 'utilities' && <Utilities handleCheckbox={handleCheckbox} checkbox={checkbox} />}
        <button type="submit" onClick={handleSubmit} className="Summit">
          Summit
        </button>
      </div>
    </div>
  );
}

export default Sell;

// import '../style/sell.css';
// import ContentSell from '../components/ContentSell';
// import Detail from '../components/Detail';
// import Utilities from '../components/Utility';
// import Location from '../components/Location';
// import { useParams } from 'react-router-dom';
// import SellIndicator from '../listHome/sellIndicator';
// import { useState } from 'react';

// function Sell() {
//   const { type } = useParams();
//   const [post, setPost] = useState({
//     title: '',
//     description: '',
//     price: 0,
//     priceRent: 0,
//     selectHome: '',
//     selectBuy: '',
//     address: '',
//     wards: '',
//     city: '',
//     area: 0,
//     rooms: 0,
//     bedrooms: 0,
//     bathrooms: 0,
//   });
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [checkbox, setCheckbox] = useState([]);
//   const path = post.title.replace(/[., ]+/g, '-').toLowerCase();
//   //onChange input
//   const handleInput = (e) => {
//     e.persist();
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   //checkbox
//   const handleCheckbox = (e) => {
//     setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
//   };

//   //upload image
//   const onSelectFile = (event) => {
//     const selectedFiles = event.target.files;
//     const selectedFilesArray = Array.from(selectedFiles);

//     const imagesArray = selectedFilesArray.map((file) => {
//       return URL.createObjectURL(file);
//     });

//     setSelectedImages((previousImages) => previousImages.concat(imagesArray));

//     // FOR BUG IN CHROME
//     event.target.value = '';
//   };

//   function deleteHandler(image) {
//     setSelectedImages(selectedImages.filter((e) => e !== image));
//     URL.revokeObjectURL(image);
//   }

//   //submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const sell = {
//       content: {
//         title: post.title,
//         description: post.description,
//         price: post.price,
//         priceIfRenting: post.priceRent,
//         selectHome: post.selectHome,
//         selectBuy: post.selectBuy,
//         area: post.area,
//         path: path,
//       },
//       location: {
//         address: post.address,
//         wards: post.wards,
//         city: post.city,
//       },
//       detail: {
//         rooms: post.rooms,
//         bedrooms: post.bedrooms,
//         bathrooms: post.bathrooms,
//         image: selectedImages,
//       },
//       utility: {
//         pool: checkbox.Pool ? '1' : '0',
//         garage: checkbox.Garage ? '1' : '0',
//         backyard: checkbox.Backyard ? '1' : '0',
//         playground: checkbox.Playground ? '1' : '0',
//         laundry: checkbox.Laundry ? '1' : '0',
//         gym: checkbox.Gym ? '1' : '0',
//         recreationRoom: checkbox.RecreationRoom ? '1' : '0',
//         kitchenEquipment: checkbox.KitchenEquipment ? '1' : '0',
//         solarPower: checkbox.SolarPower ? '1' : '0',
//         airConditioning: checkbox.AirConditioning ? '1' : '0',
//         heater: checkbox.Heater ? '1' : '0',
//         ventilation: checkbox.Ventilation ? '1' : '0',
//         washerDryer: checkbox.WasherDryer ? '1' : '0',
//         smokeExtractor: checkbox.SmokeExtractor ? '1' : '0',
//         elevator: checkbox.Elevator ? '1' : '0',
//         wifi: checkbox.Wifi ? '1' : '0',
//       },
//     };
//     try {
//       const res = await fetch('https://4224-2401-d800-403-d265-e8fe-3555-df79-3161.ap.ngrok.io/view/insert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//           'ngrok-skip-browser-warning': '69420',
//         },
//         body: JSON.stringify(sell),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         console.log(data.description);
//         return;
//       }

//       console.log(data);
//       alert('Post successful!');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="sell-post">
//       <div className="sell-container">
//         <SellIndicator />
//         {type === 'content' && (
//           <ContentSell
//             postTitle={post.title}
//             postDescription={post.description}
//             postPrice={post.price}
//             postPriceRent={post.priceRent}
//             handleInput={handleInput}
//             selectHome={post.selectHome}
//             selectBuy={post.selectBuy}
//           />
//         )}
//         {type === 'detail' && (
//           <Detail
//             handleInput={handleInput}
//             area={post.area}
//             rooms={post.rooms}
//             bedRooms={post.bedrooms}
//             bathRooms={post.bathrooms}
//             selectedImages={selectedImages}
//             onSelectFile={onSelectFile}
//             deleteHandler={deleteHandler}
//           />
//         )}
//         {type === 'location' && (
//           <Location handleInput={handleInput} postAddress={post.address} postWards={post.wards} postCity={post.city} />
//         )}
//         {type === 'utilities' && <Utilities handleCheckbox={handleCheckbox} checkbox={checkbox} />}
//         <button type="submit" onClick={handleSubmit} className="Summit">
//           Summit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sell;
