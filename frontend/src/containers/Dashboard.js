import React, { Component } from 'react'
import LoadingComponent from '../components/Loading'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Slide } from 'react-toastify';
import '../styles/Dashboard.scss'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            errors: {},
            listStatus: []
        };
    }
    componentDidMount() {
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    splitMessage(message) {
        let arrayMessage = [];
        const lengthOfIndicators = 4
        const maxLengthOfEachMessage = 50 - lengthOfIndicators;
        let subStringTemp = message.substr(0, message.indexOf(' '));
        if (subStringTemp == ' ') {
            return false;
        }
        let indexOfSplitMessage = 1;
        subStringTemp = message.split(" ");
 
        let stringTempBeforePushingIntoArray = '';
        for (let i = 0; i < subStringTemp.length; i++) {
            console.log('subStringTemp: ',subStringTemp[i]);
            if (subStringTemp[i].length > 50) {
                return false;
            }
            else {
                if (stringTempBeforePushingIntoArray.length + subStringTemp[i].length > maxLengthOfEachMessage ) {
                    arrayMessage.push(stringTempBeforePushingIntoArray);
                    stringTempBeforePushingIntoArray = '';
                    stringTempBeforePushingIntoArray += subStringTemp[i];
                    if(i == subStringTemp.length - 1){
                        arrayMessage.push(stringTempBeforePushingIntoArray);
                    }
                }
                else  {
                    subStringTemp[i] = ` ${subStringTemp[i]}`;
                    stringTempBeforePushingIntoArray = stringTempBeforePushingIntoArray.concat(subStringTemp[i]);
                    if(i == subStringTemp.length - 1){
                        arrayMessage.push(stringTempBeforePushingIntoArray);
                    }
                }
            }
        }
        for (let i = 0; i < arrayMessage.length; i++) {
            const indicators = `${i + 1}/${arrayMessage.length} `;
            arrayMessage[i] = `${indicators}${arrayMessage[i]}`;
        }
        console.log(arrayMessage);
        return arrayMessage;
    }
    postStatus = () => {
        const lengthOfIndicators = 4
        const maxLengthOfEachMessage = 50 - lengthOfIndicators;
        const status = this.state.status;
        if (status.length == 0) {
            toast.error('Status can not be empty', {
                autoClose: 2000
            });
        }
        else if (status.length <= maxLengthOfEachMessage) {
            let tempStatus = `1/1 ${this.state.status}`;
            console.log(tempStatus);
            let listStatusTemp=[];
            listStatusTemp.push(tempStatus);
            this.setState({ listStatus: listStatusTemp });
        }
        else {
            if (!this.splitMessage(this.state.status)) {
                toast.error('A word can not have more than 50 characters', {
                    autoClose: 2000
                });
            }
            else {
                const listAfterProcessing = this.splitMessage(this.state.status);
                this.setState({ listStatus: listAfterProcessing });
            }
        }

    }
    handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            this.postStatus();
        }
    } 
    render() {

        if (this.props.isLoading) {
            return <LoadingComponent />
        }
        else {

            return (
                <div className="container">
                    <ToastContainer
                        transition={Slide}
                        newestOnTop
                    />
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h3 className="display-4 text-center">Login</h3>
                            <div>
                                <textarea
                                    type="text"
                                    className="form-control form-control-lg status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={(e) => this.onChange(e)} 
                                    onKeyPress={(e) => this.handleKeyPress(e)}/>
                            </div>
                            {this.state.listStatus.map((el, index) => {
                                return (
                                    <div key={el + index}>{el}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            )
        }
    }
}



export default Dashboard;