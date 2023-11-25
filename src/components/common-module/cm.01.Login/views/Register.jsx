import { Button, Card, Form, Input, Modal, Row, Typography, message } from "antd";

export function Register(props) {
    const { login, domain , setLogin } = props;

    const [form] = Form.useForm();

    async function register() {
        let values = await form.getFieldsValue(true);
        if (values.password === values.rePassword) {

          let res = await domain.regist({
            name: values?.name,
            email: values?.email,
            password: values?.password,
            role: 'USER',
          });
          
          if (res == true) {
            setLogin(true);
          } else {
            message.error('Email đã tồn tại!')
          }
        } 
        else {
          message.error('Mật khẩu không trùng khớp');
        }
      }

    return (
        <Modal open={!login} footer={null}>
            <Card
                title={
                    <Row className="w-full justify-center">
                        <div className="font-bold text-xl">Đăng ký tài khoản</div>
                    </Row>
                }
            >
                <Form
                    form={form}
                    autoComplete="off"
                    onFinish={register}
                    layout="vertical"
                >

                    <Form.Item
                        label={<b>Họ và Tên</b>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Tên thông tin không được phép để trống!',
                            },
                        ]}
                    >
                        <Input className="input-login" />
                    </Form.Item>

                    <Form.Item
                        label={<b>Tên đăng nhập/ Email</b>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Tên thông không được phép để trống!',
                            },
                        ]}
                    >
                        <Input className="input-login" />
                    </Form.Item>

                    <Form.Item
                        label={<b>Mật khẩu</b>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Trường thông tin không được phép để trống!',
                            },
                        ]}
                    >
                        <Input.Password className="input-login" />
                    </Form.Item>

                    <Form.Item
                        label={<b>Xác nhân mật khẩu</b>}
                        name="rePassword"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Trường thông tin không được phép để trống!',
                            },
                        ]}
                    >
                        <Input.Password className="input-login" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="input-button bg-blue-6"
                        >
                            Đăng ký tài khoản
                        </Button>
                    </Form.Item>

                    <Row className="w-full justify-center">
                        <Typography.Link
                            className="ml-50"
                            onClick={() => setLogin(!login)}
                        >
                            Đăng nhập
                        </Typography.Link>
                    </Row>

                </Form>
            </Card>
        </Modal>);
}
