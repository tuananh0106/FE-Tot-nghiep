import { Button, Card, Form, Input, Modal, Row, Typography } from "antd";

export function Login(props) {
    const { login, domain, setLogin } = props;

    const [form] = Form.useForm();

    async function onFinish() {
        let values = await form.getFieldsValue(true);
        await domain.getLogin({
            username: values?.username,
            password: values?.password,
        });
    }

    return (
        <Modal open={login} footer={null} closeIcon={null}>
            <Card
                title={
                    <Row className="w-full justify-center">
                        <div className="font-bold text-xl">Đăng nhập</div>
                    </Row>
                }
            >
                <Form
                    form={form}
                    autoComplete="off"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={<b>Tên đăng nhập</b>}
                        name="username"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Tên đăng nhập không được phép để trống!',
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
                                message: 'Mật khẩu không được phép để trống!',
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
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <Row className="w-full justify-center">
                        <Typography.Link
                            className="ml-50"
                            onClick={() => setLogin(!login)}
                        >
                            Đăng ký tài khoản
                        </Typography.Link>
                    </Row>
                </Form>
            </Card>
        </Modal>
    );
}