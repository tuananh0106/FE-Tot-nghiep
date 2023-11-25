import { Button, Col, Form, InputNumber, Row, Select } from "antd";
import _ from 'lodash';

export function Search(props) {
    const {context , domain } = props;
  const { listHotel, listRoomType, listRoomStatus } = context || {};

  const [form] = Form.useForm();

  async function search() {
    let params = await form.getFieldsValue(true);
    console.log('params', params);
    await form.validateFields();
    await domain.getDataTable(params);
  }

    return (<>
        <Row gutter={{ sm: 8, lg: 16 }} >
            <Form form={form} autoComplete="off" layout="inline">

                <Row gutter={8}>
                    <Form.Item
                        label="Khách sạn"
                        name="hotelId"
                    >
                        <Select
                            options={_.map(listHotel, (item) => ({
                                value: item?.hotel?.id,
                                label: item?.hotel?.nameHotel,
                            }))}
                            className="w-full"
                            allowClear={true}
                            placeholder="Chọn khách sạn"
                        />
                    </Form.Item>
                </Row>

                <Col gutter={8}>
                    <Form.Item
                        label="Loại phòng"
                        name="roomTypeId"
                    >
                        <Select
                            options={_.map(listRoomType, (item) => ({
                                value: item?.id,
                                label: item?.nameRoomType,
                            }))}
                            className="w-full"
                            allowClear={true}
                            placeholder="Chọn loại phòng"
                        />
                    </Form.Item>
                </Col>

                <Form.Item label="Giá từ" name="costFrom">
                    <InputNumber
                        className="w-full"
                        allowClear={true}
                        placeholder="Nhập giá từ"
                    />
                </Form.Item>

                <Form.Item label="Giá đến" name="costTo">
                    <InputNumber
                        className="w-full"
                        allowClear={true}
                        placeholder="Nhập giá đến"
                    />
                </Form.Item>

                <Form.Item label="Tầng" name="floor">
                    <InputNumber
                        className="w-full"
                        allowClear={true}
                        placeholder="Nhập tầng"
                    />
                </Form.Item>

                <Col gutter={8}>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                    >
                        <Select
                            options={_.map(listRoomStatus, (item) => ({
                                value: item?.value,
                                label: item?.name,
                            }))}
                            className="w-full"
                            allowClear={true}
                            placeholder="Chọn trạng thái"
                        />
                    </Form.Item>
                </Col>

                <Button
                    className="text-cyan-1 bg-blue-6"
                    onClick={() => search()}>
                    Tìm kiếm
                </Button>
            </Form>
        </Row>
    </>);
}