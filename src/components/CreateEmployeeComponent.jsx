import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            flightName: '',
            nationality: '',
            destination: '',
            img: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeFlightNameHandler = this.changeFlightNameHandler.bind(this);
        this.changeNationalityHandler = this.changeNationalityHandler.bind(this);
        this.changeDestinationHandler = this.changeDestinationHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    name: employee.name,
                    flightName: employee.flightName,
                    nationality : employee.nationality,
                    destination:employee.destination,
                    img : employee.img
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, flightName: this.state.flightName, nationality: this.state.nationality, destination:this.state.destination,img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeFlightNameHandler= (event) => {
        this.setState({flightName: event.target.value});
    }

    changeNationalityHandler= (event) => {
        this.setState({nationality: event.target.value});
    }
    changeDestinationHandler= (event) => {
        this.setState({destination: event.target.value});
    }
    changeImgHandler= (event) => {
        this.setState({img: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Add</h3>
        }else{
            return <h3 className="text-center p-4 m-2 text-info">Update</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>  Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Flight Name: </label>
                                            <input placeholder="Flight Name" name="flightName" className="form-control" 
                                                value={this.state.flightName} onChange={this.changeFlightNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Nationality: </label>
                                            <input placeholder="Nationality" name="nationality" className="form-control" 
                                                value={this.state.nationality} onChange={this.changeNationalityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Destination:</label>
                                            <input placeholder="Destination" name="destination" className="form-control" 
                                                value={this.state.destination} onChange={this.changeDestinationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>
                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateEmployee}><BsCheckCircleFill/> Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
