import "./NearEarth.css";
import { useEffect, useState } from "react";
import Object from "./Object";

const API_KEY = "e93ALFFkfPPHMh8HJZMKgnJmZ6tzTZmtegU6TcTW";

function NearEarth() {
    const [nearEarthObject, setNearEarthObjects] = useState([]);
    const [view, setView] = useState("all");

    useEffect(() => {
        fetch(
            `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
        ).then((data) => {
            if (data.status === 200) {
                data.json().then((data) => {
                    console.log(data.near_earth_objects);
                    setNearEarthObjects(data.near_earth_objects);
                });
            }
        });
    }, []);
    const handleAll = () => {
        setView("all");
    };
    const handleDangerous = () => {
        setView("dangerous");
    };
    return (
        <div>
            <div>
                <button type="button" onClick={handleAll}>
                    All
                </button>
                <button type="button" onClick={handleDangerous}>
                    Dangerous
                </button>
            </div>
            {!nearEarthObject.length && <div> ....loading</div>}
            {view === "all"
                ? nearEarthObject.map((object) => {
                      return (
                          <Object
                              name={object.name}
                              key={object.id}
                              magnitude={object.absolute_magnitude_h}
                              isDangerous={
                                  object.is_potentially_hazardous_asteroid
                              }
                          />
                      );
                  })
                : nearEarthObject
                      .filter((object) => {
                          return object.is_potentially_hazardous_asteroid;
                      })
                      .map((object) => {
                          return (
                              <Object
                                  name={object.name}
                                  key={object.id}
                                  magnitude={object.absolute_magnitude_h}
                                  isDangerous={
                                      object.is_potentially_hazardous_asteroid
                                  }
                              />
                          );
                      })}
        </div>
    );
}

export default NearEarth;
