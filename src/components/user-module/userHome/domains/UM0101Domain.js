import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UM0101Service from '../services/UM0101Service';
import { message } from 'antd';

export function UM0101Domain() {
  const [context, contextService] = UM0101Service();
  const contextRef = useRef(
    {
      listDataTable: null,
      listDataCount: null,
      listHotel: [],
      listRoomType : [],
      listRoomStatus: [],
    } || context,
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);

    await getDataTable();
    await getListHotel();
    await getListRoomType();
    await getListRoomStatus();
  };

  //Danh sách tìm kiếm
  const getDataTable = async (params) => {
    try {
      common?.backdrop(true); // tạo spin quay
      const newParams = _.reduce(
        params,
        (result, value, key) => {
          return _.assign(result, {
            [key]: _.includes([NaN, null, undefined, ''], value) ? null : value,
          });
        },
        {},
      );
      const url = `/user/room/search?page=0&size=1000000`;
      const response = await axiosAPI.post(url, newParams);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listDataTable = data.content; //listData || [];
        contextRef.current.listDataCount = data.totalElements || 0;
        await contextService.updateContext(contextRef.current);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };

  //Danh sách khách sạn
  const getListHotel = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/hotel/search?page=0&size=1000000`;
      const response = await axiosAPI.post(url, {
        hotelId: null,
        roomTypeId: null,
        costFrom: null,
        costTo: null,
        floor: null,
      });
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listHotel = data.content;
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

  //Danh sách loại phòng
  const getListRoomType = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/room-type/getAll`;
      const response = await axiosAPI.post(url);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listRoomType = data;
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

  //Danh sách trạng thái của phòng
  const getListRoomStatus = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/room/getStatusRoom`;
      const response = await axiosAPI.get(url);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listRoomStatus = data;
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
  const goToViewPage = (id) => {
    navigate(`/user/home/view/${id}`);
  };
  const goToCreatePage = () => {
    navigate(`/user/home/${'create'}/${null}`);
  };

  const domainInterface = useRef({
    initDomain,
    getDataTable,
    goToViewPage,
    goToCreatePage,
    getListHotel,
    getListRoomType,
    getListRoomStatus,
  });
  return [context, domainInterface.current];
}

export default UM0101Domain;
