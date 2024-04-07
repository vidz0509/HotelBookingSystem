import React, { useState, useEffect } from "react";
import btnIcon from "assets/images/submit-icon.png";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { hotelsServices } from "services/hotels";
import Swal from "sweetalert2";

function HotelSearchForm(props) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [roomString, setRoomString] = useState('1 Room 1 Adult 0 Child');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);

    const params = new URLSearchParams(window.location.search);
    let currentDate = new Date();
    let currentCheckOutDate = new Date();
    if (params.get('check_in')) {
        let dateString = params.get('check_in');
        const parts = dateString.split('-');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
        const year = parseInt(parts[2], 10);
        currentDate = new Date(year, month, day);

        let dateCkString = params.get('check_out');
        const cparts = dateCkString.split('-');
        const cday = parseInt(cparts[0], 10);
        const cmonth = parseInt(cparts[1], 10) - 1; // Months are 0-indexed
        const cyear = parseInt(cparts[2], 10);
        currentCheckOutDate = new Date(cyear, cmonth, cday);
    }

    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const [CheckIn, setCheckIn] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    const [CheckOut, setCheckOut] = useState(new Date(currentCheckOutDate.getFullYear(), currentCheckOutDate.getMonth(), currentCheckOutDate.getDate() + 1));
    let searchBody = {};
    if (props.isDetailPage) {
        searchBody = props.searchBody;
    } else {
        
        searchBody = {
            check_in: params.get('check_in') ? params.get('check_in') : '',
            check_out: params.get('check_out') ? params.get('check_out') : '',
            roomList: hotelsServices.getArrayFromQueryString(window.location.search),
        }
    }

    useEffect(() => {
        document.querySelector('.room-list').addEventListener('click', handleAllButtonClick);
        appendRoomData();
    }, [props.searchBody]);

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

    const handleCheckInChange = (value) => {
        let date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        setCheckIn(date);
    };

    const handleCheckOutChange = (value) => {
        let date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        setCheckOut(date);
    };

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
        if (props.finalSelectedRooms.length > 0) {
            setBtnDisabled(true);
            let roomList = resetRoomPopupData();
            const requestBody = {
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
                    check_in: CheckIn.toISOString(),
                    check_out: CheckOut.toISOString(),
                    hotelId: props.hotelId,
                    roomList: resetRoomPopupData(),
                    finalSelectedRooms: props.finalSelectedRooms
                }
                localStorage.setItem('bookingData', JSON.stringify(bookingData));
                fullURL = `/bookings`;
            }
            window.location.href = fullURL;
        } else {
            Swal.fire({
                title: "No Rooms",
                text: "Please select rooms.",
                icon: "error",
                allowOutsideClick: false
            });
        }
    }

    const appendRoomData = () => {
        if (searchBody?.roomList?.length > 0) {
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
            if (searchBody?.roomList.length > 1)
                roomListElement.innerHTML += roomString;
            else
                roomListElement.innerHTML = roomString;
        }
    }

    return (
        <>
            <div className={`search-form ${props.hideHotelDetail ? 'hotel-details-page' : ''} `} id="search-form">
                <div className="row searchform">
                    <div className="col">
                        <div className="field-group">
                            <label>Check-in</label>
                            <DatePicker onChange={handleCheckInChange} value={CheckIn} format="dd-MM-yyyy" minDate={minDate} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Check-out</label>
                            <DatePicker onChange={handleCheckOutChange} value={CheckOut} format="dd-MM-yyyy" minDate={CheckIn} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Room</label>
                            <input type="text" onClick={handleInputClick} onChange={handleInputClick} id="room" value={roomString} />
                            <div className={`dropdown room-input ${isDropdownOpen ? 'show-popup' : ''} `}>
                                <div className='room-list'>
                                    {!props.searchBody?.roomList?.length > 0 &&
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
export default HotelSearchForm;