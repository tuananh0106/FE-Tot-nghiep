import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import UploadImg from './UploadImg';

export default function UM0202View({ context, domain }) {
  const [form] = Form.useForm();
  const { dataDetail, listBookingRoomStatus, status } = context || {};
  const [fileList, setFileList] = useState([]);

  useUpdateEffect(() => {

    form.setFieldsValue({
      userNameDirectBooking: dataDetail?.userNameDirectBooking,
      numberRoom: dataDetail?.numberRoom,
      status: dataDetail?.status,
      checkInTime: moment(dataDetail?.checkInTime).format('DD/MM/YYYY HH:mm'),
      checkOutTime: moment(dataDetail?.checkOutTime).format('DD/MM/YYYY HH:mm'),
    });
  }, [dataDetail]);

  return (
    <>

      <Card
        title={'Thông tin đặt phòng'}
        actions={[
          <Button
            onClick={() => {
              domain.goBack();
            }}
            key={1}
          >
            Quay lại
          </Button>,

          <Button
            className="text-cyan-1 bg-blue-6"
            onClick={() => {
              if (status == 0) {
                domain.checkIn();
              } if (status == 1) {
                domain.checkOut();
              }
            }}
            key={2}
          >
            {status == 0
              ? 'Check in'
              : status == 1
                ? 'Check out'
                : 'Xem Hóa Đơn'}

          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 6 }}
          layout="horizontal"
          style={{ width: '100%' }}
          title="Form"
          form={form}
        >
          <Row span={24}>
            <Col offset={1} span={20}>

              <Form.Item
                label="Tên người đặt phòng:"
                name="userNameDirectBooking">
                <Input className="w-full" disabled={true} />
              </Form.Item>

              <Form.Item
                label="Số phòng:"
                name="numberRoom">
                <Input className="w-full" disabled={true} />
              </Form.Item>

              <Form.Item
                label="Trạng thái:"
                name="status">
                <Select
                  options={_.map(listBookingRoomStatus, (item) => ({
                    value: item?.value,
                    label: item?.name,
                  }))}
                  className="w-full"
                  placeholder="Chọn thông tin"
                  disabled={true}
                />

              </Form.Item>

              <Form.Item
                label="Check In:"
                name="checkInTime"
              >
                <Input className="w-full" disabled={true} />
              </Form.Item>

              <Form.Item
                label="Check Out:"
                name="checkOutTime">
                <Input className="w-full" disabled={true} />
              </Form.Item>

              <UploadImg
                name={'files'}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
