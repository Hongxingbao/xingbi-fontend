import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '啊星出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '星智能BI',
          title: '星智能BI',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Hongxingbao/',
          blankTarget: true,
        },
        {
          key: 'person blog',
          title: 'person blog',
          href: 'https://blog.csdn.net/weixin_42576759?spm=1010.2135.3001.5343',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
