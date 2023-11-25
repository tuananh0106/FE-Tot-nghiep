import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { message } from 'antd';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UM0202Service from '../services/UM0202Service';

export function UM0202Domain() {
  const { id } = useParams();
  const [context, contextService] = UM0202Service();
  const contextRef = useRef(
    {
      dataDetail: {},
      status: 0,
      listBookingRoomStatus: [],
    } || context,
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);
    await getDataDetail();
    await getListBookingRoomStatus();
  };

  //Thông tin chi tiết
  const getDataDetail = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/bookroom/detail?id=${id}`;
      const response = await axiosAPI.get(url);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.dataDetail = data;
        contextRef.current.status = data?.status;
        await contextService.updateContext(contextRef.current);
      } else {
        message.error(response.data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };

  const checkIn = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/bookroom/checkin/${id}`;
      const response = await axiosAPI.post(url);
      if (response?.data?.code == 200) {
        message.success('Nhận phòng thành công');
        goToHomePage();
      } else {
        message.error('Nhận phòng không thành công');
      }
      // return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };

  const checkOut = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/bookroom/checkout/${id}`;
      const response = await axiosAPI.post(url);
      if (response?.data?.code == 200) {
        message.success('Trả phòng thành công');
        goToHomePage();
      } else {
        message.error('Trả phòng không thành công');
      }
      // return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };

  //Danh sách trạng thái của phòng đã đặt
  const getListBookingRoomStatus = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/bookroom/status`;
      const response = await axiosAPI.get(url);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listBookingRoomStatus = data;
        await contextService.updateContext(contextRef.current);
      } else {
        message.error(response.data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };

  //------------------- navigation ----------------------
  function goToHomePage() {
    navigate(`/user/home`);
  }
  function goBack() {
    navigate(-1);
  }
  const domainInterface = useRef({
    initDomain,
    goToHomePage,
    goBack,
    checkIn,
    checkOut,
    getListBookingRoomStatus,
  });
  return [context, domainInterface.current];
}

export default UM0202Domain;
