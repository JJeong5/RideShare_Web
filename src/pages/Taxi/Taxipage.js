import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { isMapLoadingState, taxiDataState, showTaxiState } from "../../atoms";

const Taxi = () => {
  const [showTaxi, setShowTaxi] = useRecoilState(showTaxiState);
  const [taxiData, setTaxiData] = useRecoilState(taxiDataState);
  const screenType = "taxis";
  const isMapLoading = useRecoilValue(isMapLoadingState);

  const getData = async (screen) => {
    try {
      const jsonData = await axios.get(
        `http://localhost:8080/parties/${screen}`
      );

      const dataArray = jsonData.data;
      const listData = dataArray.map((item) => ({
        carNumber: item.carNumber,
        confirm: item.confirm,
        content: item.content,
        currentHeadcnt: item.currentHeadcnt,
        endPoint: item.endPoint,
        p_id: item.p_id,
        p_type: item.p_type,
        startDateStr: item.startDateStr,
        startPoint: item.startPoint,
        startTime: item.startTime,
        startTimeStr: item.startTimeStr,
        totalHeadcnt: item.total,
        startLat: item.startLat,
        startLng: item.startLng,
      }));

      setTaxiData(listData);
      console.log(listData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(screenType);
  }, []);

  return (
    <div>
      <ul>
        {taxiData.map((item) => (
          <li key={item.p_id}>
            Car Number: {item.carNumber}<br />
            Confirm: {item.confirm}<br />
            Content: {item.content}<br />
            Current Headcount: {item.currentHeadcnt}<br />
            End Point: {item.endPoint}<br />
            Party ID: {item.p_id}<br />
            Party Type: {item.p_type}<br />
            Start Date: {item.startDateStr}<br />
            Start Point: {item.startPoint}<br />
            Start Time: {item.startTime}<br />
            Start Time Str: {item.startTimeStr}<br />
            Total Headcount: {item.totalHeadcnt}<br />
            Start Latitude: {item.startLat}<br />
            Start Longitude: {item.startLng}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Taxi;