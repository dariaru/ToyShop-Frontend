import React, {useEffect, useState} from "react";
import TimingService from "./TimingService";

function ItemBooking(props) {
    const {user} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [timing, setTime] = useState([]);
    const [accommodation, setService] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/toys/${user.pk}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <ul >
                    <div>
                        <TimingService items={ user}/>
                    </div>
                </ul>
            </div>

        );
    }
}
export default ItemBooking;