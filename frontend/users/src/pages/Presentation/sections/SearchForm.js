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
    const [currentIndex, setCurrentIndex] = useState(1);

    const [locationsData, setLocationsData] = useState("");
    const [locationId, setLocationId] = useState("");
    const [Adults, setAdults] = useState(1);
    const [Children, setChildren] = useState(0);


    const [countryIdError, setCountryIdError] = useState("");
    const [locationIdError, setLocationIdError] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const [roomList, setRoomList] = useState([{
        adult: 1,
        children: 0
    }]);

    let currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const [CheckIn, CheckInOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [CheckOut, CheckOutOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));


    const handleInputClick = () => {
        setIsDropdownOpen(true);
    };

    const handleBtnClick = () => {
        setIsDropdownOpen(false);
        console.log(roomList);
    };

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
    const handleAdult = (flag, event) => {
        event.preventDefault();
        if (flag === 'add') {
            setAdults(Adults + 1);
        } else {
            setAdults(Adults - 1);
        }
    };

    const handleChildren = (flag, event) => {
        event.preventDefault();
        if (flag === 'add') {
            setChildren(Children + 1);
        } else {
            setChildren(Children - 1);
        }
    };

    const addRoom = () => {
        setCurrentIndex(currentIndex + 1);
        setRoomList(...roomList, {
            adult: 1,
            children: 0
        })
        let newRoom = `<div class="dropdown-content">
        <div class="room-title">
            <p>Room ${currentIndex + 1}</p>
        </div>
        <div class="room-row">
            <div class="popup-row">
                <div class="popup-col">
                    <div class="inner-title">
                        <p>Adults</p>
                    </div>
                </div>
                <div class="popup-col adult counter"><button class="minus" disabled=""><span> - </span></button><input
                        type="text" readonly="" value="1"><button class="plus"><span> + </span></button></div>
            </div>
            <div class="popup-row">
                <div class="popup-col">
                    <div class="inner-title">
                        <p>Children</p>
                    </div>
                </div>
                <div class="popup-col children counter">
                    <button class="minus" disabled="">
                        <span> - </span>
                    </button>
                    <input type="text" readonly="" value="0"  disabled=${Children >= 3}>
                    <button class="plus">
                        <span> + </span>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
        var roomListElement = document.querySelector('.room-list');
        roomListElement.innerHTML += newRoom;
    }
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


        setBtnDisabled(true);
        const requestBody = {
            country_Id: countryId,
            location_Id: locationId,
            CheckIn: CheckIn,
            CheckOut: CheckOut,

        };
        console.log(requestBody)


    }


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
                            <input type="text" onClick={handleInputClick} onChange={handleInputClick} id="room" readOnly />
                            <div className={`dropdown room-input ${isDropdownOpen ? 'show-popup' : ''}`}>
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
                                                    <button className="minus" disabled={Adults <= 1} onClick={(e) => handleAdult('remove', e)}>
                                                        <span> - </span>
                                                    </button>
                                                    <input type="text" readOnly value={Adults} />
                                                    <button className="plus" disabled={Adults >= 3} onClick={(e) => handleAdult('add', e)}>
                                                        <span> + </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='popup-row'>
                                                <div className='popup-col'>
                                                    <div className='inner-title'>
                                                        <p>Children</p>
                                                    </div>
                                                </div>
                                                <div className='popup-col children counter'>
                                                    <button className="minus" disabled={Children <= 0} onClick={(e) => handleChildren('remove', e)}>
                                                        <span> - </span>
                                                    </button>
                                                    <input type="text" readOnly value={Children} />
                                                    <button className="plus" disabled={Children >= 3} onClick={(e) => handleChildren('add', e)}>
                                                        <span> + </span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {currentIndex < 3 &&
                                    <div className="new-room-wrap">
                                        <div id="addRoom" data-index="1" onClick={addRoom}>Add Room <span className="icon">+</span></div>
                                    </div>
                                }
                                <div className="popup-footer">
                                    <button className='done-btn' type="button" onClick={handleBtnClick}>Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col btn-col">
                        <button
                            className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 ${btnDisabled ? "py-[10px] opacity-80" : "py-[12px]"
                                }`}
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            disabled={btnDisabled ? "disabled" : ""}
                        >
                            {btnDisabled ? (
                                <span className="flex items-center justify-center">
                                    <img decoding="async" loading="lazy" src={btnIcon} width="50" height="50" />
                                </span>
                            ) : (
                                <span> <span className="flex items-center justify-center">
                                    <img decoding="async" loading="lazy" src={btnIcon} width="50" height="50" />
                                </span></span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}