import { listMyChartVoByPageUsingPost } from '@/services/xingbi/chartController';
import { useModel } from '@@/exports';
import {Avatar, Card, List, message, Result} from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 图表页
 */
const myChart: React.FC = () => {
    const initSearchParams = {
      //默认返回4条数据
      pageSize: 10,
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
              if(data.status === 'succeed'){
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
                    <div style={{ marginBottom: 16 }}></div>
                    {'分析目标:' + item.goal}
                    <div style={{ marginBottom: 16 }}></div>
                    {<ReactECharts option={JSON.parse(item.genChart ?? '{}')} />}
                  </>
                )}

                {
                    item.status === 'wait' &&
                    <>
                        <Result
                            status="warning"
                            title="等待生成"
                            subTitle={item.execMessage ?? '队列繁忙，请耐心等待'}
                        />
                    </>
                }

                  {
                      item.status === 'running' &&
                      <>
                          <Result
                              status="info"
                              title="图表生成中"
                              subTitle={item.execMessage}
                          />
                      </>
                  }

                  {
                      item.status === 'failed' &&
                      <>
                          <Result
                              status="error"
                              title="图表生成失败"
                              subTitle={item.execMessage}
                          />
                      </>
                  }

              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default myChart;
