import React from 'react';
import Opportunity from './Opportunity';

export default class List extends React.Component {
   constructor(props){
    super(props)

    this.state = {opportunities: []}
    this.$opportunities(props)
  } 

  componentWillReceiveProps(nextProps) {
    this.$opportunities(nextProps)
  }

  $opportunities(props) {
    fetch(`/opportunities?levels=${props.filters.levels.join(',')}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => { 
      this.setState(prevState => ({
        opportunities: json
      }))
    })
  }

  render() {
    return (
      <main className="card">
        <ul className="list">
          {this.state.opportunities.map(opportunity => 
            <Opportunity key={opportunity.id} data={opportunity} /> 
          )}
        </ul>
      </main>
    );
  }
}
