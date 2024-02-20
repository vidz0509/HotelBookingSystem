import React, { useState, useEffect } from "react";
import btnIcon from "assets/images/submit-icon.png";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { countriesServices } from "services/countries";
import { locationsServices } from "services/locations";
import { validation } from "services/validation";

export default SearchForm;
function SearchForm() {

    const [countriesData, setCountriesData] = useState("");
    const [countryId, setCountryId] = useState("");

    const [locationsData, setLocationsData] = useState("");
    const [locationId, setLocationId] = useState("");

    const [countryIdError, setCountryIdError] = useState("");
    const [locationIdError, setLocationIdError] = useState("");

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        const result = await countriesServices.getAllCountries();
        if (result.isSuccessful) {
            setCountriesData(result.data);
        }
    };

    const getLocations = async (country_id) => {
        const result = await locationsServices.getLocationByCountry(country_id);
        if (result.isSuccessful) {
            setLocationsData(result.data);
        }
    };

    const handleCountryIdChange = (event) => {
        const value = event.target.value;
        setCountryId(value);
        getLocations(value);
    };

    const handleLocationIdChange = (event) => {
        const value = event.target.value;
        setLocationId(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // let isValid = false;
        setCountryIdError("");
        setLocationIdError("");
        // setHotelCodeError("");
        // setHotelImage("");
        // setHotelAddressError("");
        // setError("");
        // setSuccessful("");

        if (validation.isEmpty(countryId)) {
            setCountryIdError("Please select valid country name.");
            return false;
        }

        if (validation.isEmpty(locationId)) {
            setLocationIdError("Please select valid location name.");
            return false;
        }
    }

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
                            <select id='country' onChange={handleCountryIdChange}>
                                <option value="">-- Select Country --</option>
                                {countriesData &&
                                    countriesData.length > 0 &&
                                    countriesData.map((item) => (
                                        <option value={item._id} key={item._id}>{item.country_name}</option>
                                    ))}
                            </select>
                            {countryIdError && <span className="mb-3 ml-1 text-red-500 text-sm">{countryIdError}</span>}
                        </div>
                    </div>
                    <div className="col half-col">
                        <div className="field-group">
                            <label htmlFor='location'>Select Location</label>
                            <select id='location' onChange={handleLocationIdChange}>
                                <option value="">-- Select Location --</option>
                                {locationsData &&
                                    locationsData.length > 0 &&
                                    locationsData.map((item) => (
                                        <option value={item._id} key={item._id}>{item.location_name}</option>
                                    ))}
                            </select>
                            {locationIdError && <span className="mb-3 ml-1 text-red-500 text-sm">{locationIdError}</span>}
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
                        <button type="submit" name="search_hotel" id="search_hotel" onClick={(e) => handleSubmit(e)}>
                            <img decoding="async" loading="lazy" src={btnIcon} width="50" height="50" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}