import React from 'react';
import connect from "react-redux/es/connect/connect";
import './product-material.css'


const ProductMaterial = ({ product }) => {

    let material

    switch(product.material){
        case 'cotton':
            material = <div className="material-icon" data-tooltip="cotton"><img className="material-icon-img" src='../images/materials/cotton.svg' alt='cotton'></img></div>
            break
        case 'jute':
            material = <div className="material-icon" data-tooltip="jute"><img className="material-icon-img" src='../images/materials/jute.svg' alt='jute'></img></div>
            break
        case 'silk':
            material = <div className="material-icon" data-tooltip="silk"><img className="material-icon-img" src='../images/materials/silk.svg' alt='silk'></img></div>
            break
        case 'wool':
            material = <div className="material-icon" data-tooltip="wool"><img className="material-icon-img" src='../images/materials/wool.svg' alt='wool'></img></div>
            break
        case 'ramie':
            material = <div className="material-icon" data-tooltip="ramie"><img className="material-icon-img" src='../images/materials/ramie.svg' alt='ramie'></img></div>
            break
        case 'recycled':
            material = <div className="material-icon" data-tooltip="recycled"><img className="material-icon-img" src='../images/materials/recycled.svg' alt='recycled'></img></div>
            break 
        default:
            material = <div className="material-icon"></div> 
    }

    return(
        <div>
            {material}
        </div>
    )
}  


const mapStateToProps = ({ productsList: { product } }) => ({ product });
  
export default connect(mapStateToProps)(ProductMaterial);
