import { useState } from 'react';
import btnIcon from "assets/images/submit-icon.png";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default SearchForm;
function SearchForm() {
    let currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const [CheckIn, CheckInOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [CheckOut, CheckOutOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    return (
        <>
            <div className="search-form" id="search-form">
                <div className="row">
                    <div className="col">
                        <div className="field-group">
                            <label>Travelling to</label>
                            <input type="text" id="location" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Check-in</label>
                            <DatePicker onChange={CheckInOnChange} value={CheckIn} format="dd-MM-yyyy" minDate={minDate} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Check-out</label>
                            <DatePicker onChange={CheckOutOnChange} value={CheckOut} format="dd-MM-yyyy" minDate={CheckIn} />

                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Room</label>
                            <input type="text" id="room" />

                            <div className="dropdown" style={{ backgroundColor: 'white', marginTop: '20px', padding: '10px', paddingTop: '20px', paddingBottom: '20px', borderRadius: '10px' }}>

                                <div className="dropdown-content" style={{ display: 'flex' }}>
                                    <p>Room :</p> <button style={{ width: '16%', height: '30px', marginLeft: '30px' }}>-</button> <span style={{ marginLeft: '10px' }}>0</span> <button style={{ marginLeft: '10px', width: '16%', height: '30px' }}>+</button>
                                </div>

                                <div className="dropdown-content" style={{ display: 'flex', marginTop: '10px' }}>
                                    <p>Adults :</p> <button style={{ width: '16%', height: '30px', marginLeft: '27px' }}>-</button> <span style={{ marginLeft: '10px' }}>0</span> <button style={{ marginLeft: '10px', width: '16%', height: '27px' }}>+</button>
                                </div>

                                <div className="dropdown-content" style={{ display: 'flex', marginTop: '10px' }}>
                                    <p>Childran :</p> <button style={{ width: '16%', height: '30px', marginLeft: '7px' }}>-</button> <span style={{ marginLeft: '10px' }}>0</span> <button style={{ marginLeft: '9px', width: '16%', height: '30px' }}>+</button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '20px' }}>
                                    <button style={{width:'100px' , height:'36px', backgroundColor:'#932595' , border:'none' , borderRadius:'10px', color:'white' , cursor:'pointer'}}>Done</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col btn-col">
                        <button type="submit" name="search_hotel" id="search_hotel">
                            <img decoding="async" loading="lazy" src={btnIcon} width="50" height="50" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );


}