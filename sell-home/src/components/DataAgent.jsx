import { useState, useEffect } from 'react'
import '../style/admin.css'
import SearchIcon from '@mui/icons-material/Search'
import AgentAdmin from './AgentAdmin'
import Paginate from 'react-paginate'
import {db } from '../firebase'
import {collection,getDocs} from "firebase/firestore"

function DataAgent() {
  const [info, setInfo] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [postPerPage] = useState(3)

  const indexOfFirstPost = currentPage * postPerPage
  const indexOfLastPost = indexOfFirstPost + postPerPage
  const currentInfo = info.slice(indexOfFirstPost, indexOfLastPost)

  const pageCount = Math.ceil(info.length / postPerPage)
  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  // const loadData = async () => {
  //   fetch('http://localhost:5000/api/listAgent', {
  //     method: 'get',
  //     headers: new Headers({
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //       'ngrok-skip-browser-warning': '69420',
  //     }),
  //   })
  //     .then(async (res) => {
  //       return res.json()
  //     })
  //     .then((receivedData) => setInfo(receivedData))
  //   Promise.all([
  //     fetch('http://localhost:5000/api/listAgent', {
  //       method: 'get',
  //       headers: new Headers({
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //         'ngrok-skip-browser-warning': '69420',
  //       }),
  //     }),
  //     fetch('http://localhost:5000/api/home', {
  //       method: 'get',
  //       headers: new Headers({
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //         'ngrok-skip-browser-warning': '69420',
  //       }),
  //     })
  // ]).then(function (responses) {
  //     // Get a JSON object from each of the responses
  //     return Promise.all(responses.map(function (response) {
  //         return response.json();
  //     }));
  // }).then(function (data) {
  //     // Log the data to the console
  //     // You would do something with both sets of data here
  //     setInfo2(data)
  // }).catch(function (error) {
  //     // if there's an error, log it
  //     console.log(error);
  // });
  //}
  const loadData = async () =>{
    await getDocs(collection(db, "listAgent"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                  setInfo(newData);                
            })
  }
  

  useEffect(() => {
    loadData()
  }, [])


  const deletePost = (id) => {
    fetch(`http://localhost:5000/api/listAgent/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'ngrok-skip-browser-warning': '69420',
      }),
    })
      .then((res) => {
        res.json().then((resp) => {
          alert('delete successful')
        })
        loadData()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <div className="searchAdmin">
        <input type="text" placeholder="Search..." name="search" />
        <SearchIcon />
      </div>
      <div className="info-homeAdmin">
        <ul className="list-homeAdmin">
          <li>ID</li>
          <li>Name</li>
          <li>Phone</li>
          <li>Mail</li>
          <li>Consulting Area</li>
          <li>Action</li>
        </ul>
        <div>
          {currentInfo.map((agent, index) => {
            return (
              <AgentAdmin
                key={index}
                id={agent.id}
                name={agent.name}
                phone={agent.phone}
                email={agent.mail}
                consultingArea={agent.consultingArea}
                deletePost={deletePost}
              />
            )
          })}
        </div>
        <div className="paginationAdmin">
          <Paginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBtn"
            previousLinkClassName="previousBtn"
            nextLinkClassName="nextBtn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>
    </div>
  )
}

export default DataAgent
