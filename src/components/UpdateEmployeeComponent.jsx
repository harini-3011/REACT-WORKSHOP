import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            flightName: '',
            nationality: '',
            destination:'',
            img:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeFlightNameHandler = this.changeFlightNameHandler.bind(this);
        this.changeNationalityHandler = this.changeNationalityHandler.bind(this);
        this.changeDestinationHandler = this.changeDestinationHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({
                name: employee.name,
                flightName: employee.flightName,
                nationality: employee.nationality,
                destination: employee.destination,
                img : employee.img
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, flightName: this.state.flightName, nationality: this.state.nationality,destination:this.state.destination, img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
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

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>  Name: </label>
                                            <input placeholder=" Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
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
                                            <label> Destination: </label>
                                            <input placeholder="Destination" name="destination" className="form-control" 
                                                value={this.state.destination} onChange={this.changeDestinationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="Img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
