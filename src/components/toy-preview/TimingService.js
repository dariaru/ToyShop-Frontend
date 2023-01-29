import React, {useEffect, useState} from "react";

function TimingService(props) {
    const {items} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [timing, setTime] = useState([]);
    const [toy_id, setService] = useState([]);

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/toys/${items.toy}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setService(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
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
                        <h1>{timing.name}</h1>
                        <h2>{timing.price}</h2>
                    </div>

                </ul>
            </div>

        );
    }
}
export default TimingService;