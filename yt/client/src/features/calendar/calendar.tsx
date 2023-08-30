import {useGetVideosQuery} from "../../redux/videoSlice";
import {Day} from "../day/day";


export const Calendar = () => {

    const {data, isLoading, isSuccess, error} = useGetVideosQuery();


    console.log({data})
    return (<main>

        <Day day={new Date()} />
        {
            isSuccess
        }

        {data && data.length}
    </main>)
}