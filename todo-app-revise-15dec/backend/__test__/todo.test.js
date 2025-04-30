const request=require("supertest");
const mongoose=require("mongoose");
const app=require("../server");
const Todo=require("../models/todo");

//connect to database
beforeAll(async()=>{
    await mongoose.connect("mongodb+srv://test:test@cluster0.m6uuvce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
})

//clear the test databse before each test case
beforeEach(async()=>{
    await Todo.deleteMany();
})

//disconnect from the test databse after all test case pass successfully
afterAll(async()=>{
    await mongoose.connection.close();
})

// test case 1 create a new todo
describe("Todo API tests",()=>{
    test("POST /api/todos-should create a new Todo",async()=>{

        const newTodo={ taskName:'Learn Testing'};
        const response = await request(app)
        .post('/api/todos')
        .send(newTodo)
        .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.taskName).toBe(newTodo.taskName);
        expect(response.body.status).toBe(false);
    })

//test case 2 get all todos
    test('GET /api/todos- should return all todos',async()=>{
        const todo1 = new Todo({ taskName: 'Task 1'});
        const todo2 = new Todo({ taskName: 'Task 2'});

        await todo1.save();
        await todo2.save();
        const response= await request(app).get('/api/todos').expect(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].taskName).toBe(todo1.taskName);
        expect(response.body[1].taskName).toBe(todo2.taskName);
        expect(response.body[1].status).toBe(false);
    })

    //update
    test('PUT /api/todos/:id - should update only the status from false to true',async()=>{

        const todo= new Todo({ taskName:'dummy task'});
        await todo.save();
        const updateStatus = {status:true};
        const response= await request(app).put(`/api/todos/${todo._id}`).send(updateStatus).expect(200);

        expect(response.body._id).toBe(todo._id.toString());
        expect(response.body.taskName).toBe(todo.taskName);
        expect(response.body.status).toBe(true);

        //Verify the Database
        const updateTodo= await Todo.findById(todo._id);
        expect(updateTodo.status).toBe(true)
    })

    //delete
    test('DELETE /api/todos/:id -should delete Task by Id',async()=>{
        const todo= new Todo({taskName:'Task to delete'});
        await todo.save();
        const response=await request(app).delete(`/api/todos/${todo._id}`).expect(200);
        
        expect(response.body.message).toBe('Todo deleted successfully');
        const deleteTodo= await Todo.findById(todo._id);
        expect(deleteTodo).toBeNull();
    })

})
