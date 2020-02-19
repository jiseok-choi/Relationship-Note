// 첫 라우트 Home
// 이 라우터는 주소에 아무 path 도 주어지지 않았을 때 기본적으로 보여주는 라우트
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

class ChrtistGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataPie : this.props.dataPie,
        }
    }

    
    
    render() {
        return (
            <div>
                <ChartistGraph data={this.state.dataPie} type="Pie" />
            </div>
        );
    }
};

export default ChrtistGraph;