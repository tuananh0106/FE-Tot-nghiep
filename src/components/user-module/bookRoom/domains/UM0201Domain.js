import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UM0201Service from '../services/UM0201Service';
import { message } from 'antd';

export function UM0201Domain() {
  const [context, contextService] = UM0201Service();
  const contextRef = useRef(
    {
      listDataTable: null,
      listDataCount: null,
      listBookingRoomStatus: [],
    } || context,
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);

    await getDataTable();
    await getListBookingRoomStatus();
  };

  //Danh sách phòng đã đặt
  const getDataTable = async (
    page = 0,
    pageSize = 1000000,
    params = {
      userId: parseInt(sessionStorage.getItem('userId')),
    },
  ) => {
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
      const url = `/user/bookroom/list?page=${page}&size=${pageSize}`;
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
  const goToViewPage = (id) => {
    navigate(`/user/bookroom/view/${id}`);
  };

  const domainInterface = useRef({
    initDomain,
    getDataTable,
    goToViewPage,
    getListBookingRoomStatus,
  });
  return [context, domainInterface.current];
}

export default UM0201Domain;
