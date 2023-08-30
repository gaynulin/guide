import {selectVideosByDateNormalised} from "../../redux/videoSlice";
import {useSelector} from "react-redux";

interface IDayProps {
    day: Date
}
export const Day = (props: IDayProps) => {
    // @ts-ignore
   const normalised = useSelector(state => selectVideosByDateNormalised(state));

   console.log({normalised}, normalised && Object.values(normalised));

   return <div>DAY</div>
}