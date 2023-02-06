import '../style/contentHome.css'
import PageBuy from '../components/PageBuy'
import { useEffect, useState } from 'react'

function ContentHome() {
  const [data, setData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      fetch('https://9f89-116-103-16-230.ap.ngrok.io/view', {
        method: "get",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "ngrok-skip-browser-warning": "69420",
        }),
      })
        .then(async (res) =>{
          return res.json()
        })
        .then((receivedData) => setData(receivedData))
    }
    loadData()
  }, [])

  console.log(data)
  return (
    <div>
      {data.map((home,index) => (
        <PageBuy
          key={index}
          path={home.content.path}
          title={home.content.title}
          type={home.content.selectBuy}
          kind={home.content.selectHome}
          city={home.location.city}
          ward={home.location.wards}
          address={home.location.address}
          image={home.detail.image}
          price={home.content.price}
          area={home.content.area}
          bedroom={home.detail.bedrooms}
          bathroom={home.detail.bathrooms}
          room={home.detail.rooms}
          description={home.content.description}
          pool={home.utility.pool}
          garage={home.utility.garage}
          backyard={home.utility.backyard}
          playground={home.utility.playground}
          laundry={home.utility.laundry}
          gym={home.utility.gym}
          recreation={home.utility.recreationRoom}
          kitchen={home.utility.kitchenEquipment}
          solarPower={home.utility.solarPower}
          airCondition={home.utility.airConditioning}
          heater={home.utility.heater}
          ventilation={home.utility.ventilation}
          washer={home.utility.washerDryer}
          smoke={home.utility.smokeExtractor}
          elevator={home.utility.elevator}
          wifi={home.utility.wifi}
          feature={home.utility}
        />
      ))}
    </div>
  )
}

export default ContentHome
