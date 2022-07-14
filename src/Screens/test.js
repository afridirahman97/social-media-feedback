import React from 'react';
import Player1 from '../images/people.jpg';
import "./test.css";



class test extends React.Component {
    state = {
        selectedValue: ''
    }

    optionSelected = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedValue: e.target.value
        })
    }

    reset = () => {
        this.setState({
            selectedValue: ''
           
        })
        
    }
    

    render() {
        
        const { selectedValue } = this.state;
        return (
            <div>
                <div>
                    <input
                        type="radio"
                        name="age" value="A"
                        onChange={this.optionSelected}
                        checked={selectedValue === 'A'} /> A
                </div>
                <div>
                    <input
                        type="radio"
                        name="age"
                        value="B"
                        onChange={this.optionSelected}
                        checked={selectedValue === 'B'} /> B
                </div>
                <div>
                    <input
                        type="radio"
                        name="age"
                        value="C"
                        onChange={this.optionSelected}
                        checked={selectedValue === 'C'} /> C
                </div>

                <button onClick={this.reset}>reset</button>
            </div>
        );
    }

}

export default test;