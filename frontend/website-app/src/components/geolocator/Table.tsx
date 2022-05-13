import React from "react";

interface Location {

    Name: string
    Search: string
    Longitude: number
    Latitude: number
    Occupancy: number
    Max: number
    Radius: number
}

const occupancyRatio = [0.33, 0.66];

function business(location: Location): string {

    const maxArray = occupancyRatio.map(x => x*location.Max)
    const occupancy = location.Occupancy

    if (occupancy <= maxArray[0]) {
        return "not busy";
    } else if (occupancy <= maxArray[1]) {
        return "a little busy";
    } else {
        return "busy";
    }
}

function Table(database: Location[]) {

    return (
        <table>
            <thead className="table-header"></thead>
            <tbody className="table-body">
            {database?.map(
                item =>
                    <tr className="table-row" id={item.Search}>
                        <td className="table-location">{item.Name}</td>
                        <td className={"table-" + business(item)}>{business(item)}</td>
                        <td>{item.Occupancy}</td>
                    </tr>)}
            </tbody>
        </table>
    );
}

export default Table;