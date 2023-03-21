import React  from "react";
import loading from "./Ellipsis-1s-200px.gif"
const Spinner = () => {
  
    return (
      <div className="text-center">
        <img src={loading} alt="Page-loading" />
      </div>
    );
  }

export default Spinner
