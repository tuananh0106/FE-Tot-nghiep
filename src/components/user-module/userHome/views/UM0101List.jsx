import { Card, Col, Row, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ContextShowRoom } from './ContextShowRoom';
import ImgShowRoom from './ImgShowRoom';
import { Search } from './Search';

export default function UM0101List({ context, domain }) {
  const { listDataTable } = context || {};
  const [data, setData] = useState(listDataTable);
  // const navigate = useNavigate();

  useEffect(() => {
    setData(context?.listDataTable);
  }, [context?.listDataTable]);

  return (
    <>
      <Card title="Tìm kiếm phòng khác sạn">

        <Search context={context} domain={domain} />

      </Card>

      <Card
        title="Danh sách phòng khách sạn"
        extra={<Space className="w-[800]"> </Space>}
      >
        <Row gutter={{ sm: 8, lg: 16 }}>
          {_.map(data, (item) => (
            <Col key={item?.roomResponse?.id} span={12} lg={6}>
              <Typography.Link
                className="w-full"
                onClick={() => domain.goToViewPage(item?.roomResponse?.id)}
              >
                <Card hoverable className=" my-4">
                  <div className="flex flex-col">

                    <ImgShowRoom item={item} />

                    <ContextShowRoom item={item} />

                  </div>
                </Card>
              </Typography.Link>
            </Col>
          ))}
        </Row>
      </Card>


    </>
  );
}
