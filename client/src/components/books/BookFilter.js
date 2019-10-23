import React from "react";
import "../../css/bookfilter.css";

class BookFilter extends React.Component {
  clearFilters = () => {
    this.props.onClear();
  };

  handleFilters = () => {
    const isEmpty = function(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    };
    var filters = {
      // sem: null,
      // sub: null,
      // college: null,
      // condition: null
    };
    var whereClause = "";
    var sem = document.getElementById("sem-filter");
    var subject = document.getElementById("subject-filter");
    var college = document.getElementById("college-filter");
    var condition = document.getElementById("condition-filter");
    var semesterValue = sem.options[sem.selectedIndex].value;
    var subjectValue = subject.options[subject.selectedIndex].value;
    var collegeValue = college.options[college.selectedIndex].value;
    var conditionValue = condition.options[condition.selectedIndex].value;
    if (semesterValue !== "any") {
      filters.semester = `semester=${semesterValue}`;
    }
    if (subjectValue !== "any") {
      filters.subject = `subject="${subjectValue}"`;
    }
    if (collegeValue !== "any") {
      filters.college = `college="${collegeValue}"`;
    }
    if (conditionValue !== "any") {
      filters.condition = `bookCondition="${conditionValue}"`;
    }
    if (isEmpty(filters)) {
      this.clearFilters();
    } else if (Object.keys(filters).length === 1) {
      if (
        filters.semester !== undefined &&
        filters.subject === undefined &&
        filters.condition === undefined &&
        filters.college === undefined
      ) {
        whereClause += `where ${filters.semester};`;
      }
      if (
        filters.semester === undefined &&
        filters.subject !== undefined &&
        filters.condition === undefined &&
        filters.college === undefined
      ) {
        whereClause += `where ${filters.subject};`;
      }
      if (
        filters.semester === undefined &&
        filters.subject === undefined &&
        filters.condition !== undefined &&
        filters.college === undefined
      ) {
        whereClause += `where ${filters.condition};`;
      }
      if (
        filters.semester === undefined &&
        filters.subject === undefined &&
        filters.condition === undefined &&
        filters.college !== undefined
      ) {
        whereClause += `where ${filters.college};`;
      }
      this.props.getBooksWithFilters(whereClause);
    } else {
      whereClause = "where ";
      if (filters.semester !== undefined) {
        whereClause += `${filters.semester}`;
        if (filters.college !== undefined)
          whereClause += ` and ${filters.college}`;
        if (filters.condition !== undefined)
          whereClause += ` and ${filters.condition}`;
        if (filters.subject !== undefined)
          whereClause += ` and ${filters.subject}`;
      } else if (filters.college !== undefined) {
        whereClause += `${filters.college}`;
        if (filters.semester !== undefined)
          whereClause += ` and ${filters.semester}`;
        if (filters.condition !== undefined)
          whereClause += ` and ${filters.condition}`;
        if (filters.subject !== undefined)
          whereClause += ` and ${filters.subject}`;
      } else if (filters.condition !== undefined) {
        whereClause += `${filters.condition}`;
        if (filters.college !== undefined)
          whereClause += ` and ${filters.college}`;
        if (filters.semester !== undefined)
          whereClause += ` and ${filters.semester}`;
        if (filters.subject !== undefined)
          whereClause += ` and ${filters.subject}`;
      } else if (filters.subject !== undefined) {
        whereClause += `${filters.subject}`;
        if (filters.college !== undefined)
          whereClause += ` and ${filters.college}`;
        if (filters.condition !== undefined)
          whereClause += ` and ${filters.condition}`;
        if (filters.subject !== undefined)
          whereClause += ` and ${filters.subject}`;
      }
      whereClause += ";";
      this.props.getBooksWithFilters(whereClause);
    }
  };

  render() {
    return (
      <div className="books-filter-container">
        <div className="filter-item">
          <div className="filter-label">Semester</div>
          <div className="ui form filter">
            <select id="sem-filter">
              <option value="any">any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <div className="filter-item">
          <div className="filter-label">Subject</div>
          <div className="ui form filter">
            <select id="subject-filter">
              <option value="any">any</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="DataStructures">DataStructures</option>
              <option value="OOC">OOC</option>
              <option value="OOMD">OOMD</option>
              <option value="ME">ME</option>
              <option value="SE">SE</option>
            </select>
          </div>
        </div>
        <div className="filter-item">
          <div className="filter-label">College</div>
          <div className="ui form filter">
            <select id="college-filter">
              <option value="any">any</option>
              <option value="PES">PES</option>
              <option value="BMSCE">BMSCE</option>
              <option value="RVCE">RVCE</option>
            </select>
          </div>
        </div>
        <div className="filter-item">
          <div className="filter-label">Condition</div>
          <div className="ui form filter">
            <select id="condition-filter">
              <option value="any">any</option>
              <option value="good">good</option>
              <option value="bad">bad</option>
            </select>
          </div>
        </div>
        <div className="filler"></div>
        <button
          onClick={this.handleFilters}
          className="ui button primary filter-button"
        >
          Apply Filters
        </button>
        <button onClick={this.clearFilters} className="ui button filter-button">
          Clear Filters
        </button>
      </div>
    );
  }
}

export default BookFilter;
