export default SearchForm;
function SearchForm() {
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
                            <input type="text" id="checkIn" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Check-out</label>
                            <input type="text" id="checkOut" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field-group">
                            <label>Room</label>
                            <input type="text" id="room" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}