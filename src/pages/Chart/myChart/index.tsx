import {
  deleteChartUsingPost,
  listMyChartVoByPageUsingPost,
} from '@/services/xingbi/chartController';
import { Link, useModel } from '@@/exports';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Avatar, Button, Card, List, message, Modal, Result } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 图表页
 */
const myChart: React.FC = () => {
  const initSearchParams = {
    //默认返回6条数据
    pageSize: 6,
    current: 1,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [queryParams, setQueryParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? [];

  const chartData = async () => {
    try {
      setLoading(true);
      const res = await listMyChartVoByPageUsingPost(queryParams);
      if (res.data) {
        if (res.data.records) {
          res.data.records.forEach((data) => {
            if (data.status === 'succeed') {
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
          });
        }
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败,' + e.message);
    }
    setLoading(false);
  };

  const { confirm } = Modal;

  const deleteById = (id: any) => {
    confirm({
      title: '请问你要删除这张图表吗？',
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        try {
          console.log(id);
          const res = await deleteChartUsingPost({ id });
          console.log(res);
          if (res.data) {
            message.success('删除成功');
            chartData();
          } else {
            message.error(res.data.message);
          }
        } catch (e: any) {
          message.error('删除失败：' + e.message);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  //首次加载页面或查询参数变化时，重新加载chartData()
  useEffect(() => {
    chartData();
  }, [queryParams]);

  return (
    <div className="my-chart">
      <Search
        placeholder="请输入图表名称"
        loading={loading}
        onSearch={(value) => {
          setQueryParams({
            ...initSearchParams,
            chartName: value,
          });
        }}
        enterButton
      />
      <div className="margin-16"></div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setQueryParams({
              ...initSearchParams,
              current: page,
              pageSize,
            });
          },
          showTotal: (total) => `共 ${total} 条数据`, // 这里应该是一个返回字符串的函数
          pageSize: queryParams.pageSize,
          current: queryParams.current,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.chartName}
                description={item.chartType ? '图表类型' + item.chartType : undefined}
              />

              <>
                {item.status === 'succeed' && (
                  <>
                    <div style={{ position: 'fixed', right: '20px' }}></div>
                    {'分析目标:' + item.goal}
                    <div className="margin-16"></div>
                    {<ReactECharts option={JSON.parse(item.genChart ?? '{}')} />}
                    <Button danger size={'small'} onClick={() => deleteById(item.id)}>
                      删除图表
                    </Button>
                    <Button style={{ marginLeft: '5px' }} type={'primary'} size={'small'}>
                      <Link to={`/chartDetail/${item.id}`}>图表详情</Link>
                    </Button>
                  </>
                )}

                {item.status === 'wait' && (
                  <>
                    <Result
                      status="warning"
                      title="等待生成"
                      subTitle={item.execMessage ?? '队列繁忙，请耐心等待'}
                    />
                  </>
                )}

                {item.status === 'running' && (
                  <>
                    <Result status="info" title="图表生成中" subTitle={item.execMessage} />
                  </>
                )}

                {item.status === 'failed' && (
                  <>
                    <Result status="error" title="图表生成失败" subTitle={item.execMessage} />
                  </>
                )}
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default myChart;
