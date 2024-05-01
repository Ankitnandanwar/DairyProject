import { GiMilkCarton } from "react-icons/gi";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { FaChartBar } from "react-icons/fa";
import "./Dashboard.css"

export const dummyData = [
    {
        title:"Total Product",
        icon : <GiMilkCarton className='icons'/>,
        totalNos:"1,506"
    },

    {
        title:"Today's Sales",
        icon : <LiaLuggageCartSolid className='icons'/>,
        totalNos:"100"

    },

    {
        title:"Total Sales",
        icon : <FaChartBar className='icons'/>,
        totalNos:"958"
    },

    {
        title:"Total Sales",
        icon : <FaChartBar className='icons'/>,
        totalNos:"958"
    }

    
]