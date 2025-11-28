import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {Form} from "react-bootstrap"
import { getCategories } from 'src/api/categoryApi';
import { getPlansForAdmin } from 'src/api/plansApi';

const AddChannel = () => {

    const [plans ,setPlans] = useState([])
    const [categories ,setCategories] = useState([])

    useEffect(() => {
        getPlansForAdmin((isOk ,data) => {
            if(isOk){
                console.log(data);
                return setPlans(data)
            }
            return console.log(data);
        })
        getCategories((isOk ,data) => {
            if(isOk){
                console.log(data);
                return setCategories(data)
            }
            return console.log(data);
        })
    } , [])


    return ( 
        
            <Form >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>channel name</Form.Label>
                    <Form.Control type="text" placeholder="name of your channel" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>channel bio</Form.Label>
                    <Form.Control as="textarea" rows={3} style={{resize:"none"}} />
                </Form.Group>
                <Form.Select aria-label="Default select example">
                    <option>choose category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Default select example">
                    <option>choose plan</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <div className="col-md-2">
                    <button className="btn btn-primary btn-loading" data-coreui="loading-button" data-coreui-timeout="3000">Submit</button>
                </div>
            </Form>
        
     );
}
 
export default AddChannel;