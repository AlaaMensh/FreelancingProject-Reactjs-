import React from "react";
import { Button, Form } from "react-bootstrap";

const FormGenerator = ({data,button,handleSubmit}) => {
    
    const defaultHandleSubmit = (e) =>{
        e.preventDefault()
        handleSubmit(e)
    }

    return (
        <Form onSubmit={defaultHandleSubmit}>
            {
                data.map(input=>{
                    switch (input.type) {
                        case 'text':
                            return(
                                <Form.Group controlId='text' key={input.key}>
                                    <Form.Label>{input.title}</Form.Label>
                                    <Form.Control
                                            type='text'
                                            placeholder={input.placeholder}
                                            value={input.value}
                                            onChange={(e)=>input.setValue(e.target.value)}
                                         >

                                    </Form.Control>
                                </Form.Group>
                            )
                            
                        case 'email':
                                return(
                                    <Form.Group controlId='email' key={input.key}>
                                        <Form.Label>{input.title}</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder={input.placeholder}
                                            value={input.value}
                                            onChange={(e)=>input.setValue(e.target.value)}
                                         >

                                         </Form.Control>
                                    </Form.Group>
                                )
                        case 'password':
                                return(
                                    <Form.Group controlId='password' key={input.key}>
                                        <Form.Label>{input.title}</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder={input.placeholder}
                                            value={input.value}
                                            onChange={(e)=>input.setValue(e.target.value)}
                                            >
    
                                        </Form.Control>
                                    </Form.Group>
                                )        
                        case 'select':
                            return(
                                <Form.Group controlId='select' key={input.key}>
                                    <Form.Label>{input.title}</Form.Label>
                                    <Form.Control
                                        as='password'
                                        value={input.value}
                                        onChange={(e)=>input.setValue(e.target.value)}
                                        >
                                        {input.data.map((val,index)=>(
                                            <option key={index} val={val.id}>{val.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            )       
                    }
                })
            }
            <Button type='submit' variant={button.variant} >
                {button.title}
            </Button>
        </Form>
    )
}

export default FormGenerator ; 