import React from 'react';
import axios from 'axios';

export class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/greetee').then(
            ({data}) => this.setState(data)
        );
    }
    render() {
        const {greetee} = this.state;
        if (!greetee) {
            return 'Loading...';
        }
        return (
            <div>
                Hello, {greetee}!
            </div>
        );
    }
}
