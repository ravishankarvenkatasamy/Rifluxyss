import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {
    useParams,
} from "react-router-dom";



export default function Home(props) {
    const [data, setdata] = useState([])
    let { name } = useParams();


    useEffect(() => {
        getdata()


    }, [])

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
            console.log(response.data.response);
            var dummy = response.data.response

            let filterCountry = dummy.filter((convo) => {
                return convo.country == name
            })
            setdata(filterCountry[0])
        } catch (error) {
            console.error(error);
        }
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
                    <Col xs={12} md={12}>
                        <h1 className='text-center'>{data.country} Country Covid Status</h1>
                        <hr></hr>
                    </Col>


                </Row>
                <div className="">

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Continent</th>
                                <th scope="col">Country</th>
                                <th scope="col">Population </th>
                                <th scope="col">Total Cases</th>
                                <th scope="col">Total Deaths</th>
                                <th scope="col">Total Tests</th>
                                <th scope="col">Last Updated Date & Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr >
                                <th scope="row">1</th>
                                <td>{data.continent}</td>
                                <td>{data.country}</td>
                                <td>{data.population}</td>
                                <td>{data.cases.total}</td>
                                <td>{data.deaths.total}</td>
                                <td>{data.tests.total}</td>
                                <td>{data.time}</td>
                            </tr>

                        </tbody>


                    </table>



                </div>
            </Container>
        </>
    )

}

