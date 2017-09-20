import React from 'react'

const toggleLevels = function(levels, level) {
  if (levels.includes(level)) {
    var index = levels.indexOf(level)
    levels.splice(index, 1)
  } else {
    levels.push(level)
  }

  return levels
}

export default class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.toggleAdvanced = this.toggleAdvanced.bind(this)
    this.toggleIntermediate = this.toggleIntermediate.bind(this)
    this.toggleBeginner = this.toggleBeginner.bind(this)
  }

  badgeCSS(level) {
    if (this.props.filters.levels.includes(level)) {
      return `badge--${level}`
    } else {
      return 'badge--disabled'
    }
  }

  toggleBeginner() {
    this.toggleLevel(1)
  }

  toggleIntermediate() {
    this.toggleLevel(5)
  }

  toggleAdvanced() {
    this.toggleLevel(9)
  }

  toggleLevel(level) {
    var levels = this.props.filters.levels;

    if (levels.includes(level)) {
      var index = levels.indexOf(level)
      levels.splice(index, 1)
    } else {
      levels.push(level)
    }

    this.props.filters.levels = levels;
    this.props.updateFilters(this.props.filters);
  }

  render() {
    return (
      <div className="filter-list">
        <h3>Selected Filters:</h3>
        <div className="filter-list__filters">
          <span className={`badge ${this.badgeCSS(1)}`} onClick={this.toggleBeginner}>Beginner</span>
          <span className={`badge ${this.badgeCSS(5)}`} onClick={this.toggleIntermediate}>Intermediate</span>
          <span className={`badge ${this.badgeCSS(9)}`} onClick={this.toggleAdvanced}>Advanced</span>
        </div>
      </div>
    );
  }
}
