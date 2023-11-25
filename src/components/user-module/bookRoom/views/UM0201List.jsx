import { EyeOutlined } from '@ant-design/icons';
import { formatCurrency } from '@common/Utils';
import { Card, Modal, Space, Table, Tooltip } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function UM0201List({ context, domain }) {
  const { listDataTable, listBookingRoomStatus } = context || {};
  const [data, setData] = useState(listDataTable);

  useEffect(() => {
    setData(context?.listDataTable);
  }, [context?.listDataTable]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      fixed: 'left',
      width: 200,
      render: (record, value, index) => index + 1,
    },
    {
      title: 'Người đặt phòng',
      dataIndex: 'userNameDirectBooking',
      key: 'userNameDirectBooking',
      width: 300,
    },
    {
      title: 'Thời gian checkin',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      width: 300,
      render: (value) => moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Thời gian checkout',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      width: 300,
      render: (value) => moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Số tiền cọc (VND)',
      dataIndex: 'deposit',
      key: 'deposit',
      width: 300,
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Hình thức đặt phòng',
      dataIndex: 'directBooking',
      key: 'directBooking',
      width: 300,
      render: (value) => {
        if (value) {
          return 'Trực tiếp';
        } else {
          return 'Đặt online';
        }
      },
    },
    {
      title: 'Trạng thái đặt phòng',
      dataIndex: 'status',
      key: 'status',
      width: 300,
      render: (value) =>
        _.find(
          listBookingRoomStatus,
          (item) => item?.value == value,
        )?.name || '',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Tooltip
          title="Xem chi tiết"
          color="#1677ff"
          onClick={() => {
            domain.goToViewPage(record.id);
          }}
        >
          <a style={{ color: '#1677ff' }}>
            <EyeOutlined />
          </a>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Modal></Modal>
      <Card
        title="Danh sách phòng đã đặt"
        extra={<Space className="w-[800]"></Space>}
      >
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
}
