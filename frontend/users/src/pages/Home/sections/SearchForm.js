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
    const [CheckOut, CheckOutOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1));
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