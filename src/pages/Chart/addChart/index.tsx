import { analysisBySynchronizeUsingPost } from '@/services/xingbi/chartController';
import { getUserByIdUsingGet } from '@/services/xingbi/scoreController';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * 图表分析（同步）
 */
const addChart: React.FC = () => {
  //用于存放图表信息
  const [chart, setChart] = useState<API.BiResponse>();
  //提交中的状态，默认为未提交
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { TextArea } = Input;

  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    //再次提交后清空页面数据
    setChart(undefined);
    //此处先解构，拿到需要的参数
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const scoreRes = await getUserByIdUsingGet();
      console.log('积分数：' + scoreRes.data);
      if (scoreRes.data < 5) {
        message.error('积分不足，请联系管理员！');
      } else {
        const res = await analysisBySynchronizeUsingPost(
          params,
          {},
          values.file.file.originFileObj,
        );
        if (!res?.data) {
          message.error('分析失败:' + res.message);
        } else {
          message.success('分析成功');
          setChart(res.data);
        }
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
    }
    //结束后设为false
    setSubmitting(false);
  };
  const formItemLayout = {
    labelAlign: 'left',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title={'智能分析'}>
            <Form
              name="add-chart"
              {...formItemLayout}
              onFinish={onFinish}
              initialValues={{
                'input-number': 3,
                'checkbox-group': ['A', 'B'],
                rate: 3.5,
                'color-picker': null,
              }}
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="分析目标" name={'goal'} rules={[{ required: true }]}>
                <TextArea placeholder={'请输入你的分析诉求,例如：分析商品的销售情况'} rows={4} />
              </Form.Item>

              <Form.Item label="图表名称" name="chartName" rules={[{ required: true }]}>
                <Input placeholder={'请输入你的图表名称'} />
              </Form.Item>

              <Form.Item name="chartType" label="图表类型">
                <Select
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '散点图', label: '散点图' },
                    { value: '饼图', label: '饼图' },
                    { value: '堆叠图', label: '堆叠图' },
                    { value: '雷达图', label: '雷达图' },
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item
                name="file"
                label="原始Excel数据"
                rules={[{ required: true, message: '请上传文件' }]}
              >
                <Upload name="file" maxCount={1} accept={'.xls,.xlsx'}>
                  <Button icon={<UploadOutlined />}>上传excel文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="Submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'分析结论'}>
            {chart?.genResult ?? <div>请在左侧提交表单</div>}
            <Spin spinning={submitting} />
          </Card>
          <Divider></Divider>
          <Card title={'生成图表'}>
            {chart?.genChart ? (
              <ReactECharts option={chart?.genChart} />
            ) : (
              <div>请在左侧提交表单</div>
            )}
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default addChart;
