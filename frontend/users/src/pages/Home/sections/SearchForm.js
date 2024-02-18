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
                    <div className="col half-col">
                        <div className="field-group">
                            <label htmlFor='country'>Select Country</label>
                            <select id='country'>
                                <option value="Test">Test</option>
                                <option value="Test">Test</option>
                                <option value="Test">Test</option>
                            </select>
                        </div>
                    </div>
                    <div className="col half-col">
                        <div className="field-group">
                            <label htmlFor='location'>Select Location</label>
                            <select id='location'>
                                <option value="Test">Test</option>
                                <option value="Test">Test</option>
                                <option value="Test">Test</option>
                            </select>
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
                            <input type="text" id="room" readOnly />

                            <div className="dropdown room-input">

                                <div className='room-list'>
                                    <div className="dropdown-content">
                                        <div className='room-title'>
                                            <p>Room 1</p>
                                        </div>
                                        <div className='room-row'>
                                            <div className='popup-row'>
                                                <div className='popup-col'>
                                                    <div className='inner-title'>
                                                        <p>Adults</p>
                                                    </div>
                                                </div>
                                                <div className='popup-col adult counter'>
                                                    <button className="minus" disabled=""> <span> - </span> </button>
                                                    <input type="text" readOnly value="1" />
                                                    <button className="plus"> <span> + </span> </button>
                                                    <input type="hidden" className="adults" name="rooms[0][adults]" value="1" />
                                                </div>
                                            </div>
                                            <div className='popup-row'>
                                                <div className='popup-col'>
                                                    <div className='inner-title'>
                                                        <p>Children</p>
                                                    </div>
                                                </div>
                                                <div className='popup-col children counter'>
                                                    <button className="minus" disabled=""> <span> - </span> </button>
                                                    <input type="text" readOnly value="1" />
                                                    <button className="plus"> <span> + </span> </button>
                                                    <input type="hidden" className="adults" name="rooms[0][adults]" value="1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="new-room-wrap">
                                    <div id="addRoom" data-index="0">Add Room <span className="icon">+</span></div>
                                </div>
                                <div className="popup-footer">
                                    <button className='done-btn'>Done</button>
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