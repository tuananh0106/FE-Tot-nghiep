import { Col } from 'antd';
import { useEffect } from 'react';
import UM0202Domain from '../domains/UM0202Domain';
import UM0202View from './UM0202View';
export function UM0202Content() {
  const [context, domain] = UM0202Domain();

  useEffect(() => {
    domain.initDomain();
  }, [domain]);

  return (
    <Col className="h-full py-10" offset={2} span={20}>
      <UM0202View context={context} domain={domain} />
    </Col>
  );
}
