import React from 'react';
import './P1Element1.scss'; // Ensure the path is correct

const P1Element1 = () => {
  return (
    <div className="P1element2-container container">
      <div className="text-center">
        <h2 className="P1element2-heading">TESTIMONIAL</h2>
        <img
          src="/assets/Line 13.png"
          alt="Icon"
          className="img-fluid"
          loading="lazy" 
        />
      </div>
      <div className="row">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="col-md-3">
            <div className="P1element2-content">
              <img
                src="/assets/Oval.png"
                alt="Icon"
                className="img-fluid"
                loading="lazy"
              />
              <h3 className="P1element2-subheading">Ali Khan</h3>
              <p className="P1element2-subparagraph">Digital Marketer</p>
              <p className="P1element2-subparagraph">
                “Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default P1Element1;
