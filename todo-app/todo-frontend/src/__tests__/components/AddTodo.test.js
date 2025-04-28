import { render, screen } from "@testing-library/react"
import React from 'react'
import AddTodo from "../../components/AddTodo"

describe("Testing the Add Todo component",()=>{
    test("Render the input and add button",()=>{
        render(<AddTodo onAdd={()=>{}}/>)
        expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    })
})