import React from "react";
import $ from "jquery";

class BookFilter extends React.Component {
  componentDidMount() {
    var dropdown = $(".dropdown");
    var item = $(".item");

    item.on("click", function() {
      item.toggleClass("collapse");

      if (dropdown.hasClass("dropped")) {
        dropdown.toggleClass("dropped");
      } else {
        setTimeout(function() {
          dropdown.toggleClass("dropped");
        }, 150);
      }
    });
  }

  render() {
    return (
      <div className="books-filter">
        <div class="dropdown">
          <div class="item collapse">Item 2</div>
          <div class="item collapse">Item 3</div>
          <div class="item collapse">Item 4</div>
          <div class="item collapse">Select Item</div>
        </div>
      </div>
    );
  }
}

export default BookFilter;
