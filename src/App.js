import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Accordion, AccordionTab } from 'primereact/accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";



export default function App() {
  const [data, setdata] = useState([])
  const [fill, setfill] = useState([])
  const [filteredList, setFilteredList] = new useState(data);
  const navigate = useNavigate();


  useEffect(() => {
    getdata()


  }, [])
  const filterBySearch = (event) => {

    const query = event.target.value;
    var updatedList = [...fill];

    let filteredConvos = updatedList.filter((convo) => {
      return convo.countries.some((participant) => {
        return participant.country.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      })
    })
    console.log(filteredConvos)
    setFilteredList(filteredConvos);
  };
  async function getdata() {

    const options = {
      method: 'GET',
      url: 'https://covid-193.p.rapidapi.com/statistics',
      headers: {
        'X-RapidAPI-Key': 'f4d37c6388msh61a0f4419c9d11fp14e4d0jsn381c961e9f48',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setdata(response.data.response)

      let paraOne = response.data.response
      split(paraOne)

    } catch (error) {
      console.error(error);
    }
  }
  function split(paraOne) {
    if (paraOne) {
      var destructure = []
      for (var i = 0; paraOne.length > i; i++) {
        let filldata = destructure.filter(number => { return number.continent == paraOne[i].continent })

        if (filldata.length == 0) {
          let getover = paraOne.filter(number => { return number.continent == paraOne[i].continent })
          const json = { 'continent': paraOne[i].continent, 'countries': getover }
          destructure.push(json)
        }

      }
      setfill(destructure)
      console.log(fill)
      setFilteredList(destructure)
    }
  }

  const panelClassName = (parent, index) => {
    if (parent.state.activeIndex === index) return 'bg-primary';
  };
  const onNavigate = (e) => {
    console.log('clicked')
    navigate("/home/" + e);

  }
  if (data.length == 0) {
    return (
      <>
        <div>

          <div class="d-flex justify-content-center spinner">
            <div class="spinner-grow text-primary" role="status">
            </div>
            <div class="spinner-grow text-secondary" role="status">
            </div>
            <div class="spinner-grow text-success" role="status">
            </div>

          </div>

        </div>
      </>
    )
  }
  return (
    <>
<div className='headerone'>

</div>
      <Container>
        <Row className='mb-3 mt-3'>
          <Col xs={7} md={7}>
            <h1 className=''>Covid Status List</h1>

          </Col>

          <Col xs={5} md={5}>
            <Form.Control type="search" placeholder="Search Continent List..." onChange={filterBySearch} />
          </Col>

        </Row>

        <div className="">
          <Accordion activeIndex={0}>
            {filteredList.map((tab, i) => {

              return (
                <AccordionTab
                  key={i}
                  pt={{
                    headerAction: ({ parent }) => ({
                      className: panelClassName(parent, i)
                    })
                  }}
                  header={tab.continent}>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Countries</th>
                        <th scope="col">Population </th>
                        <th scope="col">Total Covid Cases</th>
                      </tr>
                    </thead>
                    {tab.countries.map((tab, i) => {
                      return (

                        <tbody>
                          <tr onClick={() => onNavigate(tab.country)}>
                            <th scope="row">{i + 1}</th>
                            <td >{tab.country}</td>
                            <td>{tab.population}</td>
                            <td>{tab.cases.total}</td>
                          </tr>

                        </tbody>

                      )
                    })}
                  </table>
                </AccordionTab>
              )

            })}
          </Accordion>
        </div>
      </Container>
      {/* <div className='headerone'>

</div> */}
    </>
  )

}

