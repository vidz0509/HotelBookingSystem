import React, { useState, useEffect } from "react";
import btnIcon from "assets/images/submit-icon.png";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { countriesServices } from "services/countries";
import { locationsServices } from "services/locations";
import { hotelsServices } from "services/hotels";
import { validation } from "services/validation";

function SearchForm(props) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [roomString, setRoomString] = useState('1 Room 1 Adult 0 Child');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [countriesData, setCountriesData] = useState("");
    const [countryId, setCountryId] = useState('');
    const [locationsData, setLocationsData] = useState("");
    const [locationId, setLocationId] = useState("");
    const [countryIdError, setCountryIdError] = useState("");
    const [locationIdError, setLocationIdError] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);

    let currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const [CheckIn, CheckInOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [CheckOut, CheckOutOnChange] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    const params = new URLSearchParams(window.location.search);
    const searchBody = {
        check_in: params.get('check_in') ? params.get('check_in') : '',
        check_out: params.get('check_out') ? params.get('check_out') : '',
        roomList: hotelsServices.getArrayFromQueryString(window.location.search),
    }
    
    useEffect(() => {
        document.querySelector('.room-list').addEventListener('click', handleAllButtonClick);
        getCountries();
        if (props?.searchData?.country_id && props?.searchData.country_id !== '') {
            setCountryId(props.searchData.country_id);
        }
        appendRoomData();
    }, []);

    useEffect(() => {
        getLocations(countryId);
        if (props?.searchData?.location_id && props?.searchData.location_id !== '') {
            setLocationId(props.searchData.location_id);
        }
    }, [countryId]);

    const getCountries = async () => {
        const result = await countriesServices.getAllCountries();
        if (result.isSuccessful) {
            setCountriesData(result.data);
        }
    };

    const getLocations = async (country_id) => {
        if (country_id) {
            const result = await locationsServices.getLocationByCountry(country_id);
            if (result.isSuccessful) {
                setLocationsData(result.data);
            }
        }
    };

    const handleCountryIdChange = (event) => {
        const value = event.target.value;
        setCountryId(value);
        // getLocations(value);
    };

    const handleLocationIdChange = (event) => {
        const value = event.target.value;
        setLocationId(value);
    };

    const handleInputClick = () => {
        setIsDropdownOpen(true);
    };

    function handleAllButtonClick(e) {
        const button = e.target;
        const closestParent = button.closest('.dropdown-content');
        if (button.classList.contains('plus') || button.classList.contains('minus')) {
            if (closestParent) {
                let text = button.closest('.popup-col').querySelector('input');
                if (button.classList.contains('plus')) {
                    let newValue = parseInt(text.value) + 1;
                    if (newValue <= 3) {
                        text.value = newValue;
                        text.setAttribute('value', newValue);
                    }
                } else {
                    let newValue = parseInt(text.value) - 1;
                    if (button.closest('.popup-col').classList.contains('adult')) {
                        if (newValue >= 1) {
                            text.value = newValue;
                            text.setAttribute('value', newValue);
                        }
                    } else {
                        if (newValue >= 0) {
                            text.value = newValue;
                            text.setAttribute('value', newValue);
                        }
                    }
                }
            }
        } else if (button.classList.contains('remove-room') || button.classList.contains('remove-room-icon')) {
            let roomIndex = closestParent.getAttribute('data-index');
            closestParent.remove();
            removeRoom(roomIndex);
        }
    }

    const handleDoneBtnClick = () => {
        setIsDropdownOpen(false);
        resetRoomPopupData();
    };

    const addRoom = () => {
        let roomLength = document.querySelectorAll('.dropdown-content').length;
        if (roomLength <= 2) {
            setCurrentIndex(currentIndex + 1);
            let newRoom = `<div class="dropdown-content" id="room-${roomLength + 1}" data-index="${roomLength}">
            <div class="room-title">
                <p>Room <span class="room-index">${roomLength + 1}</span></p>
                <div class="remove-room" data-index="1"> 
                    <img src="/close-icon.png" class="remove-room-icon"> 
                </div>
            </div>
            <div class="room-row">
                <div class="popup-row">
                    <div class="popup-col">
                        <div class="inner-title">
                            <p>Adults</p>
                        </div>
                    </div>
                    <div class="popup-col adult counter"><button class="minus" >-</button><input
                            type="text" value="1"><button class="plus">+</button></div>
                </div>
                <div class="popup-row">
                    <div class="popup-col">
                        <div class="inner-title">
                            <p>Children</p>
                        </div>
                    </div>
                    <div class="popup-col children counter">
                        <button class="minus" >-</button>
                        <input type="text" value="0">
                        <button class="plus">+</button>
                    </div>
                </div>
            </div>
        </div>`;
            var roomListElement = document.querySelector('.room-list');
            roomListElement.innerHTML += newRoom;
        } else {
            document.getElementById('addRoom').classList.add('disable');
        }
    }

    function removeRoom() {
        resetRoomPopupData();
        document.getElementById('addRoom').classList.remove('disable');
    }

    function resetRoomPopupData() {
        let roomList = [];
        let allRooms = document.querySelectorAll('.dropdown-content');
        let totalRooms = 0;
        let totalAdults = 0;
        let totalChildren = 0;
        allRooms.forEach((room, index) => {
            let adultElement = room.querySelector('.adult input');
            let childElement = room.querySelector('.children input');
            let roomIndexEle = room.querySelector('.room-index');
            // roomList[index].adult = parseInt(adultElement.value);
            // roomList[index].children = parseInt(childElement.value);
            totalRooms++;
            totalAdults += parseInt(adultElement.value);
            totalChildren += parseInt(childElement.value);
            roomIndexEle.innerHTML = (index + 1);
            roomList.push({
                adult: parseInt(adultElement.value),
                children: parseInt(childElement.value)
            })
        });
        setRoomString(`${totalRooms} ${totalRooms > 1 ? 'Rooms' : 'Room'} ${totalAdults} ${totalAdults > 1 ? 'Adults' : 'Adult'} ${totalChildren} ${totalChildren > 1 ? 'Children' : 'Child'}`);
        return roomList;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCountryIdError("");
        setLocationIdError("");


        if (!props.hideHotelDetail) {
            if (validation.isEmpty(countryId)) {
                setCountryIdError("Please select valid country name.");
                return false;
            }
            if (validation.isEmpty(locationId)) {
                setLocationIdError("Please select valid location name.");
                return false;
            }
        }

        setBtnDisabled(true);
        let roomList = resetRoomPopupData();
        const requestBody = {
            country_id: countryId,
            location_id: locationId,
            check_in: CheckIn.toISOString(),
            check_out: CheckOut.toISOString(),
            roomList: roomList
        };
        let fullURL = '';
        if (!props.hideHotelDetail) {
            fullURL = `/hotels?country_id=${requestBody.country_id}&location_id=${requestBody.location_id}&check_in=${requestBody.check_in}&check_out=${requestBody.check_out}`
            roomList.map((room, index) => {
                fullURL += `&room[${index}][adult]=${room.adult}&room[${index}][children]=${room.children}`
            });
        } else {
            let bookingData = {
                check_in: searchBody.check_in,
                check_out: searchBody.check_out,
                hotelId: props.hotelId,
                roomList: resetRoomPopupData()
            }
            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            fullURL = `/bookings`;
        }
        window.location.href = fullURL;
    }

    const appendRoomData = () => {
        if (searchBody.roomList.length > 0) {
            let roomString = '';
            let totalRooms = 0;
            let totalAdults = 0;
            let totalChildren = 0;
            searchBody.roomList.forEach((room, index) => {
                totalRooms++;
                totalAdults += parseInt(room.adult);
                totalChildren += parseInt(room.children);
                roomString += `<div class="dropdown-content" id=room-${index + 1} data-index=${index}>
                    <div class='room-title'>
                        <p>Room <span class="room-index">${index + 1}</span></p>
                    </div>
                    <div class='room-row'>
                        <div class='popup-row'>
                            <div class='popup-col'>
                                <div class='inner-title'>
                                    <p>Adults</p>
                                </div>
                            </div>
                            <div class='popup-col adult counter'>
                                <button class="minus">-</button>
                                <input type="text" readOnly value=${room.adult} />
                                <button class="plus">+</button>
                            </div>
                        </div>
                        <div class='popup-row'>
                            <div class='popup-col'>
                                <div class='inner-title'>
                                    <p>Children</p>
                                </div>
                            </div>
                            <div class='popup-col children counter'>
                                <button class="minus">-</button>
                                <input type="text" readOnly value=${room.children} />
                                <button class="plus">+</button>
                            </div>
                        </div>
    
                    </div>
                </div> `
            })
            setRoomString(`${totalRooms} ${totalRooms > 1 ? 'Rooms' : 'Room'} ${totalAdults} ${totalAdults > 1 ? 'Adults' : 'Adult'} ${totalChildren} ${totalChildren > 1 ? 'Children' : 'Child'}`);
            var roomListElement = document.querySelector('.room-list');
            roomListElement.innerHTML += roomString;
        }
    }

    return (
        <>
            <div className={`search-form ${props.hideHotelDetail ? 'hotel-details-page' : ''} `} id="search-form">
                <div className="row searchform">
                    {
                        !props.hideHotelDetail &&
                        <>
                            <div className="col half-col">
                                <div className="field-group">
                                    <label htmlFor='country'>Select Country</label>
                                    <select id='country' onChange={handleCountryIdChange}>
                                        <option value="">-- Select Country --</option>
                                        {countriesData &&
                                            countriesData.length > 0 &&
                                            countriesData.map((item) => (
                                                <option value={item._id} key={item._id} selected={countryId !== '' && countryId === item._id}>{item.country_name}</option>
                                            ))}
                                    </select>
                                    {countryIdError && <span className="error-msg">{countryIdError}</span>}
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
                                                <option value={item._id} key={item._id} selected={locationId !== '' && locationId === item._id}>{item.location_name}</option>
                                            ))}
                                    </select>
                                    {locationIdError && <span className="error-msg">{locationIdError}</span>}
                                </div>
                            </div>
                        </>
                    }
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
                            <input type="text" onClick={handleInputClick} onChange={handleInputClick} id="room" value={roomString} />
                            <div className={`dropdown room-input ${isDropdownOpen ? 'show-popup' : ''} `}>
                                <div className='room-list'>
                                    {!searchBody?.roomList.length > 0 &&
                                        <>
                                            <div className="dropdown-content" id="room-1" data-index="0">
                                                <div className='room-title'>
                                                    <p>Room <span className="room-index">1</span></p>
                                                </div>
                                                <div className='room-row'>
                                                    <div className='popup-row'>
                                                        <div className='popup-col'>
                                                            <div className='inner-title'>
                                                                <p>Adults</p>
                                                            </div>
                                                        </div>
                                                        <div className='popup-col adult counter'>
                                                            <button className="minus">-</button>
                                                            <input type="text" readOnly value="1" />
                                                            <button className="plus">+</button>
                                                        </div>
                                                    </div>
                                                    <div className='popup-row'>
                                                        <div className='popup-col'>
                                                            <div className='inner-title'>
                                                                <p>Children</p>
                                                            </div>
                                                        </div>
                                                        <div className='popup-col children counter'>
                                                            <button className="minus">-</button>
                                                            <input type="text" readOnly value="0" />
                                                            <button className="plus">+</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="new-room-wrap">
                                    <div id="addRoom" data-index="0" onClick={addRoom}>Add Room <span className="icon">+</span></div>
                                </div>
                                {/* {currentIndex < 3 &&
                                } */}
                                <div className="popup-footer">
                                    <button className='done-btn' type="button" onClick={handleDoneBtnClick}>Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col btn-col`}>
                        <button
                            className={`linear mt-2 w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover: bg-brand-600 active: bg-brand-700 dark: bg-brand-400 dark: text-white dark: hover: bg-brand-300 dark: active: bg-brand-200 ${btnDisabled ? "py-[10px] opacity-80" : "py-[12px]"
                                } `}
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
export default SearchForm;