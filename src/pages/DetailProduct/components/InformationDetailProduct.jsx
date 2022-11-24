import style from './InformationDetailProduct.module.css';

function InformationDetailProduct(pros) {
    
    return (
        <div className="information">
            <div className="information-heading">
                <h1 className="information-heading__carName">BWM X3</h1>
                <h2 className="information-heading__priceCar">2.959.000</h2>
            </div>
            <div className="information-content">
                <p className="information-content__carName">BWM X3</p>
                <p className="information-content__branch">BWM</p>
                <p className="information-content__trademark">SUV</p>
                <p className="information-content__numberSeats">5</p>
                <p className="informaton-content__engine">252hp</p>
            </div>
            <div className='informaton-img'>
                <img src="" alt="" />
            </div>
            <div className="buy">
                <button>BUY NOW</button>
            </div>
        </div>
        
    );
}
export default InformationDetailProduct;