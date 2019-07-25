import React, {Component} from 'react'
import axios from 'axios';

class Employee extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            Name: "",
            EmpCode: 0,
            Salary: 0
        }
    }

    // this is where lifecycle methods go
    async componentDidMount() {
        try {
            this.refresh();
            const res = await axios.get('/employee');
            this.setState({
                employees: res.data
            })
        } catch(error) {
            console.error(error)
        }
    }

    // Put methods here
    // deleteEmployee = async (id) => {
    //     console.log("deleteEmployee fired")

    //     let newEmployeesList = this.state.employees.filter((el, idx) => idx !==  id)//this.state.employees.empID)

    //     this.setState ({
    //         employees: newEmployeesList
    //     })
    // }

    // deleteEmployee = async (id) => {
    //     console.log("deleteEmployee fired")

    //     let newEmployeesList = this.state.employees.filter((el, idx) => idx !==  id)//this.state.employees.empID)

    //     this.setState ({
    //         employees: newEmployeesList
    //     })
    // }

    handleChange = (event) => {
        console.log("Here we are grabbing the event target's name:", [event.target.name])
        console.log("Here we are grabbing the event target's name:", [event.target.value])
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    deleteEmploye = async id => {
        try {
            await axios.delete(`/employee/${id}`)
            console.log(`ID : ${id} was deleted!`)
            const res = await axios.get('/employee');
            this.setState({
                employes: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    addEmployee = async () => {
        event.preventDefault();
        const { Name, EmpCode, Salary } = this.state // object deconstructuring
        try {
            await axios.post('/emloyee', {Name, EmpCode, Salary})
            alert("Employee Added");
            this.refresh();
        } catch(error) {
            console.log(error)
        }
    }

    // update employee

    refresh = async () => {
        try {
            const res = await axios.get('/employee');
            this.setState({
                employes: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.employees.length) {
            return (
                <ul>
                    {this.state.employees.map(el => {
                        return(
                            <li>
                                {el.Name}
                                <button type="button" onClick={() => this.deleteEmployee(el.EmpID)} />
                                {/* our event handler */}
                            </li>
                        );
                    })}
                </ul>
                <form>
                    <input name="Name" placeholder="please put employee name here" onSubmit={this.handleChange} />
                    <input name="EmpCode" placeholder="please put employee code here" onSubmit={this.handleChange} />
                    <input name="Salary" placeholder="please put employee salary here" onSubmit={this.handleChange} />
                    <button type="submit" /> 
                    {/* event.target.name] */}
                    {/* can add key-valu pairs to an object with obg['keyName;] = 1, add that key-valu pair */}
                </form>
                );
            } else {
                return (
                    <div>
                        Loading...
                    </div>
                )
            }
        }
    }

export default Employee;